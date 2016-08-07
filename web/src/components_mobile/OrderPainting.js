import React, {Component, PropTypes} from "react";
import {AppRegistry, StyleSheet, Text, View, ListView, TouchableHighlight, Image, ActionSheetIOS} from "react-native";
import {connect} from "react-redux";
import {changeOrder} from "../redux/modules/containers_mobile/orderPainting";

var BUTTONS = [
  '热门',
  '新作',
  '取消'
];
var CANCEL_INDEX = 2;
export default class OrderPainting extends Component {


  showActionSheet(){
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
      },
      (buttonIndex) =>{
        this.props.changeOrder(BUTTONS[buttonIndex])
      }
    )
  }
  render(){
    const{component}=this.props;
    return(
      <TouchableHighlight onPress={this.showActionSheet.bind(this)}>
      <Text>
        {component.orderType}
      </Text>
        </TouchableHighlight>
    )
  }

}


export default connect(
  (state, ownProps) => ({
    component: state.containers.orderPainting,
  }),
  {
    changeOrder
  }
)(OrderPainting);
