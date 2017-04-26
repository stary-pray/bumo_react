import React from "react";
import {TabNavigator} from "react-navigation";
import User from "./User";
import Icon from "react-native-vector-icons/MaterialIcons";
import TagType from "./TagType";
import Me from "./Me";
import FindPainting from "./FindPainting";

const MainTab = TabNavigator({
  FindPainting: {
    screen: FindPainting,
    navigationOptions: {
      tabBarLabel: '探索',
      tabBarIcon: ({tintColor}) => (
          <Icon name="explore" size={26}
                style={[{color: tintColor}]}/>)
    }
  },
  User: {
    screen: User,
    navigationOptions: {
      tabBarLabel: '画家',
      tabBarIcon: ({tintColor}) => (
        <Icon name="palette" size={26}
              style={[{color: tintColor}]}/>)
    }
  },
  TagType: {
    screen: TagType,
    navigationOptions: {
      tabBarLabel: '标签',
      tabBarIcon: ({tintColor}) => (
        <Icon name="photo-album" size={26}
              style={[{color: tintColor}]}/>)
    }
  },
  Me: {
    screen: Me,
    navigationOptions: {
      tabBarLabel: '我',
      tabBarIcon: ({tintColor}) => (
        <Icon name="person" size={26}
              style={[{color: tintColor}]}/>)
    }
  },
}, {
  tabBarOptions: {
    activeTintColor: '#16A085',
    cardStyle:{
      backgroundColor: 'white'
    }
  },
});


export default MainTab;
