import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {IndexLink, Link} from "react-router";
import InlineSVG from "svg-inline-react";
import {openSearch} from "../../redux/modules/containers/SearchResult";
import * as mainHeaderActions from "../../redux/modules/containers/MainHeader";
import "./MainHeader.scss";
import BumoDropdown from "../../components/BumoDropdown/BumoDropdown";
import {logout, login, auth0Profile} from "../../redux/modules/auth";
import {load as loadMe, putNewUser} from "../../redux/modules/me";
import UserImageUpload from "../UserImageUpload/UserImageUpload";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import Auth0Lock from "auth0-lock";
import {AUTH0_CLIENT, AUTH0_DOMAIN} from "../../utils/common.js";
import {setItem} from "../../helpers/storage";

@connect(
  (state, ownProps) => ({
    component: state.containers.MainHeader,
    me: state.me,
  }),
  {
    openSearch: openSearch,
    logout,
    login,
    loadMe,
    auth0Profile,
    putNewUser,
    ...mainHeaderActions,
  }
)

export default class TopNav extends Component {
  static propTypes = {
    component: PropTypes.object,
    me: PropTypes.object,
    openSearch: PropTypes.func,
    openNotificationDropdown: PropTypes.func,
    closeNotificationDropdown: PropTypes.func,
    logout: PropTypes.func,
    login: PropTypes.func,
    loadMe: PropTypes.func,
    auth0Profile: PropTypes.func,
    putNewUser: PropTypes.func,
    loginModalOpen: PropTypes.func,
    registerModalOpen: PropTypes.func,
    modalClose: PropTypes.func,
  };

  constructor() {
    super();
    this.handleOpenSearch = this.handleOpenSearch.bind(this);
    this.handleOpenDropdown = this.handleOpenDropdown.bind(this);
    this.handleCloseDropdown = this.handleCloseDropdown.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLoginModalOpen = this.handleLoginModalOpen.bind(this);
    this.handleRegisterModalOpen = this.handleRegisterModalOpen.bind(this);
    this.handleModalClose = this.handleModalClose.bind(this);
    this.lock = null;
  }

  createLoginOrSignupModal(){
    if(!this.lock){
      const defaultOptions = {
        avatar: null,
        autoclose: true,
        language: 'zh',
        theme: {
          //labeledSubmitButton: false,
          logo: require('!file!../../utils/assets/green.svg'),
          primaryColor: "#1abc9c"
        },
        auth: {
          redirect: false,
        },
        languageDictionary: {
          //signUpTerms: "I agree to the <a href='/terms' target='_new'>terms of service</a> and <a href='/privacy' target='_new'>privacy policy</a>.",
          title: "恋绘·星祈",
        },
      };
      this.lock = new Auth0Lock(AUTH0_CLIENT, AUTH0_DOMAIN, defaultOptions);

      this.lock
        .on('authenticated', async(authResult) => {
          await setItem("preAuth", authResult.idToken);
          this.lock.getProfile(authResult.idToken, (err, profile)=> {
            this.props.auth0Profile(profile);
            this.props.login();
          });
          // if(profile.email_verified){
          //   this.props.putNewUser();
          // }
        })
        .on('hide', () => {
          this.handleModalClose()
        })
    }
  }

  handleOpenSearch() {
    this.props.openSearch();
  }

  handleOpenDropdown() {
    this.props.openNotificationDropdown();
  }

  handleCloseDropdown() {
    this.props.closeNotificationDropdown();
  }

  handleLogout() {
    this.props.logout();
  }

  handleLoginModalOpen() {
    this.createLoginOrSignupModal();
    this.lock.show({initialScreen: 'login'});
    this.props.loginModalOpen();
  }

  handleRegisterModalOpen() {
    this.createLoginOrSignupModal();
    this.lock.show({initialScreen: 'signUp'});
    this.props.registerModalOpen();
  }

  handleModalClose() {
    this.props.modalClose();
  }

  render() {
    const {component, me} = this.props;
    const {isUserImageUploadModalOpened, userImageUploadType} = component;
    const isLogined = me && me.id;
    return (<div id="main-header">
      <IndexLink className="logo" to="/">
        <InlineSVG className="svg" src={require("./bumo_logo.svg")}/>
      </IndexLink>
      <section className="mono nav-section">
        <IndexLink activeClassName="active" className="nav-item" to="/">
          <i className="zmdi zmdi-compass"/>发现
        </IndexLink>
        <Link activeClassName="active" className="nav-item" to="/user">
          <i className="zmdi zmdi-palette"/>画手
        </Link>
        <Link activeClassName="active" className="nav-item" to="/tag/人物">
          <i className="zmdi zmdi-label"/>标签
        </Link>
      </section>
      {isLogined ?
        <div className="user-notification-panel grid-content">
          <Link to="/me/PaintingUpload" className="item"><i className="zmdi zmdi-cloud-upload"/> 发布
          </Link>
        <span onClick={this.handleOpenDropdown} className="item">
          <i className="zmdi zmdi-account"/> {me.nickname}
        </span>
          <span onClick={this.handleOpenSearch} className="item"><i className="zmdi zmdi-search"/> 搜索</span>
        </div> :
        <div className="user-notification-panel grid-content">
          <span onClick={this.handleLoginModalOpen} className="item"><i className="zmdi zmdi-sign-in"/> 登录</span>
          <span onClick={this.handleRegisterModalOpen} className="item"><i className="zmdi zmdi-account-add"/> 注册</span>
          <span onClick={this.handleOpenSearch} className="item"><i className="zmdi zmdi-search"/> 搜索</span>
        </div>
      }
      <BumoDropdown isOpened={component.notificationDropdownOpened} close={this.handleCloseDropdown}>
        <Link to={`/u/${me.id}`} className="BumoDropdownItem">
          <i className="zmdi zmdi-home"/> 我的主页
        </Link>
        <Link to="/me/edit" className="BumoDropdownItem">
          <i className="zmdi zmdi-settings"/> 设置
        </Link>
        <div onClick={this.handleLogout} className="BumoDropdownItem">
          <i className="zmdi zmdi-power-off"/> 退出
        </div>
      </BumoDropdown>
      <ReactCSSTransitionGroup
        transitionName="LoginModalTransition"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
      >
        {(isUserImageUploadModalOpened) &&
        <div className="LoginModal">
          <div className="LoginModalBackground"/>
          {isUserImageUploadModalOpened ?
            <UserImageUpload isOpened={isUserImageUploadModalOpened} closeModal={this.handleModalClose} type={userImageUploadType} /> : '' }
        </div>
        }
      </ReactCSSTransitionGroup>
    </div>);
  }
}
