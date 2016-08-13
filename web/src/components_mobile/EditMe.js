import React, {Component, PropTypes} from "react";
import {AppRegistry, StyleSheet, Text, View, ListView, TouchableHighlight, Image, TextInput} from "react-native";
import {connect} from "react-redux";
import {update as updateMe, load} from "../redux/modules/me";


export default class EditMe extends Component {

  componentWillMount(){
    this.props.load()
  }

  render(){
    const{me} = this.props;
    return(
      <View>
        <View style={styles.rowContainer}>
        <Text style={styles.label} >用户名</Text>
        <TextInput style={styles.input} value={me.username} />
          </View>
        <View>
        <Text  style={styles.label} >昵称</Text>
        <TextInput style={styles.input} value={me.nickname} onChangeText={(text) => {
          ;
        }}/>
          </View>
        <View>
        <Text  style={styles.label} >简介</Text>
        <TextInput style={styles.input} value={me.introduction}/>
          </View>
      </View>
    )
  }


}

var styles = StyleSheet.create({
  rowContain:{
    flexDirection:'row'
  },
  label:{
    fontSize: 18,
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
});

export default connect(
  (state, ownProps) => ({
    component: state.containers.meUpdate,
    me: state.me,
    initialValues: {
      nickname: state.me.nickname,
      introduction: state.me.introduction ? state.me.introduction : '',
      description: state.me.description ? state.me.description : ''
    }
  }),
  {
    updateMe,
    load
  }
)(EditMe);
