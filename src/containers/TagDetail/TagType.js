import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {loadTagTypeDetail} from "../../redux/modules/models/TagDetail";
import {Link} from "react-router";
import {calculateHeat} from "../../utils/common";
import _ from "lodash";
import "./TagDetail.scss";
import Waypoint from "react-waypoint";


@connect(
  (state, ownProps) => ({
    painting: state.models.painting,
    profile: state.models.profile,
    paintingHeat: state.models.paintingHeat,
    tagHeat: state.models.tagHeat,
    tagType: ownProps.params.tagType,
    tags: state.models.tags,
    component: state.containers.TagTypeDetail,
    path: ownProps.route.path,

  }),
  dispatch => bindActionCreators({
    loadTagTypeDetail,
  }, dispatch)
)


export default class TagType extends Component {
  static propTypes = {
    tagType: PropTypes.string,
    profile: PropTypes.object,
    loadTagTypeDetail: PropTypes.func,
    tags: PropTypes.object,
    component: PropTypes.object,
    painting: PropTypes.object,
    paintingHeat: PropTypes.object,
    tagHeat: PropTypes.object,
  };
  constructor(){
    super();
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    this.loadMore();
  }

  componentDidUpdate() {
    const {page, loading, tagLoaded} = this.props.component;
    if (page == 1 && !loading && !tagLoaded) {
      this.loadMore();
    }
  }

  componetWillUnmount(){
    this.loadMore.cancel();
  }

  loadMore() {
    const {page, loading} = this.props.component;
    const {tagType}=this.props;
    if (loading) return;
    this.props.loadTagTypeDetail(tagType,page);
  }

  render() {
    const {tagType, component, tags, painting, profile, paintingHeat, tagHeat} = this.props;
    const {tagLoaded, page}=this.props.component;
    return (<div className="TagType">
      { tagLoaded ?
        component.indexes.map((tagId)=> {
          const tag = tags[tagId];
          const heat = _.find(tagHeat, {id: tag.heat});
          const topPainting = tag.paintings?_.find(painting, {id: tag.paintings[0]}):'';
          return ( <div className="paintingCollection" key={'tagType' + tagId}>
              <span className="img" style={{backgroundImage: `url(${topPainting.attachment})`}} />
              <Link className="name" to={'/tags/' +tagType+'/'+ tags[tagId].name}>
                <h2>{tags[tagId].name}</h2>
              </Link>
              <h4 className="type">{tagType}</h4>
              <h2 className="heat"><i className="zmdi zmdi-fire"/> {calculateHeat(heat)}</h2>
            </div>
          );
        }) : ''
      }
      <div>
      {component.tagLoaded && component.pageMeta.next === null ?
        <div>已到最后一页</div> :
        <div>
          { component.tagLoaded && (page - 1) % 3 != 0 &&
          <Waypoint className="waypoint"
            //key={'waypoint' + page}
                    onEnter={this.loadMore}
          />
          }
          { component.tagLoaded && <button onClick={this.loadMore}>加载更多</button> }
        </div>}
    </div>
        </div>);
        }
      }
