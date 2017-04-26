import React from "react";
import {StackNavigator} from "react-navigation";
import PaintingDetail from "./PaintingDetail";
import MainTab from "./MainTab.tab";
import SearchResultNew from "./SearchResultNew";

const Explore = StackNavigator({
  MainTab: {
    screen: MainTab,
    navigationOptions: {
      title:"恋绘·星祈",
      headerTintColor:'#16A085',
    }
  },
  PaintingDetail: {
    screen:PaintingDetail,
  },
  SearchResultNew: {
    screen:SearchResultNew,
  },
});






export default Explore;
