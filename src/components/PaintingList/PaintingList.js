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
    component: PropTypes.object,
    openModal: PropTypes.func,
    openTamashi: PropTypes.func.isRequired,
    openedTamashiId: PropTypes.number,
    isMe: PropTypes.bool,
    loginModalOpen: PropTypes.func
  };

  constructor() {
    super();
    this.loadMore = this.loadMore.bind(this);
    this.handleLoginModalOpen = this.handleLoginModalOpen.bind(this);
    this.waypointOnEnter = this.waypointOnEnter.bind(this);
  }

  loadMore() {
    const {pageMeta, loading} = this.props.component;
    if (loading || !pageMeta.next) return;
    this.props.loadPainting(pageMeta.next);
  }

  handleLoginModalOpen() {
    this.props.loginModalOpen();
  }
  
  componentWillUnmount(){
    console.log('componentWillUnmount');
  }

  waypointOnEnter({previousPosition, currentPosition, event}) {
    console.log('waypointOnEnter');
    const {pageMeta} = this.props.component;
    if (pageMeta.current === 0 || pageMeta.current % 3) {
      this.loadMore();
    }
  }
  
  waypointOnLeave(){
    console.log('waypointOnLeave');
  }


  render() {
    const {painting, component, paintingHeat, profile, isMe} = this.props;
    const {pageMeta} = component;
    const openModal = (id) => this.props.openModal({id: id, indexes: component.indexes});
    return (
      <div className="PaintingList">
        <Masonry
          className={'BumoMasonry'}
          elementType={'ul'}
          options={{ itemSelector: '.PaintingInfo', columnWidth: 320, gutter: 15, fitWidth: true }}
          disableImagesLoaded={false}
        >
          {component.loaded ?
            component.indexes.map((paintingId)=> {
              return (<PaintingInfo
                key={'painting' + paintingId}
                heat={paintingHeat[painting[paintingId].heat]}
                owner={profile[painting[paintingId].profile]}
                painting={painting[paintingId]}
                openModal={openModal}
                width={320}
                openTamashi={this.props.openTamashi}
                openedTamashiId={this.props.openedTamashiId}
                loginModalOpen={this.handleLoginModalOpen}
                isMe={isMe}
              />);
            })
            : ''}
        </Masonry>
        <div>
          { pageMeta.next === null ?
            <button className="button hollow disabled PaintingList__pageButton">已到最后一页</button> :
            <div>
              <Waypoint onLeave={this.waypointOnLeave} onEnter={this.waypointOnEnter} />
              { component.loaded ? <button className="button hollow PaintingList__pageButton" onClick={this.loadMore}>加载更多</button> : '' }
            </div>}
        </div>
      </div>
    );
  }
}

