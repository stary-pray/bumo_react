import React, {Component, PropTypes} from "react";
import {AppRegistry, StyleSheet, Text, View, ListView, TouchableHighlight, Image} from "react-native";
import {connect} from "react-redux";
import {switchTagType} from "../redux/modules/containers_mobile/navigation";
import {loadTagTypeDetail} from "../redux/modules/models/TagDetail";
import TagTypeDetail from "./TagTypeDetail";
import ScrollableTabView from "react-native-scrollable-tab-view";
class TagType extends Component {



  render(){
    return(

        <ScrollableTabView tabBarTextStyle={{fontSize: 14}}
                           tabBarInactiveTextColor={'#8F8E94'}
                           tabBarActiveTextColor={'#05AD97'}
                           tabBarUnderlineColor={'#05AD97'}
                           style={{
                             marginTop: 25,
                           }}>
          <TagTypeDetail tagType="all" navigator={this.props.navigator} tabLabel="全部"/>
          <TagTypeDetail tagType="人物" navigator={this.props.navigator} tabLabel="人物"/>
          <TagTypeDetail tagType='作品'  navigator={this.props.navigator} tabLabel='作品' />
          <TagTypeDetail tagType="属性" navigator={this.props.navigator} tabLabel="属性" />
          <TagTypeDetail tagType="活动" navigator={this.props.navigator} tabLabel="活动" />

        </ScrollableTabView>

    )
  }


}

var styles = StyleSheet.create({

});

export default connect(
  (state, ownProps) => ({
    component: state.containers.tagType,
    tags: state.models.tags,
    nav: state.containers.navigation


  }),
  {
    loadTagTypeDetail,
    switchTagType
  }
)(TagType);
