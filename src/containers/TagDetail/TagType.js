import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {loadTagTypeDetail} from "../../redux/modules/models/TagDetail";
import {Link} from "react-router";
import {calculateHeat} from "../../utils/common";
import _ from "lodash";
import "./TagDetail.scss";
import Waypoint from "react-waypoint";
import classNames from "classnames";


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
    waypoint: state.waypoint
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
    waypoint: PropTypes.object
  };
  constructor(){
    super();
    this.loadMore = this.loadMore.bind(this);
    this.waypointOnEnter = this.waypointOnEnter.bind(this);
  }

  componentDidMount() {
    this.loadMore();
  }

  componentWillReceiveProps(nextProps) {
    const currentWaypoint = this.props.waypoint;
    const nextWaypoint = nextProps.waypoint;
    if (currentWaypoint.currentPosition != 'inside' &&
      (nextWaypoint.currentPosition == 'inside')) {
      this.waypointOnEnter();
    }
  }


  componetWillUnmount(){
    this.loadMore.cancel();
  }

  loadMore() {
    const {pageMeta, loading} = this.props.component;
    const {tagType}=this.props;
    if (loading || !pageMeta.next) return;
    this.props.loadTagTypeDetail(tagType,pageMeta.next);
  }

  waypointOnEnter() {
    const {pageMeta} = this.props.component;
    if (pageMeta.current === 0 || pageMeta.current % 3) {
      this.loadMore();
    }
  }

  render() {
    const {tagType, component, tags, painting, profile, paintingHeat, tagHeat} = this.props;
    const {tagLoaded, pageMeta, loading}=this.props.component;
    const isLastPage = !pageMeta.next;

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
      <button
        onClick={this.loadMore}
        className={classNames("button hollow PaintingList__pageButton", {disabled: isLastPage}) }>
        { loading ? '载入中...' : (isLastPage ? '已到最后一页' : '载入更多') }
      </button>
        </div>);
        }
      }
