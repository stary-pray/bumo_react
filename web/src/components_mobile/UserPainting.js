import React, {Component, PropTypes} from "react";
import {AppRegistry, StyleSheet, Text, View, ListView, TouchableHighlight, Image} from "react-native";
import {connect} from "react-redux";
import {loadUserPaintingHot, loadUserPainting} from "../redux/modules/models/UserPainting";
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

  handleEditMe(){
    this.props.navigator.push({
      title: '编辑资料',
      name: '编辑资料',
      screen: 'bumo.EditMe',
    })
  }


  render(){
    const{component,painting,loadUserPaintingHot,
      UserId, profile, paintingHeat, loadUserPainting, orderPainting, me}=this.props;


    const profileBody = lodash.find(profile, {user: +UserId});
    const orderType = orderPainting.orderType == '热门' ? 'Hot' : 'Latest';
    const loadUserPaintingHotWithId = (pageIndex) => loadUserPaintingHot(UserId, pageIndex);
    const loadUserPaintingWithId = (pageIndex) => loadUserPainting(UserId, pageIndex);
    const load = orderPainting.orderType == '热门' ? loadUserPaintingHotWithId : loadUserPaintingWithId;

    return(
      <ParallaxView backgroundSource={{uri: profileBody.banner}}
                    windowHeight={300}>

        <Image style={styles.avatar} source={{uri: profileBody.avatar}} />
        <Text>{profileBody.nickname}</Text>
        <Text>{profileBody.introduction}</Text>
        {me.id == UserId ?
        <TouchableHighlight onPress={this.handleEditMe.bind(this)} >
          <Text>编辑资料</Text>
        </TouchableHighlight>: <View/>}
      <PureListView painting={painting}
                    component={component[orderType]} loadPainting={load} navigator={this.props.navigator}
                    paintingHeat={paintingHeat}
                    orderType={orderType}
                    profile={profile}
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
    profile: state.models.profile,
    paintingHeat: state.models.paintingHeat,
    orderPainting: state.containers.orderPainting,
    me:state.me,
  }),
  {
    loadUserPaintingHot,
    loadUserPainting,
    initialUserPainting
  }
)(UserPainting);
