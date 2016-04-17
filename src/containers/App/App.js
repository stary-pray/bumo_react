import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {logout, initialApp} from '../../redux/modules/auth';
import {isLoaded as isMeLoaded, load as loadMe} from '../../redux/modules/me';
import config from '../../config';
import Navbar from '../../components/Navbar/Navbar';
import MainHeader from '../MainHeader/MainHeader';
import NotificationSystem from 'react-notification-system';
import {createNotification, createNotificationSuccess} from '../../redux/modules/notification';

import './App.scss';

@connect(
  state => ({
    loaded: state.auth.loaded,
    user: state.auth.user,
    me: state.me,
    notification: state.notification,
  }),
  {
    logout,
    initialApp,
    createNotification,
    createNotificationSuccess,
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
    params: PropTypes.object,
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillMount(){
    this.props.initialApp();
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.notification){
      this._notificationSystem.addNotification(nextProps.notification);
      this.props.createNotificationSuccess();
    }
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    const {me, loaded, params} = this.props;
    return (
      <div className="App border-box grid-frame">
        <Helmet {...config.app.head}/>
        <Navbar logout={this.handleLogout} me={me} loaded={loaded} />
        <div className="Content">
          <MainHeader routeParams={params}/>
          {this.props.children}
        </div>
        <NotificationSystem ref="notificationSystem" />
      </div>
    );
  }
}
