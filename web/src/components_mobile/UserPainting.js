import React, {Component, PropTypes} from "react";
import {AppRegistry, StyleSheet, Text, View, ListView, TouchableHighlight, Image, Dimensions} from "react-native";
import {connect} from "react-redux";
import {loadUserPaintingHot, loadUserPainting, loadUserLikedPainting} from "../redux/modules/models/UserPainting";
import {initialUserPainting} from "../redux/modules/containers_mobile/userPainting";
import ParallaxView from "react-native-parallax-view";
import lodash from "lodash";
import Icon from "react-native-vector-icons/MaterialIcons";
import {calculateHeat} from "../utils/common";
import ScrollableTabView from "react-native-scrollable-tab-view";
import PaintingListView from "./PaintingListView";


class UserPainting extends Component {

  static propTypes = {
    painting: PropTypes.object,
    UserId: PropTypes.number
  };

  static navigatorStyle = {
    drawUnderNavBar: true,
    navBarTransparent: true
  };

  componentWillUnmount() {

    this.props.initialUserPainting();
    console.log('will')
  }

  handleEditMe() {
    this.props.navigator.push({
      title: '编辑资料',
      name: '编辑资料',
      screen: 'bumo.EditMe',
    })
  }

  handleCameraImage() {
    this.props.navigator.push({
      title: '编辑资料',
      name: '编辑资料',
      screen: 'bumo.CameraImage',
    })
  }

  render() {
    const {
      component, painting, loadUserPaintingHot,
      UserId, profile, paintingHeat, loadUserPainting, orderPainting, me,
      profileHeat, loadUserLikedPainting
    }=this.props;


    const profileBody = lodash.find(profile, {user: +UserId});
   // const orderType = orderPainting.orderType == '热门' ? 'Hot' : 'Latest';
    const loadUserPaintingHotWithId = (pageIndex) => loadUserPaintingHot(UserId, pageIndex);
    const loadUserPaintingWithId = (pageIndex) => loadUserPainting(UserId, pageIndex);
    const loadUserLikedPaintingWithId = (pageIndex) => loadUserLikedPainting(UserId, pageIndex);

    //const load = orderPainting.orderType == '热门' ? loadUserPaintingHotWithId : loadUserPaintingWithId;
    const heatObj = profileBody ? profileHeat[profileBody.heat] : '';
    const backgroundSource = profileBody.banner? {uri: profileBody.banner}: require("../utils/assets_mobile/default_banner.png")

    return (
      <ParallaxView backgroundSource={backgroundSource}
                    windowHeight={300}
                    header={(
                      <View style={styles.header}>
                        {profileBody.avatar?
                        <Image style={styles.avatar} source={{uri: profileBody.avatar}}/>:
                          <Image style={styles.avatar} source={require("../utils/assets_mobile/default_avatar.png")}/>
                        }
                        {me.id == UserId ?
                          <TouchableHighlight onPress={this.handleEditMe.bind(this)}>
                            <Text style={styles.nickname}>{profileBody.nickname}</Text>
                          </TouchableHighlight> : <Text style={styles.nickname}>{profileBody.nickname}</Text>
                        }
                        <Text style={styles.heat}>
                          <Icon name="whatshot" color={'#EE634C'}/>
                          {Math.round(calculateHeat(heatObj))}</Text>
                      </View>
                    )}>
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
          <PaintingListView orderType="Hot" load={loadUserPaintingHotWithId } navigator={this.props.navigator} tabLabel="热门"/>
          <PaintingListView orderType="Latest" load={loadUserPaintingWithId} navigator={this.props.navigator} tabLabel="新作"/>
          <PaintingListView orderType="Like" load={loadUserLikedPaintingWithId} navigator={this.props.navigator}
                            tabLabel="喜欢"/>
        </ScrollableTabView>
      </ParallaxView>
    )
  }

}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 168,
    left: Dimensions.get('window').width / 2 - 32,
    alignItems: 'flex-start'
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    shadowColor: '#8F8E94',
    shadowOpacity: 0.2,
    marginBottom: 15,
  },
  nickname: {
    fontWeight: 'bold',
    fontSize: 18,
    shadowColor: '#8F8E94',
    shadowOpacity: 0.2,
  },
  heat: {
    marginTop: 10,
    fontSize: 14,
    color: '#EE634C'
  }
});

export default connect(
  (state, ownProps) => ({
    painting: state.models.painting,
    component: state.containers.userPainting,
    profile: state.models.profile,
    paintingHeat: state.models.paintingHeat,
    orderPainting: state.containers.orderPainting,
    me: state.me,
    profileHeat: state.models.profileHeat
  }),
  {
    loadUserPaintingHot,
    loadUserPainting,
    loadUserLikedPainting,
    initialUserPainting
  }
)(UserPainting);
