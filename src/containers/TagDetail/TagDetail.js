import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {loadTagPaintingDetail, loadTagPaintingDetailHot} from "../../redux/modules/models/TagDetail";
import "../Home/Home.scss";
import PaintingList from "../../components/PaintingList/PaintingList";
import * as PaintingModalActions from "../../redux/modules/containers/PaintingModal";
import {openTamashi} from "../../redux/modules/containers/TamashiPopup";
import {loginModalOpen} from "../../redux/modules/containers/MainHeader";
import lodash from "lodash";
import {Link} from "react-router";



@connect(
  (state, ownProps) => ({
    painting: state.models.painting,
    profile: state.models.profile,
    paintingHeat: state.models.paintingHeat,
    component: state.containers.TagPaintingDetail,
    path: ownProps.route.path,
    openedTamashiId: state.containers.TamashiPopup.id,
    me:state.me,
    tagType: ownProps.params.tagType,
    tagName: ownProps.params.tagName,
    subRoute: ownProps.params.sub,

  }),
  dispatch => bindActionCreators({
    loadTagPaintingDetail,
    loadTagPaintingDetailHot,
    openModal: PaintingModalActions.openModal,
    openTamashi: openTamashi,
    loginModalOpen
  }, dispatch)
)

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
    subRoute: PropTypes.string
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
      loadTagPaintingDetailHot, path, me, tagType, tagName,subRoute} = this.props;

    const loadTagPainting = (pageIndex) => loadTagPaintingDetail(tagType, tagName, pageIndex);
    const loadTagPaintinHot = (pageIndex) => loadTagPaintingDetailHot(tagType, tagName, pageIndex);
    const loadPainting = subRoute === 'latest' ? loadTagPainting : loadTagPaintinHot;

    return (<div className="Home">
      <div className="pageHead">
        <h1>{tagName}</h1>
        <h2>{tagType}</h2>
      </div>

      <div className="NavControls">
        <div className="leftSide">
          <Link activeClassName="active" to={'/tags/'+tagType+'/'+tagName}>
            <span>热门</span>
          </Link>
          <Link activeClassName="active" to={'/tags/'+tagType+'/'+tagName+'/latest'}>
            <span>新作</span>
          </Link>
        </div>
      </div>

      <PaintingList
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
      />
    </div>);
  }
}
