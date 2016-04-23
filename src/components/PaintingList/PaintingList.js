import React, {Component, PropTypes} from "react";
import PaintingInfo from "../PaintingInfo/PaintingInfo";
import Waypoint from "react-waypoint";
import Masonry from "react-masonry-component";
import "./PaintingList.scss";

export default class PaintingList extends Component {
  static propTypes = {
    painting: PropTypes.object,
    profile: PropTypes.object,
    paintingHeat: PropTypes.object,
    loadPainting: PropTypes.func,
    component: PropTypes.object
  };

  componentWillMount() {
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    this.loadMore();
  }

  componentDidUpdate() {
    const {page, loading, loaded} = this.props.component;
    if (page == 1 && !loading && !loaded) {
      this.loadMore();
    }
  }

  loadMore() {
    const {page, loading} = this.props.component;
    if (loading) return;
    this.props.loadPainting(page);
  }

  render() {
    const {painting, component, paintingHeat, profile} = this.props;
    const {page, pageMeta} = component;
    return (
      <div className="PaintingList">
        <Masonry
          className={'BumoMasonry'}
          elementType={'ul'}
          options={{ columnWidth: 320, itemSelector: '.PaintingInfo', gutter: 15, fitWidth: true }}
          disableImagesLoaded={false}
        >
          {component.loaded ?
            component.indexes.map((paintingId)=> {
              return (<PaintingInfo
                key={'painting' + paintingId}
                heat={paintingHeat[painting[paintingId].heat]}
                owner={profile[painting[paintingId].profile]}
                painting={painting[paintingId]}
                width={320}
              />);
            })
            :''}
        </Masonry>
        <div>
          {component.loaded && pageMeta.next === null ?
            <div>已到最后一页</div> :
            <div>
              { component.loaded && <button onClick={this.loadMore}>加载更多</button> }
              { component.loaded && (page - 1) % 3 != 0 &&
              <Waypoint
                className="waypoint"
                key={'waypoint' + page}
                onEnter={this.loadMore}
              />
              }
            </div>}
        </div>
      </div>
    );
  }
}

