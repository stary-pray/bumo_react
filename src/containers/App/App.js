import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import Helmet from "react-helmet";
import moment from "moment";
import {logout, initialApp} from "../../redux/modules/auth";
import MainHeader from "../MainHeader/MainHeader";
import MainFooter from "../../components/MainFooter/MainFooter";
import NotificationSystem from "react-notification-system";
import PaintingModal from "../PaintingModal/PaintingModal";
import SearchResult from "../SearchResult/SearchResult";
import {createNotification, createNotificationSuccess} from "../../redux/modules/notification";
import {positionChange} from "../../redux/modules/waypoint";
import {getScrollBarWidth} from "../../utils/common";
import Waypoint from "react-waypoint";
import "./App.scss";

moment.locale('zh-cn');

@connect(
  state => ({
    loaded: state.auth.loaded,
    user: state.auth.user,
    me: state.me,
    notification: state.notification,
    PaintingModalComponent: state.containers.PaintingModal,
    SearchResultComponent: state.containers.SearchResult,
    MainHeaderComponent: state.containers.MainHeader,
  }),
  {
    logout,
    initialApp,
    createNotification,
    createNotificationSuccess,
    positionChange,
  })
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    me: PropTypes.object,
    notification: PropTypes.object,
    logout: PropTypes.func.isRequired,
    loaded: PropTypes.bool,
    initialApp: PropTypes.func.isRequired,
    createNotification: PropTypes.func.isRequired,
    createNotificationSuccess: PropTypes.func.isRequired,
    positionChange: PropTypes.func.isRequired,
    params: PropTypes.object,
    PaintingModalComponent: PropTypes.object,
    SearchResultComponent: PropTypes.object,
    MainHeaderComponent: PropTypes.object,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillMount() {
    this.props.initialApp();
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.notification) {
      this._notificationSystem.addNotification(nextProps.notification);
      this.props.createNotificationSuccess();
    }
    const {PaintingModalComponent} = this.props;
    if (
      this.props.PaintingModalComponent.isOpened !== nextProps.PaintingModalComponent.isOpened ||
      this.props.SearchResultComponent.isOpened !== nextProps.SearchResultComponent.isOpened ||
      this.props.MainHeaderComponent.isLoginModalOpened !== nextProps.MainHeaderComponent.isLoginModalOpened ||
      this.props.MainHeaderComponent.isRegisterModalOpened !== nextProps.MainHeaderComponent.isRegisterModalOpened
    ) {
      const isOpened = nextProps.PaintingModalComponent.isOpened ||
        nextProps.SearchResultComponent.isOpened ||
        nextProps.MainHeaderComponent.isLoginModalOpened ||
        nextProps.MainHeaderComponent.isRegisterModalOpened;
      const app = document.getElementById('body');
      if (isOpened) {
        const scrollBarWidth = getScrollBarWidth();
        app.style.paddingRight = `${scrollBarWidth}px`;
        app.classList.add('isModalOpen');
      } else {
        app.classList.remove('isModalOpen');
        app.style.paddingRight = `0`;
      }
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  waypointPositionChange = ({previousPosition, currentPosition}) => {
    this.props.positionChange({previousPosition, currentPosition});
  };


  render() {
    const {params} = this.props;
    return (
      <div className="App__container border-box">
        <Helmet title="恋绘.星祈"/>
        {/*<Navbar logout={this.handleLogout} me={me} loaded={loaded} />*/}
        <div className="App__content">
          <MainHeader routeParams={params}/>
          <div className="App__page">
            {this.props.children}
          </div>
          <MainFooter />
          <Waypoint threshold={0.2} onPositionChange={this.waypointPositionChange}/>
        </div>
        <NotificationSystem ref="notificationSystem"/>
        <PaintingModal/>
        <SearchResult/>
      </div>
    );
  }
}
