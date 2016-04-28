import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {loadUserPaintingHot, loadUserPainting, loadProfileDetail} from "../../redux/modules/containers/UserPainting";
import {Link} from "react-router";
import {resize, calculateHeat} from "../../utils/common";
import InlineSVG from "svg-inline-react";
import {openTamashi} from "../../redux/modules/containers/TamashiPopup";
import lodash from "lodash";
import PaintingList from "../../components/PaintingList/PaintingList";
import * as PaintingModalActions from "../../redux/modules/containers/PaintingModal";
import "./UserPainting.scss";


@connect(
  (state, ownProps) => ({
    userPainting: state.models.painting,
    profile: state.models.profile,
    profileDetail: state.models.profileDetail,
    paintingHeat: state.models.paintingHeat,
    profileHeat: state.models.profileHeat,
    id: +ownProps.params.ownerId,
    component: state.containers.UserPainting,
    page: state.containers.UserPainting.page,
    subRoute: ownProps.params.sub
  }),
  dispatch => bindActionCreators({
    loadUserPainting,
    loadUserPaintingHot,
    loadProfileDetail,
    openModal: PaintingModalActions.openModal,
    openTamashi: openTamashi,
  }, dispatch)
)

export default class UserPainting extends Component {
  static propTypes = {
    id: PropTypes.number,
    userPainting: PropTypes.object,
    profile: PropTypes.object,
    profileDetail: PropTypes.object,
    paintingHeat: PropTypes.object,
    profileHeat: PropTypes.object,
    loadUserPaintingHot: PropTypes.func,
    loadUserPainting: PropTypes.func,
    loadProfileDetail: PropTypes.func,
    component: PropTypes.object,
    page: PropTypes.number,
    openTamashi: PropTypes.func,
    subRoute: PropTypes.string,
    openModal: PropTypes.func,
  };

  constructor() {
    super();
    this.topPosition = 0;
    this.handleScroll = lodash.throttle(()=>{
      const top = window.pageYOffset || document.documentElement.scrollTop;
      this.topPosition = top / 2;
      if(top < this.bannerHeihgt * 1.2){
        this.forceUpdate();
      }
    }, 500);
  }

  componentDidMount() {
    this.props.loadProfileDetail(this.props.id);
    this.bannerHeihgt = this.refs.banner.offsetHeight;
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    const {id, userPainting, component, paintingHeat, profile, profileDetail, loadUserPaintingHot, loadUserPainting, subRoute, profileHeat} = this.props;
    const loadUserPaintingHotWithId = (pageIndex) => loadUserPaintingHot(id, pageIndex);
    const loadUserPaintingWithId = (pageIndex) => loadUserPainting(id, pageIndex);
    const loadPainting = subRoute === 'latest' ? loadUserPaintingWithId : loadUserPaintingHotWithId;
    const profileBody = lodash.find(profileDetail, {user: id});
    const profileHeatBody = profileBody ? profileHeat[profileBody.heat] : null;
    return (<div className="UserPainting">
      <div className="top">
        <div ref="banner" className="banner">
          {
            (profileBody && profileBody.banner ) ?
              <div
                className="bannerBackground"
                style={{
                backgroundImage: 'url(' + resize(profileBody && profileBody.banner, 1000)+')',
                transform: `translate3d(0px, ${this.topPosition}px, 0px)`
                }}
              /> :
              <InlineSVG className="svg" src={require("../../utils/assets/default_banner.svg")}/>
          }
        </div>
        <div className="profile">
          <div className="avatarImage">
            {
              (profileBody && profileBody.avatar) ?
                <img src={ resize(profileBody.avatar, 120)} alt={profileBody.nickname}/> :
                <InlineSVG className="svg" src={require("../../utils/assets/default_avatar.svg")}/>
            }
          </div>
          <div className="nickname">{profileBody && profileBody.nickname}</div>
          <div className="introduction">{profileBody && profileBody.introduction}</div>
          <div className="profileHeat"><i
            className="zmdi zmdi-fire"/> {profileHeatBody && calculateHeat(profileHeatBody)}
          </div>
        </div>
        <div className="NavControls">
          <div className="leftSide">
            <Link activeClassName="active" to={`/p/${id}/latest`}>
              <span>新作</span>
            </Link>
            <Link activeClassName="active" to={`/p/${id}`}>
              <span>热门</span> 
            </Link>
          </div>
        </div>
      </div>
      <PaintingList
        painting={userPainting}
        component={component}
        paintingHeat={paintingHeat}
        profile={profile}
        loadPainting={loadPainting}
        openModal={this.props.openModal}
        openTamashi={this.props.openTamashi}
      />
    </div>);
  }
}
