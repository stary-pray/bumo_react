import React, {Component, PropTypes} from "react";
import "../Home/Home.scss";
import PaintingList from "../../components/PaintingList/PaintingList";
import Helmet from "react-helmet";
import find from 'lodash/find';
import {calculateHeat} from  "../../utils/common";

export default class TagPainting extends Component {
  static propTypes = {
    painting: PropTypes.object,
    profile: PropTypes.object,
    paintingHeat: PropTypes.object,
    tagHeat: PropTypes.object,
    tags: PropTypes.object,
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
      loadTagPaintingDetailHot, path, me, tagType, tagName, preferences, tagHeat, tags} = this.props;

    const loadTagPainting = (pageIndex) => loadTagPaintingDetail(tagType, tagName, pageIndex);
    const loadTagPaintinHot = (pageIndex) => loadTagPaintingDetailHot(tagType, tagName, pageIndex);
    const isLatest = path && path.indexOf('/latest') > -1;
    const loadPainting = isLatest ? loadTagPainting : loadTagPaintinHot;
    const tagObj = find(tags, {type: tagType, name: tagName});
    const tagHeatObj = tagObj && tagHeat[tagObj.heat];

    return (<div className="TagDetail__container">
      <Helmet
        title={`${tagName}-${tagType} - 恋绘.星祈`}
      />
      <div className="pageHead">
        <h2>{tagName} {tagHeatObj ? calculateHeat(tagHeatObj) : ''}</h2>
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
