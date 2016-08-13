import React, {Component, PropTypes} from "react";
import {StyleSheet, Text, View, ListView, TouchableHighlight, Image} from "react-native";
import {connect} from "react-redux";
import {logout} from "../redux/modules/auth";


export default class Me extends Component {
  handleHeader(me) {
    this.props.navigator.push({
      title: me.nickname,
      name: me.nickname,
      screen: 'bumo.UserPainting',
      passProps: {UserId: me.id}
    })
  }

  handleLogout() {
    this.props.logout();
  }

  handleLogin() {
    this.props.navigator.showModal({
      screen: "bumo.Login",
      title: "登录",
      animationType: 'slide-up'
    });
  }
  handleRegister() {
    this.props.navigator.showModal({
      screen: "bumo.Register",
      title: "注册",
      animationType: 'slide-up'
    });
  }

  render() {
    const {me} = this.props;
    return (

      <View style={styles.container}>
        <View style={styles.header}>

          {me.id ? <View>
            <Image style={styles.avatar} source={{uri: me.avatar}}/>
            <TouchableHighlight onPress={this.handleHeader.bind(this, me)} underlayColor='#dddddd'>
              <View>
              <Text style={styles.nickname}>{me.nickname}</Text>
              <Text style={styles.description}>{me.description}</Text>
                </View>
            </TouchableHighlight></View>
            :
            <View>
            <TouchableHighlight onPress={this.handleLogin.bind(this)} underlayColor='#dddddd'>
              <Text style={styles.nickname}>登录</Text>
            </TouchableHighlight>
              <TouchableHighlight onPress={this.handleRegister.bind(this)} underlayColor='#dddddd'>
                <Text style={styles.nickname}>注册</Text>
              </TouchableHighlight>
            </View>
          }

        </View>

        <TouchableHighlight onPress={this.handleLogout.bind(this)} underlayColor='#dddddd'>
          <View>
            <Text style={styles.description}>退出</Text>
          </View>
        </TouchableHighlight>
      </View>)
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey'
  },
  header: {
    margin: 10,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  avatar: {
    width: 50,
    height: 50
  },
  nickname: {
    fontSize: 20,
  },
  description: {
    fontSize: 18
  }

});

export default connect(
  (state)=>({
    me: state.me
  }), {
    logout
  }
)(Me);

