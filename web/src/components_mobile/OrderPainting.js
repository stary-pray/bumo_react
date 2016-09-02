import React, {Component, PropTypes} from "react";
import {AppRegistry, StyleSheet, Text, View, ListView, TouchableHighlight, Image, ActionSheetIOS} from "react-native";
import {connect} from "react-redux";
import {changeOrder} from "../redux/modules/containers_mobile/orderPainting";
import Icon from "react-native-vector-icons/MaterialIcons";

var BUTTONS = [
  '热门',
  '新作',
  '取消'
];
var CANCEL_INDEX = 2;
export default class OrderPainting extends Component {


  showActionSheet() {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
      },
      (buttonIndex) => {
        buttonIndex !== 2 ?
          this.props.changeOrder(BUTTONS[buttonIndex])
          : null
      }
    )
  }

  render() {
    const {component}=this.props;
    return (
      <View style={styles.header}>
        <TouchableHighlight onPress={this.showActionSheet.bind(this)}>
          <View style={styles.orderType}>
            <Icon name="sort" color={'#8F8E94'}/>
            <Text style={styles.orderText} >
              {component.orderType}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    height: 30,
    flexDirection: 'row-reverse',
    backgroundColor: 'white'
  },
  orderType: {
    margin: 7,
    marginRight: 22,
    flexDirection: 'row'
  },
  orderText:{
    color: '#8F8E94',
    fontSize: 13,
  }
});

export default connect(
  (state, ownProps) => ({
    component: state.containers.orderPainting,
  }),
  {
    changeOrder
  }
)(OrderPainting);
