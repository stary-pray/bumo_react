import React, {Component, PropTypes} from "react";
import {AppRegistry, StyleSheet, Text, View} from "react-native";
import {connect} from "react-redux";
import {load as loadPainting, loadHot as loadHotPainting} from "../redux/modules/models/Painting";

class Home extends Component {

  componentDidMount(){
    this.props.loadPainting(1);
  }

  render(){
    const {component} = this.props;
    return (<View style={styles.container}>
      <Text style={styles.welcome}>
        Welcome to React Native!
      </Text>
      {
        // component.loaded ? component.indexes.map( id =>(
        //   <Text key={id}> {painting[id].title} </Text>
        // )) : null
      }
      <Text style={styles.instructions}>
        To get started, edit index.ios.js
      </Text>
      <Text style={styles.instructions}>
        Press Cmd+R to reload,{'\n'}
        Cmd+D or shake for dev menu
      </Text>
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default connect(
  (state, ownProps) => ({
    painting: state.models.painting,
    profile: state.models.profile,
    paintingHeat: state.models.paintingHeat,
    waypoint: state.waypoint,
    me: state.me,
    preferences: state.preferences,
  }),
  {
    loadPainting,
    loadHotPainting,
  }
)(Home);
