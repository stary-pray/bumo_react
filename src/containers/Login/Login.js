import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';
import config from '../../config';
import './Login.scss';

@connect(
  state => ({
    userLoad: state.auth.loaded,
    captcha: state.auth.captcha,
    loginError: state.auth.loginError,

  }),
  authActions)
export default class Login extends Component {
  static propTypes = {
    userLoad: PropTypes.bool,
    captcha: PropTypes.string,
    login: PropTypes.func,
    logout: PropTypes.func,
    getCaptcha: PropTypes.func,
    refreshCaptcha: PropTypes.func,
    loginError: PropTypes.object,
  };

  componentWillMount() {
    this.props.getCaptcha();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.login(this.refs.email.value, this.refs.password.value, this.props.captcha, this.refs.captcha.value);
  };

  handleGetCaptcha = (event) => {
    event.preventDefault();
    this.props.getCaptcha();
    this.refs.captcha.value = '';
  };

  render() {
    const {userLoad, logout, captcha, loginError} = this.props;
    let formError = '';
    if (loginError && loginError.CAPTCHA_WRONG_ERROR) {
      formError = <span> 验证码错误 </span>;
    }
    if (loginError && loginError.non_field_errors) {
      formError = <span> 用户名或者密码错误 </span>;
    }
    if (loginError && loginError.PASSWORD_NEEDED) {
      formError = <span> 请输入密码 </span>;
    }
    return (
      <div className="Login">
        <Helmet title="Login"/>
        <h1>Login</h1>
        {!userLoad &&
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
                <a onClick={this.handleGetCaptcha} href="">
                  <img src={`${config.serverApi}/api/auth/captcha/image/${captcha}/`} alt=""/>
                </a>
              </div>
              : '' }
            {formError}
            <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Log In
            </button>
          </form>
          <p>This will "log you in" as this user, storing the email in the session of the API server.</p>
        </div>
        }
        {userLoad &&
        <div>
          <p>You are currently logged in as kkk.</p>

          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>
        }
      </div>
    );
  }
}
