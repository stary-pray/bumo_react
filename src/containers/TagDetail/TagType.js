import React, {Component, PropTypes, cloneElement} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {loadTagTypeDetail, loadTagPaintingDetail, loadTagPaintingDetailHot} from "../../redux/modules/models/TagDetail";
import {Link, browserHistory} from "react-router";
import {calculateHeat, resize} from "../../utils/common";
import _ from "lodash";
import "./TagDetail.scss";
import {StickyContainer, Sticky} from "react-sticky";
import BumoDropdown from "../../components/BumoDropdown/BumoDropdown";
import classNames from "classnames";
import {changePaintingListMode} from "../../redux/modules/preferences";
import {dropdownChange} from "../../redux/modules/containers/TagTypeDetail";
import {openModal} from "../../redux/modules/containers/PaintingModal";
import {openTamashi} from "../../redux/modules/containers/TamashiPopup";
import {loginModalOpen} from "../../redux/modules/containers/MainHeader";

// tag details below

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
    waypoint: state.waypoint,

    // tag detail below
    TagPaintingDetailComponent: state.containers.TagPaintingDetail,
    openedTamashiId: state.containers.TamashiPopup.id,
    me: state.me,
    tagName: ownProps.params.tagName,
    preferences: state.preferences,
  }),
  dispatch => bindActionCreators({
    loadTagTypeDetail,
    changePaintingListMode,
    dropdownChange,

    // tag detail below
    loadTagPaintingDetail,
    loadTagPaintingDetailHot,
    openModal,
    openTamashi,
    loginModalOpen
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
    waypoint: PropTypes.object,
    TagPaintingDetailComponent: PropTypes.object,
    params: PropTypes.object,
    preferences: PropTypes.object,
    changePaintingListMode: PropTypes.func,
    dropdownChange: PropTypes.func,
  };

  constructor() {
    super();
    this.loadMore = this.loadMore.bind(this);
    this.waypointOnEnter = this.waypointOnEnter.bind(this);
    this.handleDropdown = this.handleDropdown.bind(this);
    this.handleDropdownClose = this.handleDropdownClose.bind(this);
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

  componentDidUpdate() {
    if (!this.props.params.tagName && !this.props.component.loading && !this.props.component.loaded) {
      this.loadMore();
    }
  }

  loadMore() {
    const {pageMeta, loading} = this.props.component;
    const {tagType}=this.props;
    if (loading || !pageMeta.next) return;
    this.props.loadTagTypeDetail(tagType, pageMeta.next);
  }

  waypointOnEnter() {
    const {pageMeta} = this.props.component;
    if (pageMeta.current % 3) {
      this.loadMore();
    }
  }

  handleDropdown() {
    this.props.dropdownChange(!this.props.component.isDropdownOpened);
  }

  handleDropdownClose() {
    this.props.dropdownChange(false);
  }

  renderNav() {
    const tagTypes = ['人物', '作品', '属性', '活动',];
    const {preferences, component, changePaintingListMode, tagType, tagName} = this.props;
    const {sub} = this.props.params;

    return (
      <StickyContainer>
        <Sticky className="NavControls" stickyClassName={'NavControls__sticky'}>
          <div className="leftSide">
            {tagTypes.map(tagTypeName =>
              <Link key={tagTypeName} activeClassName="active" to={`/tag/${tagTypeName}`}>
                <span>{tagTypeName}</span>
              </Link>
            )}
          </div>
          { tagName ?
            <div className="rightSide">
              <a onClick={ this.handleDropdown}>
                { sub ?
                  (<span><i className="zmdi zmdi-flash"/> 最新 </span>) :
                  (<span><i className="zmdi zmdi-fire"/> 热门 </span>) }
                <span className="separator">|</span>
                { preferences.listMode === 'masonry' ?
                  (<span><i className="zmdi zmdi-view-dashboard"/> 瀑布流 <i className="zmdi zmdi-caret-down"/></span>) :
                  (<span><i className="zmdi zmdi-view-module"/> 列表 <i className="zmdi zmdi-caret-down"/></span>) }
              </a>
              <BumoDropdown positionClass="ListModeDropdown" isOpened={component.isDropdownOpened}
                            close={this.handleDropdownClose}>
                <Link to={`/tag/${tagType}/${tagName}`} activeClassName="active" className="BumoDropdownItem">
                  <i className="zmdi zmdi-fire"/> 热门 <i className="zmdi zmdi-check check"/>
                </Link>
                <Link to={`/tag/${tagType}/${tagName}/latest`} activeClassName="active" className="BumoDropdownItem">
                  <i className="zmdi zmdi-flash"/> 最新 <i className="zmdi zmdi-check check"/>
                </Link>
                <hr/>
                <div className={classNames('BumoDropdownItem', {active: preferences.listMode === 'masonry'})}
                     onClick={()=>changePaintingListMode('masonry')}>
                  <i className="zmdi zmdi-view-dashboard"/> 瀑布流 <i className="zmdi zmdi-check check"/>
                </div>
                <div className={classNames('BumoDropdownItem', {active: preferences.listMode === 'card'})}
                     onClick={()=>changePaintingListMode('card')}>
                  <i className="zmdi zmdi-view-module"/> 列表 <i className="zmdi zmdi-check check"/>
                </div>
              </BumoDropdown>
            </div> : ''
          }
        </Sticky>
      </StickyContainer>
    );
  }

  renderTagType() {
    const {tagType, component, tags, painting, tagHeat} = this.props;
    const {loaded, pageMeta, loading}=this.props.component;
    const isLastPage = !pageMeta.next;

    return (
      <div className="TagType__container">
        <div className="TagType__wrapper">
          { loaded ?
            component.indexes.map((tagId)=> {
              const tag = tags[tagId];
              const heat = _.find(tagHeat, {id: tag.heat});
              const topPainting = tag.paintings ? _.find(painting, {id: tag.paintings[0]}) : '';
              const tagUrl = '/tag/' + tagType + '/' + tags[tagId].name;
              return (
                <div onClick={()=>browserHistory.push(tagUrl)} className="paintingCollection" key={'tagType' + tagId}>
                  <span className="img"
                        style={{backgroundImage: `url(${topPainting ? resize(topPainting.attachment, 320) : ''})`}}/>
                  <Link className="name" to={tagUrl}>
                    <h2>{tags[tagId].name}</h2>
                  </Link>
                  <h4 className="type">{tagType}</h4>
                  <h2 className="heat"><i className="zmdi zmdi-fire"/> {calculateHeat(heat)}</h2>
                </div>
              );
            }) : ''
          }
        </div>
        <button
          onClick={this.loadMore}
          className={classNames("button hollow PaintingList__pageButton", {disabled: isLastPage}) }>
          { loading ? '载入中...' : (isLastPage ? '已到最后一页' : '载入更多') }
        </button>
      </div>);
  }

  renderTagDetail() {
    const {sub, tagName} = this.props.params;
    return cloneElement(this.props.children, {
      ...this.props,
      component: this.props.TagPaintingDetailComponent,
      key: tagName + sub
    });
  }

  render() {
    return (
      <div className="TagType__container">
        {this.renderNav()}
        {this.props.children ? this.renderTagDetail() : this.renderTagType()}
      </div>
    );
  }
}
