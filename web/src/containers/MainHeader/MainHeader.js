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
import {setItem, removeItem, getItem} from "../../helpers/storage";
import {checkTokenValid} from "../../utils/common";

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
    redirect: true,
    redirectUrl: `${window.location.protocol}//${window.location.host}`
  },
  languageDictionary: {
    //signUpTerms: "I agree to the <a href='/terms' target='_new'>terms of service</a> and <a href='/privacy' target='_new'>privacy policy</a>.",
    title: "恋绘·星祈",
  },
};

@connect(
  (state, ownProps) => ({
    component: state.containers.MainHeader,
    me: state.me,
    auth: state.auth,
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
    this.getAuth0Profile = this.getAuth0Profile.bind(this);
    this.lock = null;
    this.createLoginOrSignupModal();
  }

  componentDidMount(){
    this.getProfileIfHasAuth0Token();
  }

  async getProfileIfHasAuth0Token() {
    const {valid} = await checkTokenValid();
    const preAuth = await getItem("preAuth");
    if(preAuth && !valid){
      this.getAuth0Profile(preAuth);
    }
  }

  createLoginOrSignupModal(){
    if(!this.lock){
      this.lock = new Auth0Lock(AUTH0_CLIENT, AUTH0_DOMAIN, defaultOptions);

      this.lock
        .on('authenticated', async(authResult) => {
          await setItem("preAuth", authResult.idToken);
          this.getAuth0Profile(authResult.idToken);
        })
        .on('hide', () => {
          this.handleModalClose()
        })
    }
  }

  async getAuth0Profile(idToken) {
    let token = idToken || await getItem("preAuth");
    this.lock.getProfile(token, (err, profile)=> {
      if(err) {
        removeItem("preAuth")
      } else {
        this.props.auth0Profile(profile);
        this.props.login();
      }
    });
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
    this.lock.logout({
      returnTo: window.location.origin
    });
  }

  componentWillReceiveProps(nextProps) {
    const currentComponent = this.props.component;
    const nextComponent = nextProps.component;
    if(!currentComponent.isLoginModalOpened && nextComponent.isLoginModalOpened) {
      this.lock.show({initialScreen: 'login'});
    }

    if(!currentComponent.isRegisterModalOpened && nextComponent.isRegisterModalOpened) {
      this.lock.show({initialScreen: 'signUp'});
    }

  }

  handleLoginModalOpen() {
    this.props.loginModalOpen();
  }

  handleRegisterModalOpen() {
    this.props.registerModalOpen();
  }

  handleModalClose() {
    this.props.modalClose();
  }

  render() {
    const {component, me, auth: {auth0}} = this.props;
    const {isUserImageUploadModalOpened, userImageUploadType} = component;
    const isLogined = me && me.id;
    const isAuth0Logined = auth0 && auth0.user_id;
    const {pathname} = window.location;
    const isHomePage = pathname === '/' || pathname === '/latest';
    const onRedirectPath = pathname === '/redirect';
    return (<div id="main-header" className={(isHomePage ? 'is-home-page ' : '') + (onRedirectPath ? 'is-redirect-page' : '')}>
      <IndexLink className="logo" to="/">
        <InlineSVG className="svg" src={require("./bumo_logo_new.svg")}/>
      </IndexLink>
      <section className="mono nav-section">
        <IndexLink activeClassName="active" className="nav-item" to="/">
          <i className="zmdi zmdi-compass"/>发现
        </IndexLink>
        <Link activeClassName="active" className="nav-item" to="/tag/人物">
          <i className="zmdi zmdi-label"/>标签
        </Link>
        <Link activeClassName="active" className="nav-item" to="/user">
          <i className="zmdi zmdi-palette"/>画手
        </Link>
      </section>
      {isLogined || isAuth0Logined ?
        <div className="user-notification-panel grid-content">
          { isLogined ?
          <Link to="/me/PaintingUpload" className="item">
            <i className="zmdi zmdi-cloud-upload"/> 投稿
          </Link> : '' }
          {!isLogined && isAuth0Logined ?
            <a onClick={()=> this.getAuth0Profile()} className="item double">
              <i className="zmdi zmdi-email-open"/> 验证邮箱
            </a> : '' }
          <span onClick={this.handleOpenDropdown} className="item">
            <i className="zmdi zmdi-account"/> {me.nickname || auth0.username || auth0.nickname}
          </span>
          <span onClick={this.handleOpenSearch} className="item"><i className="zmdi zmdi-search"/> 搜索</span>
        </div>
        :
        <div className="user-notification-panel grid-content">
          <span onClick={this.handleLoginModalOpen} className="item"><i className="zmdi zmdi-sign-in"/> 登录</span>
          <span onClick={this.handleRegisterModalOpen} className="item"><i className="zmdi zmdi-account-add"/> 注册</span>
          <span onClick={this.handleOpenSearch} className="item"><i className="zmdi zmdi-search"/> 搜索</span>
        </div>
      }
      <BumoDropdown isOpened={component.notificationDropdownOpened} close={this.handleCloseDropdown}>
        {isLogined ?
        <Link to={`/u/${me.id}`} className="BumoDropdownItem">
          <i className="zmdi zmdi-home"/> 我的主页
        </Link>
          : '' }
        {isLogined ?
        < Link to = "/me/edit" className="BumoDropdownItem">
          <i className="zmdi zmdi-settings"/> 设置
          </Link>
          : '' }
        {!isLogined ?
          < Link to = "/me/edit" className="BumoDropdownItem">
            <i className="zmdi zmdi-mail-send"/> 重发验证邮件
          </Link>
          : '' }
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
