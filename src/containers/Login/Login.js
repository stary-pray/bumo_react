import React, {Component, PropTypes} from "react";
import * as authActions from "../../redux/modules/auth";
import "./Login.scss";
import {reduxForm} from "redux-form";
import {createNotification} from "../../redux/modules/notification";


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

@reduxForm({
    form: 'Login',
    fields: ['email', 'password', 'captcha'],
    validate
  },
  state => ({
    userLoad: state.auth.loaded,
    captcha: state.auth.captcha,
    loginError: state.auth.loginError
  }),
  {...authActions, createNotification}
)

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
    createNotification: PropTypes.func,
    closeModal: PropTypes.func,
    switchToRegister: PropTypes.func,
  };

  constructor() {
    super();
    this.handleAuthClose = this.handleAuthClose.bind(this);
    this.handleSwitchToRegister = this.handleSwitchToRegister.bind(this);
  }

  componentWillMount() {
    this.props.getCaptcha();
  }

  componentWillReceiveProps(nextProps) {
    const {loginError} = this.props;
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
    if(loginError){this.props.createNotification({
      message: <div className="error">{formError}</div>,
      level: 'error'
    })}
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

  handleAuthClose() {
    this.props.closeModal();
  }

  handleSwitchToRegister() {
    this.props.switchToRegister();
  }

  render() {
    const {userLoad, captcha, loginError, fields: {email, password, captcha: captchaField}} = this.props;
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
        <div className="short-tabs">
          <span className="tab activated">登录</span>
          <span onClick={this.handleSwitchToRegister} className="tab">注册</span>
        </div>
        <div onClick={this.handleAuthClose} className="close"/>
        {!userLoad &&
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              <div>邮箱</div>
              <input type="email" ref="email" placeholder="" {...email}/>
              {email.touched && email.error && <div className="error">{email.error}</div>}
            </label>
            <label>
              <div>密码</div>
              <input type="password" ref="password" placeholder="" {...password}/>
              {password.touched && password.error && <div className="error">{password.error}</div>}
            </label>
            <label>
              <div>验证码</div>
              <input type="text" ref="captcha" placeholder="" {...captchaField}/>
              {captchaField.touched && captchaField.error && <div className="error">{captchaField.error}</div>}
            </label>
            { captcha ?
              <div className="captcha">
                <a onClick={this.handleGetCaptcha} href="">
                  <img src={`/api/auth/captcha/image/${captcha}/`} alt=""/>
                </a>
              </div>
              : '' }
            <button className="button hollow" onClick={this.handleSubmit}> 登录</button>
          </form>
        </div>
        }
      </div>
    );
  }
}
