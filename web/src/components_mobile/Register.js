import React, {Component, PropTypes} from "react";
import * as authActions from "../redux/modules/auth";
import {
  regUsername,
  regEmail,
  regCaptcha,
  regPassword,
  regPassword1
} from "../redux/modules/containers_mobile/registerInfo";
import {connect} from "react-redux";
import {serverApi} from "../config";
import {Alert, AppRegistry, StyleSheet, Text, View, ListView, TouchableHighlight, Image, TextInput} from "react-native";


export default class Register extends Component {
  componentWillMount() {
    this.props.getCaptcha();
  }

  componentWillReceiveProps(nextProps) {
    if (!!nextProps.token) {
      this.props.navigator.dismissModal({
        animationType: 'slide-down'
      })
    }
  }

  handleRegister() {
    const {username, email, password, captcha}=this.props.registerInfo;
    this.props.register(email, username, password, this.props.captcha, captcha)
  }

  handleChangeUsername(username) {

    this.props.regUsername(username)
  }

  handleChangeEmail(email) {
    const {username}=this.props.registerInfo;
    if (!/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/.test(username)) {
      (Alert.alert(
        '错误',
        '有效的用户名:6~20位，可以是数字、字母和下划线的组合，但不以数字开头',
        [
          {text: 'ok', onPress: ()=>console.log('ok, pressed')},
        ]
      ))
    }
    this.props.regEmail(email)
  }

  handleChangePassword(password) {
    const {email}=this.props.registerInfo;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      (Alert.alert(
        '错误',
        '请输入有效的邮箱地址',
        [
          {text: 'ok', onPress: ()=>console.log('ok, pressed')},
        ]
      ))
    }
    this.props.regPassword(password)
  }

  handleChangePassword1(password1) {
    const {password}=this.props.registerInfo;
    if (password.length<6) {
      (Alert.alert(
        '错误',
        '密码必须至少6位数',
        [
          {text: 'ok', onPress: ()=>console.log('ok, pressed')},
        ]
      ))
    }
    this.props.regPassword1(password1)
  }

  handleChangeCaptcha(captcha) {
    const {
      password, password1
    }=this.props.registerInfo;
    console.log(password, password1);
    if (password !== password1) {
      (Alert.alert(
        '错误',
        '两次密码输入不一致',
        [
          {text: 'ok', onPress: ()=>console.log('ok, pressed')},
        ]
      ))
    }
    this.props.regCaptcha(captcha)
  }

  handleCloseRegister() {
    this.props.navigator.dismissModal({
      animationType: 'slide-down'
    });
  }

  render() {
    const {captcha, registerError}=this.props;
    let alertMessage = '';
    if (registerError && registerError.email) {
      alertMessage = "该邮箱已被注册过";
    }
    if (registerError && registerError.username) {
      if (registerError.username[0] == "This username is already taken. Please choose another.")
        return alertMessage = "用户名已经被注册过";
      else

        return alertMessage = registerError.username[0]
    }

    if(registerError && registerError.WRONG_USERNAME){
         alertMessage = "用户名格式错误";
    }
    if (registerError && registerError.password1) {
      alertMessage = registerError.password1[0];
    }
    if (registerError && registerError.CAPTCHA_WRONG_ERROR) {
      alertMessage = "验证码错误";
    }
    return (
      <View style={styles.container}>
        <TextInput style={styles.input} placeholder='用户名' onChangeText={this.handleChangeUsername.bind(this)}/>
        <Text style={styles.usernameInfo}>6~20位，可以是数字、字母和下划线的组合，但不以数字开头</Text>
        <TextInput style={styles.input} placeholder='邮箱' onChangeText={this.handleChangeEmail.bind(this)}/>
        <TextInput style={styles.input} placeholder='密码' onChangeText={this.handleChangePassword.bind(this)}/>
        <TextInput style={styles.input} placeholder='确认密码' onChangeText={this.handleChangePassword1.bind(this)}/>
        <TextInput style={styles.input} placeholder='验证码' onChangeText={this.handleChangeCaptcha.bind(this)}/>
        <Image style={styles.captcha} source={{uri: `${serverApi}/api/auth/captcha/image/${captcha}/`}}/>
        <TouchableHighlight style={styles.button}
                            underlayColor='#99d9f4' onPress={this.handleRegister.bind(this)}>
          <Text style={styles.buttonText}>Go</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.button}
                            underlayColor='#99d9f4' onPress={this.handleCloseRegister.bind(this)}>
          <Text style={styles.buttonText}>取消</Text>
        </TouchableHighlight>
        {registerError ?
          (Alert.alert(
            '错误',
            alertMessage,
            [
              {text: 'ok', onPress: ()=>console.log('ok, pressed')},
            ]
          )) : <View/>
        }
      </View>
    )
  }

}
const styles = StyleSheet.create({
  container: {
    marginTop: 65,
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
  },
  usernameInfo: {
    fontSize: 10,
  }
});
export default connect(
  (state, ownProps) => ({
    userLoad: state.auth.loaded,
    captcha: state.auth.captcha,
    registerError: state.auth.registerError,
    registerInfo: state.containers.registerInfo,
    token: state.auth.token
  }),
  {
    ...authActions,
    regUsername,
    regEmail,
    regPassword,
    regCaptcha,
    regPassword1
  }
)(Register);
