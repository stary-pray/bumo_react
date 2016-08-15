import React, {Component, PropTypes} from "react";
import {AppRegistry, StyleSheet, Text, View, ListView, TouchableHighlight, Image} from "react-native";
import Home from "./Home.mobile";
import TagTypePainting from "./TagTypePainting";
import ScrollableTabView from "react-native-scrollable-tab-view";
export default class FindPainting extends Component {

  render() {

    return (
      <ScrollableTabView style={{marginTop: 20, flex:1}}  >

        <Home navigator={this.props.navigator} tabLabel="全部"/>
        <TagTypePainting tagType="人物" navigator={this.props.navigator} tabLabel="人物"/>
        <TagTypePainting tagType='作品'  navigator={this.props.navigator} tabLabel='作品' />
        <TagTypePainting tagType="属性" navigator={this.props.navigator} tabLabel="属性" />
        <TagTypePainting tagType="活动" navigator={this.props.navigator} tabLabel="活动" />
      </ScrollableTabView>

    )
  }

}
