import React, {Component, PropTypes} from "react";
import {AppRegistry, StyleSheet, Text, View, ListView, TouchableHighlight, Image} from "react-native";
import {connect} from "react-redux";
import {loadUserPaintingHot} from "../redux/modules/models/UserPainting";
import {initialUserPainting} from "../redux/modules/containers_mobile/userPainting";
import PureListView from "./PureListView";
import ParallaxView from "react-native-parallax-view";
import lodash from "lodash";

export default class UserPainting extends Component {

  static propTypes = {
    painting:PropTypes.object,
    UserId: PropTypes.number
  };

  static navigatorStyle = {
    navBarTranslucent: true,
  };


  componentWillUnmount() {
    this.props.initialUserPainting();
  }


  render(){
    const{component,painting,loadUserPaintingHot, UserId, profile}=this.props;
    const loadUserPaintingHotWithId = (pageIndex) => loadUserPaintingHot(UserId, pageIndex);
    const profileBody = lodash.find(profile, {user: +UserId});

    return(
      <ParallaxView backgroundSource={{uri: profileBody.banner}}
                    windowHeight={300}>
        <Image style={styles.avatar} source={{uri: profileBody.avatar}}/>
        <Text>{profileBody.nickname}</Text>
        <Text>{profileBody.description}</Text>
      <PureListView painting={painting}
                    component={component} loadPainting={loadUserPaintingHotWithId } navigator={this.props.navigator}
      />

      </ParallaxView>
    )
  }

}

const styles = StyleSheet.create({
  avatar: {
    width:100,
    height:100
  }
});

export default connect(
  (state, ownProps) => ({
    painting: state.models.painting,
    component: state.containers.userPainting,
    profile: state.models.profile
  }),
  {
    loadUserPaintingHot,
    initialUserPainting
  }
)(UserPainting);
