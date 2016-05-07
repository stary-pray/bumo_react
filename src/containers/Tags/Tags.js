import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadTags, loadTagsType} from '../../redux/modules/models/Tags';
import {Link} from 'react-router';
import {resize} from '../../utils/common';
import PaintingInfo from '../../components/PaintingInfo/PaintingInfo';
import '../TagDetail/TagDetail.scss';
import _ from 'lodash';
import Waypoint from "react-waypoint";
import "../../components/PaintingList/PaintingList";
import classNames from "classnames";

@connect(
  (state) => ({
    tags: state.models.tags,
    painting: state.models.painting,
    component: state.containers.Tags,
    tagHeat: state.models.tagHeat,
    paintingHeat: state.models.paintingHeat,
    profile: state.models.profile,
    waypoint: state.waypoint
  }),
  dispatch => bindActionCreators({
    loadTags,
  }, dispatch)
)


export default class Tags extends Component {
  static propTypes = {
    loadTags: PropTypes.func,
    tags: PropTypes.object,
    painting: PropTypes.object,
    component: PropTypes.object,
    tagHeat: PropTypes.object,
    paintingHeat: PropTypes.object,
    profile: PropTypes.object,
    waypoint: PropTypes.object
  };

  constructor() {
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

  componetWillUnmount() {
    this.loadMore.cancel();
  }

  loadMore() {
    const {pageMeta, loading} = this.props.component;
    if (loading || !pageMeta.next) return;
    this.props.loadTags(pageMeta.next);
  }

  waypointOnEnter() {
    const {pageMeta} = this.props.component;
    if (pageMeta.current === 0 || pageMeta.current % 3) {
      this.loadMore();
    }
  }

  render() {
    const {tags, component, painting, tagHeat, paintingHeat, profile} = this.props;
    const {pageMeta, loading}=this.props.component;
    const isLastPage = !pageMeta.next;

    return (<div className="Tags">
      <h1>标签</h1>
      <h2>热门标签属性</h2>
      <Link to="/tag_type/角色"><h3>角色</h3></Link>
      <Link to="/tag_type/作品"><h3>作品</h3></Link>
      <div className="TagType"> {component.loaded ?
        <div>
          {component.indexes.map((tagId) => {
              const tag = tags[tagId];
              const heat = _.find(tagHeat, {id: tag.heat});
              const topPainting = tag.paintings ? _.find(painting, {id: tag.paintings[0]}) : '';
              return ( <div className="paintingCollection" key={'tagType' + tagId}>
                  <span className="img" style={{backgroundImage: `url(${topPainting.attachment})`}}/>
                  <Link className="name" to={'/tags/' + tags[tagId].type+'/'+tags[tagId].name}>
                    <h2>{tags[tagId].name}</h2>
                  </Link>
                  <h4 className="type">{tags[tagId].type}</h4>
                  <h2 className="heat"><i className="zmdi zmdi-fire"/> {heat ? Math.round(heat.point) : ''}</h2>
                </div>
              );
            }
          )}
        </div>
        : ''
      }
        <button
          onClick={this.loadMore}
          className={classNames("button hollow PaintingList__pageButton", {disabled: isLastPage}) }>
          { loading ? '载入中...' : (isLastPage ? '已到最后一页' : '载入更多') }
        </button>
      </div>
    </div>);
  }
}
