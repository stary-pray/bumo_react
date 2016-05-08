import React, {Component, PropTypes} from "react";
import "../Home/Home.scss";
import PaintingList from "../../components/PaintingList/PaintingList";

export default class TagPainting extends Component {
  static propTypes = {
    painting: PropTypes.object,
    profile: PropTypes.object,
    paintingHeat: PropTypes.object,
    component: PropTypes.object,
    paintingDetail: PropTypes.object,
    path: PropTypes.string,
    loadTagPaintingDetail: PropTypes.func,
    loadTagPaintingDetailHot: PropTypes.func,
    openModal: PropTypes.func,
    openTamashi: PropTypes.func,
    openedTamashiId: PropTypes.number,
    me:PropTypes.object,
    loginModalOpen: PropTypes.func,
    tagType: PropTypes.string,
    tagName: PropTypes.string,
    waypoint: PropTypes.object,
    preferences: PropTypes.object,
  };

  constructor() {
    super();
    this.handleLoginModalOpen = this.handleLoginModalOpen.bind(this);
  }
  handleLoginModalOpen() {
    this.props.loginModalOpen();
  }

  render() {
    const {painting, component, paintingHeat, profile, loadTagPaintingDetail,
      loadTagPaintingDetailHot, path, me, tagType, tagName, preferences} = this.props;

    const loadTagPainting = (pageIndex) => loadTagPaintingDetail(tagType, tagName, pageIndex);
    const loadTagPaintinHot = (pageIndex) => loadTagPaintingDetailHot(tagType, tagName, pageIndex);
    const isLatest = path && path.indexOf('/latest') > -1;
    const loadPainting = isLatest ? loadTagPainting : loadTagPaintinHot;

    return (<div className="TagDetail__container">

      <div className="pageHead">
        <h2>{tagName}</h2>
      </div>

      <PaintingList
        key={path}
        painting={painting}
        component={component}
        paintingHeat={paintingHeat}
        profile={profile}
        loadPainting={loadPainting}
        openModal={this.props.openModal}
        openTamashi={this.props.openTamashi}
        openedTamashiId={this.props.openedTamashiId}
        isMe={me.id?true:false}
        loginModalOpen={this.handleLoginModalOpen}
        waypoint={this.props.waypoint}
        preferences={preferences}
      />
    </div>);
  }
}
