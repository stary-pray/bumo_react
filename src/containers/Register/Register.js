import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';
import config from '../../config';
import {reduxForm} from 'redux-form';



const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = '请输入邮箱';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = '请输入有效的邮箱地址';
  }
  if (!values.username) {
    errors.username = '请输入用户名';
  } else if (!/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/.test(values.username)) {
    errors.username = '请输入有效的用户名';
  }
  if (!values.password) {
    errors.password = '请输入密码';
  } else if (values.password.length < 6) {
    errors.password = '密码必须至少6位数';
  }
  if (!values.password1) {
    errors.password1 = '请再次输入确认密码';
  } else if (values.password1 !== values.password) {
    errors.password1 = '两次密码输入不一致';
  }
  if (!values.captcha) {
    errors.captcha = '请输入验证码';
  }
  if (!values.username) {
    errors.username = '请输入昵称';
  }
  return errors;
};

@connect(
  state => ({
    userLoad: state.auth.loaded,
    captcha: state.auth.captcha,
    registerError: state.auth.registerError
  }),
  authActions)

@reduxForm({
  form: 'register',
  fields: ['email', 'username', 'password', 'password1', 'captcha'],
  validate
})

export default class register extends Component {
  static propTypes = {
    userLoad: PropTypes.bool,
    captcha: PropTypes.string,
    registerError: PropTypes.object,
    fields: PropTypes.object,
    invalid: PropTypes.bool,
    register: PropTypes.func,
    getCaptcha: PropTypes.func,
    refreshCaptcha: PropTypes.func
  };

  componentWillMount() {
    this.props.getCaptcha();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.register(this.refs.email.value, this.refs.username.value, this.refs.password.value, this.props.captcha, this.refs.captcha.value);
  };

  handleGetCaptcha = (event) => {
    event.preventDefault();
    this.props.getCaptcha();
    this.refs.captcha.value = '';
  };

  render() {
    const {captcha, registerError, userLoad} = this.props;
    const {fields: {email, username, password, password1, captcha: captchaField }} = this.props;
    const { invalid } = this.props;
    let formError = '';
    /*if(!email.active &&  email.touched && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email.value)){
     formError = <span> 请输入有效的邮箱地址 </span>;
     }*/
    if (registerError && registerError.email) {
      formError = registerError.email.map((sentence)=> {
        switch(sentence){
          case "A user is already registered with this e-mail address.":
            return <span key={sentence}>该邮箱已被注册过</span>;
          default:
            return <span key={sentence}>{sentence}</span>;
        }
      });
    }
    if (registerError && registerError.password1) {
      formError = <span> {registerError.password1[0]}</span>;
    }
    if (registerError && registerError.CAPTCHA_WRONG_ERROR) {
      formError = <span>验证码错误 </span>;
    }
    /*if (password.touched && password1.touched
      && !password.active && !password1.active
      && password.value !== password1.value) {
      formError = <span>密码输入不一致</span>;
    }*/
    return (
      <div className="Register">
        <Helmet title="Register"/>
        <h1>Register</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <div>
                <label>邮箱</label>
                <input type="email" ref="email" placeholder="Email" {...email} />
              </div>
              {email.touched && email.error && <div>{email.error}</div>}
            </div>
            <div>
              <div>
                <label>用户名（只能包括小写字母、数字和下划线, 而且必须以字母开头）</label>
                <input type="name" ref="username" placeholder="username" {...username} />
              </div>
              {username.touched && username.error && <div>{username.error}</div>}
            </div>
            <div className="form-group">
              <div>
                <label>密码</label>
                <input type="password" ref="password" placeholder="密码" {...password}/>
              </div>
              {password.touched && password.error && <div>{password.error}</div>}
            </div>
            <div className="form-group">
              <div>
                <label>请再次输入密码</label>
                <input type="password" ref="password1" placeholder="确认密码" {...password1}/>
              </div>
              {password1.touched && password1.error && <div>{password1.error}</div>}
            </div>
            <div className="form-group">
              <input type="text" ref="captcha" placeholder="验证码" {...captchaField}/>
            </div>
            {captchaField.touched && captchaField.error && <div>{captchaField.error}</div>}
            { captcha ?
              <div className="form-group">
                <a onClick={this.handleGetCaptcha} href="">
                  <img src={`${config.serverApi}/api/auth/captcha/image/${captcha}/`} alt=""/>
                </a>
              </div>
              : '' }
            {formError}
            <button disabled={invalid} onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Register
            </button>
          </form>
          {userLoad &&
          <div>
            <p>你已经注册成功.</p>
          </div>
          }
        </div>
      </div>
    );
  }
}
