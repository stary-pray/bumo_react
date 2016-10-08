import React, {Component, PropTypes} from "react";
import BumoTabViews from "./BumoTabViews.ios";
import {Navigator, StyleSheet, View, Text, TouchableOpacity} from "react-native";
import {connect} from "react-redux";

export default class BumoNavigator extends Component {
  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{
        }}
        configureScene={(route) => {
          return Navigator.SceneConfigs.FloatFromRight;
        }}
        navigationBar={this._renderNavBar(this)}
        renderScene={this.renderScene}
      />
    );
  }

  _renderNavBar(that) {

    console.log('props', that.props);

    const styles = {
      title: {
        flex: 1, alignItems: 'center', justifyContent: 'center'
      },
      button: {
        flex: 1, width: 50, alignItems: 'center', justifyContent: 'center'
      },
      buttonText: {
        fontSize: 18, color: '#FFFFFF', fontWeight: '400'
      }
    }
    var routeMapper = {
      LeftButton(route, navigator, index, navState) {


        if(index > 0) {
          return (
            <TouchableOpacity
              onPress={()=>{
                navigator.pop();
                that.props.pressLeftButton();

              }}
              style={styles.button}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
          );
        } else {
          return (
            <TouchableOpacity
              onPress={() => navigator.pop()}
              style={styles.button}>
              <Text style={styles.buttonText}>Logo</Text>
            </TouchableOpacity>
          );
        }
      },
      RightButton(route, navigator, index, navState) {
        if(index > 0 && route.rightButton) {
          return (
            <TouchableOpacity
              onPress={() => navigator.pop()}
              style={styles.button}>
              <Text style={styles.buttonText}></Text>
            </TouchableOpacity>
          );
        } else {
          return null
        }

      },
      Title(route, navigator, index, navState) {
        return (
          <View style={styles.title}>
            <Text style={styles.buttonText}>{route.title ? route.title : '恋绘'}</Text>
          </View>
        );
      }
    };
    return (
      <Navigator.NavigationBar
        style={{
          alignItems: 'center',
          backgroundColor: '#27ae60',
          shadowOffset:{
            width: 1,
            height: 0.5,
          },
          shadowColor: '#55ACEE',
          shadowOpacity: 0.8,
        }}
        routeMapper={routeMapper}
      />
    );}

    renderScene(route, navigator) {
    let Component = route.component;

    if (route.component) {
      return (
        <Component {...route.params} navigator={navigator} />
      );
    }
    return <BumoTabViews {...route.params} navigator={navigator} />;

  }
}
var styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default connect(
  (state, ownProps) => ({

  }),
  {
pressLeftButton  }
)(BumoNavigator);
