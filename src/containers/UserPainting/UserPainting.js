import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {loadUserPaintingHot, loadUserPainting, loadProfileDetail, listModeDropdownChange} from "../../redux/modules/containers/UserPainting";
import {Link} from "react-router";
import {resize, calculateHeat} from "../../utils/common";
import InlineSVG from "svg-inline-react";
import {openTamashi} from "../../redux/modules/containers/TamashiPopup";
import {userImageUploadModalOpen, loginModalOpen} from "../../redux/modules/containers/MainHeader";
import lodash from "lodash";
import PaintingList from "../../components/PaintingList/PaintingList";
import * as PaintingModalActions from "../../redux/modules/containers/PaintingModal";
import "./UserPainting.scss";
import {changePaintingListMode} from "../../redux/modules/preferences";
import {StickyContainer, Sticky} from "react-sticky";
import BumoDropdown from "../../components/BumoDropdown/BumoDropdown";
import classNames from "classnames";
import Helmet from "react-helmet";

@connect(
  (state, ownProps) => ({
    userPainting: state.models.painting,
    profile: state.models.profile,
    profileDetail: state.models.profileDetail,
    paintingHeat: state.models.paintingHeat,
    profileHeat: state.models.profileHeat,
    id: ownProps.params.ownerId,
    component: state.containers.UserPainting,
    page: state.containers.UserPainting.page,
    path: ownProps.route.path,
    openedTamashiId: state.containers.TamashiPopup.id,
    me: state.me,
    waypoint: state.waypoint,
    preferences: state.preferences,

  }),
  dispatch => bindActionCreators({
    loadUserPainting,
    loadUserPaintingHot,
    loadProfileDetail,
    openModal: PaintingModalActions.openModal,
    openTamashi: openTamashi,
    loginModalOpen,
    changePaintingListMode,
    listModeDropdownChange,
    userImageUploadModalOpen,
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
    path: PropTypes.string,
    openModal: PropTypes.func,
    openedTamashiId: PropTypes.number,
    me: PropTypes.object,
    loginModalOpen: PropTypes.func,
    waypoint: PropTypes.object,
    preferences: PropTypes.object,
    changePaintingListMode: PropTypes.func,
    listModeDropdownChange: PropTypes.func,
    userImageUploadModalOpen: PropTypes.func,
  };

  constructor() {
    super();
    this.handleLoginModalOpen = this.handleLoginModalOpen.bind(this);
    this.handleListModeDropdown = this.handleListModeDropdown.bind(this);
    this.handleListModeDropdownClose = this.handleListModeDropdownClose.bind(this);
    this.handleBannerUploadOpen = this.handleBannerUploadOpen.bind(this);
    this.handleAvatarUploadOpen = this.handleAvatarUploadOpen.bind(this);
    this.topPosition = 0;
    this.handleScroll = lodash.throttle(()=> {
      const top = window.pageYOffset || document.documentElement.scrollTop;
      this.topPosition = top / 2;
      if (top < this.bannerHeihgt * 1.2) {
        this.forceUpdate();
      }
    }, 500);
  }



  componentDidMount() {
    this.props.loadProfileDetail(this.props.id);
    this.bannerHeihgt = this.refs.banner.offsetHeight;
    //window.addEventListener('scroll', this.handleScroll);
  }

  handleLoginModalOpen() {
    this.props.loginModalOpen();
  }


  handleListModeDropdown() {
    this.props.listModeDropdownChange(!this.props.component.isListModeDropdownOpened);
  }

  handleListModeDropdownClose() {
    this.props.listModeDropdownChange(false);
  }

  handleBannerUploadOpen(){
    this.props.userImageUploadModalOpen('banner');
  }

  handleAvatarUploadOpen(){
    this.props.userImageUploadModalOpen('avatar');
  }
  componentWillUnmount() {
    //window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    const {path, id, userPainting, component, paintingHeat, profile,
      profileDetail, loadUserPaintingHot, loadUserPainting, subRoute, profileHeat,me,
      preferences, changePaintingListMode} = this.props;
    const loadUserPaintingHotWithId = (pageIndex) => loadUserPaintingHot(id, pageIndex);
    const loadUserPaintingWithId = (pageIndex) => loadUserPainting(id, pageIndex);
    const isLatest = path && path.indexOf('/latest') > -1;
    const loadPainting = isLatest ? loadUserPaintingWithId : loadUserPaintingHotWithId;
    const profileBody = lodash.find(profileDetail, {user: +id});
    const profileHeatBody = profileBody ? profileHeat[profileBody.heat] : null;
    const isMyPage = me.id == +id;
    return (<div className="UserPainting">

      <Helmet
        title={`${profileBody ? profileBody.nickname :''} - 恋绘.星祈`}
        meta={[{description: profileBody? profileBody.introduction : ''}]}
      />

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
          {
            isMyPage ?
            <button onClick={this.handleBannerUploadOpen} className="bannerUploadButton shadow_distance button"><i className="zmdi zmdi-upload"/> 上传封面</button> : ''
          }
        </div>
        <div className="profile">
          <div className="avatarImage">
            {
              (profileBody && profileBody.avatar) ?
                <img src={ resize(profileBody.avatar, 120)} alt={profileBody.nickname}/> :
                <InlineSVG className="svg" src={require("../../utils/assets/default_avatar.svg")}/>
            }
            {
              isMyPage ?
                <button onClick={this.handleAvatarUploadOpen}
                        className="avatarUploadButton shadow_distance button">
                  <i className="zmdi zmdi-upload"/> 上传头像</button> : ''
            }
          </div>
          <div className="nickname">{profileBody && profileBody.nickname}</div>
          <div>
            <div className="introduction">
              {profileBody && profileBody.introduction ?
                profileBody.introduction :
                <span className="secondary-color">...</span>
              }
            </div>
            <div className="profileHeat"><i
              className="zmdi zmdi-fire"/> {profileHeatBody && calculateHeat(profileHeatBody)}
            </div>
          </div>
        </div>
        </div>
        <StickyContainer>
          <Sticky className="NavControls" stickyClassName={'NavControls__sticky'}>
            <div className="leftSide">
              <Link onlyActiveOnIndex={true} activeClassName="active" to={`/p/${id}`}>
                <span>热门</span>
              </Link>
              <Link activeClassName="active" to={`/p/${id}/latest`}>
                <span>新作</span>
              </Link>
            </div>
            <div className="rightSide">
              <a onClick={ this.handleListModeDropdown}>
                { preferences.listMode === 'masonry' ?
                  (<span><i className="zmdi zmdi-view-dashboard"/> 瀑布流 <i className="zmdi zmdi-caret-down"/></span>) :
                  (<span><i className="zmdi zmdi-view-module"/> 列表 <i className="zmdi zmdi-caret-down"/></span>) }
              </a>
              <BumoDropdown positionClass="ListModeDropdown" isOpened={component.isListModeDropdownOpened}
                            close={this.handleListModeDropdownClose}>
                <div className={classNames('BumoDropdownItem', {active: preferences.listMode === 'masonry'})}
                     onClick={()=>changePaintingListMode('masonry')}>
                  <i className="zmdi zmdi-view-dashboard"/> 瀑布流 <i className="zmdi zmdi-check check"/>
                </div>
                <div className={classNames('BumoDropdownItem', {active: preferences.listMode === 'card'})}
                     onClick={()=>changePaintingListMode('card')}>
                  <i className="zmdi zmdi-view-module"/> 列表 <i className="zmdi zmdi-check check"/>
                </div>
              </BumoDropdown>
            </div>
          </Sticky>
          <PaintingList
            key={path}
            painting={userPainting}
            component={component}
            paintingHeat={paintingHeat}
            profile={profile}
            loadPainting={loadPainting}
            openModal={this.props.openModal}
            openTamashi={this.props.openTamashi}
            isMe={!!me.id}
            loginModalOpen={this.handleLoginModalOpen}
            waypoint={this.props.waypoint}
            preferences={preferences}
            changePaintingListMode={changePaintingListMode}
          />
        </StickyContainer>
      </div>
      );
      }
      }
