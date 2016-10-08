import React, {Component, PropTypes} from "react";
import {AppRegistry, StyleSheet, Text, View, ListView, TouchableHighlight, Image, TextInput} from "react-native";
import Home from "./Home.mobile";
import TagTypePainting from "./TagTypePainting";
import ScrollableTabView from "react-native-scrollable-tab-view";

export default class FindPainting extends Component {

  handleSearch() {
    this.props.navigator.push({
      screen: "bumo.SearchResult",
      title: "搜索",
      animationType: 'slide-down',
      navigatorStyle:{
        navBarTextColor: '#8F8E94',
        navBarButtonColor: '#8F8E94',
        navBarHidden: true,
      }
    });
  }

  render() {

    return (
      <View style={{marginTop: 25, flex: 1, flexDirection: 'column',}}>
        <TouchableHighlight  onPress={this.handleSearch.bind(this)}>
        <View style={styles.searchInput} >
          <Text style={ styles.searchText }>搜索</Text>
        </View>
          </TouchableHighlight>
        <ScrollableTabView
          tabBarTextStyle={{fontSize: 14}}
          tabBarInactiveTextColor={'#8F8E94'}
          tabBarActiveTextColor={'#05AD97'}
          tabBarUnderlineColor={'#05AD97'}
          style={{
            borderTopWidth: 0.5,
            borderTopColor: '#C7C7CD',
          }}
        >
          <Home navigator={this.props.navigator} tabLabel="全部"/>
          <TagTypePainting tagType="人物" navigator={this.props.navigator} tabLabel="人物"/>
          <TagTypePainting tagType='作品' navigator={this.props.navigator} tabLabel='作品'/>
          <TagTypePainting tagType="属性" navigator={this.props.navigator} tabLabel="属性"/>
          <TagTypePainting tagType="活动" navigator={this.props.navigator} tabLabel="活动"/>
        </ScrollableTabView>
      </View>

    )
  }

}

const styles = StyleSheet.create({

  searchInput: {
    flex: 0,
    height: 30,
    marginLeft: 7.5,
    marginRight: 7.5,
    marginBottom: 4,
    borderRadius: 5,
    backgroundColor: 'rgba(3,3,3,0.09)',
  },
  searchText: {
    fontSize: 14,
    color: '#7A797B',
    alignSelf: 'center',
    paddingTop: 7,
  },
});
