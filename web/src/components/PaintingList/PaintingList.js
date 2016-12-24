import React, {Component, PropTypes} from "react";
import {compareAttrs} from "../../utils/common";
import PaintingInfo from "../PaintingInfo/PaintingInfo";
import Masonry from "react-masonry-component";
import "./PaintingList.scss";
import classNames from "classnames";
import PainterContribute from "../../containers/PainterContribute/PainterContribute";

const defaultWidth = 250;
export default class PaintingList extends Component {
  static propTypes = {
    painting: PropTypes.object,
    profile: PropTypes.object,
    paintingHeat: PropTypes.object,
    component: PropTypes.object,
    waypoint: PropTypes.object,
    openedTamashiId: PropTypes.number,
    isMe: PropTypes.bool,
    preferences: PropTypes.object,
    loginModalOpen: PropTypes.func,
    changePaintingListMode: PropTypes.func,
    loadPainting: PropTypes.func,
    openModal: PropTypes.func,
    openTamashi: PropTypes.func.isRequired,
    tagType: PropTypes.string,
    tagName: PropTypes.string,
  };

  constructor() {
    super();
    this.loadMore = this.loadMore.bind(this);
    this.handleLoginModalOpen = this.handleLoginModalOpen.bind(this);
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

  shouldComponentUpdate(nextProps) {
    return compareAttrs(this.props, nextProps, ['component', 'openedTamashiId', 'isMe', 'preferences', 'paintingHeat']);
  }

  componentDidUpdate() {
    if (!this.props.component.loading && !this.props.component.loaded) {
      this.loadMore();
    }
  }

  loadMore() {
    const {pageMeta, loading} = this.props.component;
    if (loading || !pageMeta.next) return;
    this.props.loadPainting(pageMeta.next);
  }

  handleLoginModalOpen() {
    this.props.loginModalOpen();
  }

  waypointOnEnter() {
    const {pageMeta} = this.props.component;
    if (pageMeta.current === 0 || pageMeta.current % 3) {
      this.loadMore();
    }
  }

  renderPaintingInfo(openModal, paintingId, heatOrder) {
    const {painting, paintingHeat, profile, isMe, preferences} = this.props;
    const paintingBody = painting[paintingId];
    const paintingWidth = paintingBody.width / paintingBody.height > 1.25 ? defaultWidth * 2 + 15 : defaultWidth;
    return (
      <PaintingInfo
        key={'painting' + paintingId}
        heat={paintingHeat[paintingBody.heat]}
        owner={profile[paintingBody.profile]}
        painting={paintingBody}
        heatOrder={heatOrder}
        openModal={openModal}
        width={paintingWidth}
        openTamashi={this.props.openTamashi}
        openedTamashiId={this.props.openedTamashiId}
        loginModalOpen={this.handleLoginModalOpen}
        isMe={isMe}
        mode={preferences.listMode}
      />
    );
  }

  renderMasonry(openModal) {
    const {component, tagName, tagType} = this.props;
    return (
      <Masonry
        className={'BumoMasonry'}
        elementType={'ul'}
        options={{itemSelector: '.PaintingInfo__container', columnWidth: defaultWidth, gutter: 15, fitWidth: true}}
        disableImagesLoaded={false}
      >
        { (component.loaded && tagName && tagType) ?
          <PainterContribute className="PaintingInfo__container" tagName={tagName} tagType={tagType}/> : '' }
        {component.loaded ?
          component.indexes.map((paintingId)=> this.renderPaintingInfo(openModal, paintingId, (component.indexes.indexOf(paintingId)+1)))
          : ''}
      </Masonry>
    );
  }

  renderCard(openModal) {
    const {component, tagName, tagType} = this.props;

    return (
      <ul className="PaintingList__card">
          { (component.loaded && tagName && tagType) ?
            <PainterContribute className="PaintingInfo__container is-card" tagName={tagName} tagType={tagType}/> : '' }
          {component.loaded ?
            component.indexes.map((paintingId)=> this.renderPaintingInfo(openModal, paintingId, (component.indexes.indexOf(paintingId)+1)))
            : ''}
      </ul>
    );
  }

  renderList(openModal) {
    switch (this.props.preferences.listMode) {
      case 'masonry':
        return this.renderMasonry(openModal);
      case 'card':
      default:
        return this.renderCard(openModal);
    }
  }

  render() {
    const {component} = this.props;
    const {pageMeta, loading} = component;
    const isLastPage = !pageMeta.next;
    const openModal = (id) => this.props.openModal({id: id, indexes: component.indexes});
    return (
      <div className="PaintingList">
           {this.renderList(openModal)}
             <button
               onClick={this.loadMore}
               className={classNames("button hollow PaintingList__pageButton", {disabled: isLastPage || loading}) }>
               { loading ? '载入中...' : (isLastPage ? '已到最后一页' : '载入更多') }
             </button>
      </div>
    );
  }
}

