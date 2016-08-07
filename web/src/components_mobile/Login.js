import React, {Component, PropTypes} from "react";
import * as authActions from "../redux/modules/auth";
import {logCaptcha, logEmail, logPassword} from "../redux/modules/containers_mobile/loginInfo";
import {connect} from "react-redux";
import {serverApi} from "../config";
import {Alert, AppRegistry, StyleSheet, Text, View, ListView, TouchableHighlight, Image, TextInput} from "react-native";
export default class Login extends Component {
  componentWillMount() {
    this.props.getCaptcha();
  }

  componentWillReceiveProps(nextProps){
if(!!nextProps.token){
  this.props.navigator.dismissModal({
    animationType: 'slide-down'
  })
}
  }

  handleLogin() {
    const {email, password, captcha}=this.props.loginInfo;
    console.log('Login infomation', email, password, captcha);
    this.props.login(email, password, this.props.captcha, captcha)
  }

  handleChangeEmail(email) {
    this.props.logEmail(email)
  }

  handleChangePassword(password) {
    this.props.logPassword(password)
  }

  handleChangeCaptcha(captcha) {
    this.props.logCaptcha(captcha)
  }

  handleCloseLogin() {
    this.props.navigator.dismissModal({
      animationType: 'slide-down'
    });
  }
  render() {
    const {captcha, loginError}=this.props;
    const alertMessage = '用户名错误';
    console.log(captcha);
    return (
      <View style={styles.container}>
        <Text style={styles.title}>登录</Text>
        <TextInput style={styles.input} placeholder='邮箱' onChangeText={this.handleChangeEmail.bind(this)}/>
        <TextInput style={styles.input} placeholder='密码' onChangeText={this.handleChangePassword.bind(this)}/>
        <TextInput style={styles.input} placeholder='验证码' onChangeText={this.handleChangeCaptcha.bind(this)}/>
        <Image style={styles.captcha} source={{uri: `${serverApi}/api/auth/captcha/image/${captcha}/`}}/>
        <TouchableHighlight style={styles.button}
                            underlayColor='#99d9f4' onPress={this.handleLogin.bind(this)}>
          <Text style={styles.buttonText}>Go</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button}
                            underlayColor='#99d9f4' onPress={this.handleCloseLogin.bind(this)}>
          <Text style={styles.buttonText}>取消</Text>
        </TouchableHighlight>
        {loginError?
          (Alert.alert(
            '错误',
            alertMessage,
            [
        {text:'ok', onPress:()=>console.log('ok, pressed')},
            ]
          )):<View/>
        }
      </View>
    )
  }

}
const styles = StyleSheet.create({
  container: {
    marginTop: 65,
  },
  title: {
    fontSize: 20,
    color: '#656565',
    alignSelf: 'center'
  },
  input: {
    height: 36,
    padding: 4,
    margin: 15,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center'
  },
  captcha: {
    marginLeft: 30,
    width: 200,
    height: 60
  }
});
export default connect(
  (state, ownProps) => ({
    userLoad: state.auth.loaded,
    captcha: state.auth.captcha,
    loginError: state.auth.loginError,
    loginInfo: state.containers.loginInfo,
    token: state.auth.token
  }),
  {
    ...authActions,
    logEmail,
    logPassword,
    logCaptcha
  }
)(Login);
