import React, {Component, PropTypes} from "react";
import {AppRegistry, StyleSheet, Text, View, ListView, TouchableHighlight, Image} from "react-native";
import {connect} from "react-redux";
import {switchTagType} from "../redux/modules/containers_mobile/navigation";
import {loadTagTypeDetail} from "../redux/modules/models/TagDetail";
import TagTypeDetail from "./TagTypeDetail";
import ScrollableTabView from "react-native-scrollable-tab-view";
export default class TagType extends Component {



  handleTagType(){
    console.log('tag');
   }

  renderNav(){
    const tagTypes = ['人物', '作品', '属性','活动'];
    return(
      <View style={styles.header}>
        <Text style={styles.typeName}>全部</Text>
        {tagTypes.map(tagTypeName=>
          <TouchableHighlight onPress={this.handleTagType.bind(this, tagTypeName)}
                              underlayColor='#dddddd' style={styles.typeName}>
        <Text  key={tagTypeName}  >{tagTypeName}</Text>
          </TouchableHighlight>)}
      </View>
    )
  }

  render(){
    return(
        <ScrollableTabView onChangeTab={this.handleTagType.bind(this)}>
        <TagTypeDetail tagType="人物" navigator={this.props.navigator} tabLabel="人物"/>
          <TagTypeDetail tagType='作品'  navigator={this.props.navigator} tabLabel='作品' />
          <TagTypeDetail tagType="属性" navigator={this.props.navigator} tabLabel="属性" />
          <TagTypeDetail tagType="活动" navigator={this.props.navigator} tabLabel="活动" />

        </ScrollableTabView>
    )
  }


}

var styles = StyleSheet.create({
  TagTypeContainer:{
    flex:1
  },
  header:{
    backgroundColor:'grey',
    marginTop: 65,
    flexDirection: 'row',
    height:65
  },
  typeName:{
    flex:1,
  }
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
