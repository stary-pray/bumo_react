import React, {Component} from "react";
import {Button, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import Home from "./Home.mobile";
import TagTypePainting from "./TagTypePainting";
import ScrollableTabView from "react-native-scrollable-tab-view";
export default class FindPainting extends Component {

  handleSearch() {
    this.props.navigator.push({
      screen: "bumo.SearchResultNew",
      title: "搜索",
      animationType: 'slide-down',
      navigatorStyle:{
        navBarTextColor: '#8F8E94',
        navBarButtonColor: '#8F8E94',
        navBarHidden: true,
      }
    });
  }

  static navigationOptions = ({navigation}) => {
    console.log(navigation);
    return {
      headerRight: (
        <Button title={'搜索'} onPress={()=>(navigation.navigate('SearchResultNew'))}/>
      ),
    };
  };

  render() {
    const {navigation} = this.props;
    return (
      <View style={{flex: 1, flexDirection: 'column',}}>
        <TouchableHighlight  onPress={this.handleSearch.bind(this)}>
        <View style={styles.searchInput} >
          <Text style={ styles.searchText }>搜索</Text>
        </View>
          </TouchableHighlight>
        <ScrollableTabView
          tabBarTextStyle={{fontSize: 14}}
          tabBarInactiveTextColor={'#8F8E94'}
          tabBarActiveTextColor={'#05AD97'}
          tabBarUnderlineStyle ={{backgroundColor:'#05AD97'}}
          style={{
            borderTopColor: '#C7C7CD',
          }}

        >
          <Home navigation={navigation} navigator={this.props.navigator} tabLabel="全部"/>
          <TagTypePainting tagType="人物" navigation={navigation} navigator={this.props.navigator} tabLabel="人物"/>
          <TagTypePainting tagType='作品' navigation={navigation} navigator={this.props.navigator} tabLabel='作品'/>
          <TagTypePainting tagType="属性" navigation={navigation} navigator={this.props.navigator} tabLabel="属性"/>
          <TagTypePainting tagType="活动" navigation={navigation} navigator={this.props.navigator} tabLabel="活动"/>
        </ScrollableTabView>
      </View>

    )
  }

}

const styles = StyleSheet.create({
  searchInput: {
    flex: 1,
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
