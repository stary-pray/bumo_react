import React, {Component, PropTypes} from "react";
import {StyleSheet, Text, View, Image, TabBarIOS} from "react-native";
import Login from "./Login";
import {switchTab} from "../redux/modules/containers_mobile/navigation";
import {connect} from "react-redux";
import Home from "./Home.mobile";
import TagType from "./TagType";
export default class BumoTabViews extends Component {
  render() {
    const{component}=this.props;
    return (
      <TabBarIOS
        unselectedTintColor="#fafafa"
        tintColor="#ffffff"
        barTintColor="#27ae60">
        <TabBarIOS.Item
          systemIcon="most-viewed"
          title="发现"
          selected={component.tab === 'paintingList'}
          onPress={this.onTabSelect.bind(this, 'paintingList')}
        >
          <Home navigator={this.props.navigator}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="bookmarks"
          title="我"
          selected={component.tab === 'tag'}
          onPress={this.onTabSelect.bind(this, 'tag')}
        >
          <TagType navigator={this.props.navigator}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="contacts"
          title="我"
          selected={component.tab === 'me'}
          onPress={this.onTabSelect.bind(this, 'me')}
        >
          <Login navigator={this.props.navigator}
          />
        </TabBarIOS.Item>
      </TabBarIOS>
    );

  }


  onTabSelect(tab){
    if(this.props.tab!==tab){
      this.props.switchTab(tab);
    }
  }

}


export default connect(
  (state, ownProps) => ({
  component: state.containers.navigation
  }),
  {
    switchTab
  }
)(BumoTabViews);
