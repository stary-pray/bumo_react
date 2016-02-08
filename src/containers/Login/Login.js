import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';

@connect(
  state => ({
    user: state.auth.user,
    captcha: state.auth.captcha,
  }),
  authActions)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    captcha: PropTypes.string,
    login: PropTypes.func,
    logout: PropTypes.func,
    getCaptcha: PropTypes.func,
    refreshCaptcha: PropTypes.func,
  };

  componentWillMount() {
    this.props.getCaptcha();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.login(this.refs.email.value, this.refs.password.value, this.props.captcha, this.refs.captcha.value);
  };

  handleRefreshCaptcha = (event) => {
    event.preventDefault();
    this.props.refreshCaptcha();
    this.refs.captcha.value = '';
  }

  render() {
    const {user, logout, captcha} = this.props;
    const styles = require('./Login.scss');
    return (
      <div className={styles.loginPage + ' container'}>
        <Helmet title="Login"/>
        <h1>Login</h1>
        {!user &&
        <div>
          <form className="login-form form-inline" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="email" ref="email" placeholder="Email"/>
            </div>
            <div className="form-group">
              <input type="password" ref="password" placeholder="密码"/>
            </div>
            <div className="form-group">
              <input type="text" ref="captcha" placeholder="验证码"/>
            </div>
            { captcha ?
              <div className="form-group">
                <a onClick={this.handleRefreshCaptcha} href="">
                  <img src={`/api/api/auth/captcha/image/${captcha}/`} alt=""/>
                </a>
              </div>
              : '' }
            <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Log In
            </button>
          </form>
          <p>This will "log you in" as this user, storing the email in the session of the API server.</p>
        </div>
        }
        {user &&
        <div>
          <p>You are currently logged in as {user.name}.</p>

          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>
        }
      </div>
    );
  }
}
