import React, {Component, PropTypes} from "react";
import PaintingInfo from "../PaintingInfo/PaintingInfo";
import Masonry from "react-masonry-component";
import "./PaintingList.scss";
import classNames from "classnames";

export default class PaintingList extends Component {
  static propTypes = {
    painting: PropTypes.object,
    profile: PropTypes.object,
    paintingHeat: PropTypes.object,
    loadPainting: PropTypes.func,
    component: PropTypes.object,
    openModal: PropTypes.func,
    openTamashi: PropTypes.func.isRequired,
    waypoint: PropTypes.object,
    openedTamashiId: PropTypes.number,
    isMe: PropTypes.bool,
    loginModalOpen: PropTypes.func,
    preferences: PropTypes.object,
    changePaintingListMode: PropTypes.func,
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

  renderPaintingInfo(openModal, paintingId) {
    const {painting, paintingHeat, profile, isMe, preferences} = this.props;
    return (
      <PaintingInfo
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
        mode={preferences.listMode}
      />
    );
  }

  renderMasonry(openModal) {
    const {component} = this.props;
    return (
      <Masonry
        className={'BumoMasonry'}
        elementType={'ul'}
        options={{ itemSelector: '.PaintingInfo__container', columnWidth: 320, gutter: 15, fitWidth: true }}
        disableImagesLoaded={false}
      >
        {component.loaded ?
          component.indexes.map((paintingId)=> this.renderPaintingInfo(openModal, paintingId))
          : ''}
      </Masonry>
    );
  }

  renderCard(openModal) {
    const {component} = this.props;
    return (
      <ul className="PaintingList__card">
        {component.loaded ?
          component.indexes.map((paintingId)=> this.renderPaintingInfo(openModal, paintingId))
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

