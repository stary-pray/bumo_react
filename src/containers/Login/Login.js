import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from '../../redux/modules/auth';
import config from '../../config';
import './Login.scss';
import {Link} from 'react-router';
import {reduxForm} from 'redux-form';
import {createNotification, createNotificationSuccess} from '../../redux/modules/notification';
import {bindActionCreators} from 'redux';


const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = '请输入邮箱';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = '请输入有效的邮箱地址';
  }
  if (!values.password) {
    errors.password = '请输入密码';
  } else if (values.password.length < 6) {
    errors.password = '密码必须至少6位数';
  }
  if (!values.captcha) {
    errors.captcha = '请输入验证码';
  }
  return errors;
};

@connect(
  state => ({
    userLoad: state.auth.loaded,
    captcha: state.auth.captcha,
    loginError: state.auth.loginError
  }),
  {...authActions, createNotification}
  )

@reduxForm({
  form: 'Login',
  fields: ['email', 'password', 'captcha'],
  validate
})

export default class Login extends Component {
  static propTypes = {
    userLoad: PropTypes.bool,
    //invalid: PropTypes.bool,
    captcha: PropTypes.string,
    login: PropTypes.func,
    //logout: PropTypes.func,
    getCaptcha: PropTypes.func,
    refreshCaptcha: PropTypes.func,
    loginError: PropTypes.object,
    fields: PropTypes.object,
    createNotification: PropTypes.func
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
    const {userLoad,captcha, loginError, fields: {email, password, captcha: captchaField }} = this.props;
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
              <input type="email" ref="email" placeholder="Email" {...email}/>
              {email.touched && email.error && <div>{email.error}</div>}
            </div>
            <div className="form-group">
              <input type="password" ref="password" placeholder="密码" {...password}/>
              {password.touched && password.error && <div>{password.error}</div>}
            </div>
            <div className="form-group">
              <input type="text" ref="captcha" placeholder="验证码" {...captchaField}/>
              {captchaField.touched && captchaField.error && <div>{captchaField.error}</div>}
            </div>
            { captcha ?
              <div className="form-group">
                <a onClick={this.handleGetCaptcha} href="">
                  <img src={`${config.serverApi}/api/auth/captcha/image/${captcha}/`} alt=""/>
                </a>
              </div>
              : '' }
            {loginError? this.props.createNotification({
              message: <div>{formError}</div>,
              level: 'success'
            }) : ''}

            <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Log In
            </button>
          </form>
          <Link className="button" to={'register'}>
            Register</Link>
        </div>
        }
      </div>
    );
  }
}
