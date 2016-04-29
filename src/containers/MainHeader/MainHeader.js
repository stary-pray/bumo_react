import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {IndexLink, Link} from "react-router";
import InlineSVG from "svg-inline-react";
import {openSearch} from "../../redux/modules/containers/SearchResult";
import * as mainHeaderActions from "../../redux/modules/containers/MainHeader";
import "./MainHeader.scss";
import BumoDropdown from "../../components/BumoDropdown/BumoDropdown";
import {logout} from "../../redux/modules/auth";
import Login from "../Login/Login";
import Register from "../Register/Register";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

@connect(
  (state, ownProps) => ({
    component: state.containers.MainHeader,
    me: state.me,
  }),
  {
    openSearch: openSearch,
    logout: logout,
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
    this.props.loginModalOpen();
  }

  handleRegisterModalOpen() {
    this.props.registerModalOpen();
  }

  handleModalClose() {
    this.props.modalClose();
  }

  render() {
    const {component, me} = this.props;
    const {isLoginModalOpened, isRegisterModalOpened} = component;
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
        <Link activeClassName="active" className="nav-item" to="/tags">
          <i className="zmdi zmdi-label"/>标签
        </Link>
      </section>
      {isLogined ?
        <div className="user-notification-panel grid-content">
          <Link to="/me/paintingUpload" className="item"><i className="zmdi zmdi-cloud-upload"/> 发布
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
        <Link to={`/p/${me.id}`} className="BumoDropdownItem">
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
        {(isLoginModalOpened || isRegisterModalOpened) &&
        <div className="LoginModal">
          <div className="LoginModalBackground"/>
          {isLoginModalOpened &&
          <Login closeModal={this.handleModalClose} switchToRegister={this.handleRegisterModalOpen}/>}
          {isRegisterModalOpened &&
          <Register closeModal={this.handleModalClose} switchToLogin={this.handleLoginModalOpen}/>}
        </div>
        }
      </ReactCSSTransitionGroup>);
    </div>);
  }
}
