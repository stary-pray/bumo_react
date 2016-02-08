import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {IndexLink, Link} from 'react-router';
import Helmet from 'react-helmet';
import {logout} from 'redux/modules/auth';
import {isLoaded as isMeLoaded, load as loadMe} from 'redux/modules/me';
import {routeActions} from 'react-router-redux';
import config from '../../config';

@connect(
  state => ({user: state.auth.user}),
  {logout, pushState: routeActions.push})
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    pushState: PropTypes.func.isRequired
  };

  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.user && nextProps.user) {
      // login
      this.props.pushState('/loginSuccess');
    } else if (this.props.user && !nextProps.user) {
      // logout
      this.props.pushState('/');
    }
  }

  static reduxAsyncConnect(params, store) {
    const {dispatch, getState} = store;
    const promises = [];

    if (!isMeLoaded(getState())) {
      promises.push(dispatch(loadMe()));
    }

    return Promise.all(promises);
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  render() {
    // const {user} = this.props;
    const styles = require('./App.scss');
    return (
      <div className={styles.App + ' ' + styles['grid-frame'] + ' ' + 'grid-frame'}>
        <Helmet {...config.app.head}/>
        <div className={styles.NavBar}>
          <IndexLink to="/">首页</IndexLink>
          <Link to="/p/1">用户1</Link>
          <Link to="/login">登录</Link>
        </div>
        <div className={styles.appContent}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
