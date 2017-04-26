import {Image, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import React, {Component, PropTypes} from "react";
import {load as loadPaintingDetail} from "../redux/modules/models/PaintingDetail";
import {connect} from "react-redux";
import {calculateHeat} from "../utils/common";
import moment from "moment";
import Comments from "./Comment";
import Lightbox from "react-native-lightbox";
class PaintingDetail extends Component {

  static propTypes = {
    paintingId: PropTypes.number,
  };

  static navigatorStyle = {
    tabBarHidden: true,
    navBarButtonColor: '#05AD97',
  };

  static navigationOptions = ({navigation, screenProps}) => {
    return {
      title: navigation.state.params.title,
    }
  };


  componentWillMount() {
    this.props.loadPaintingDetail(this.props.paintingId)
  }

  handleUserPainting(ownerProfile) {
    this.props.navigator.push({
      title: ownerProfile.nickname,
      name: ownerProfile.nickname,
      screen: 'bumo.UserPainting',
      passProps: {UserId: ownerProfile.id}
    })
  }

  handleComment(paintingId) {
    this.props.navigator.push({
      title: '评论',
      name: '评论',
      screen: 'bumo.Comment',
      passProps: {paintingId: paintingId}
    })
  }

  handleLike(paintingId) {
    this.props.navigator.push({
      title: '支持作者',
      name: '支持作者',
      screen: 'bumo.Like',
      passProps: {paintingId: paintingId}
    })
  }


  render() {
    const {paintingDetail, paintingId, profile, profileHeat, tags, component, paintingHeat} = this.props;
    const painting = paintingDetail[paintingId];
    const profileId = painting ? painting.profile : -1;
    const ownerProfile = painting ? profile[profileId] : -1;
    const profileHeatId = ownerProfile && ownerProfile.heat;
    const ownerProfileHeat = profileHeatId && profileHeat[profileHeatId];

    return (
      painting ?
        <View style={styles.container}>
          <TouchableHighlight onPress={this.handleUserPainting.bind(this, ownerProfile)}>
            <View style={styles.profile}>
              <Image style={styles.avatar}
                     source={ownerProfile.avatar ? {uri: ownerProfile.avatar} : require("../utils/assets_mobile/default_avatar.png") }/>
              <Text style={styles.description}>{ownerProfile.nickname}</Text>
              <Text style={styles.description}>{ownerProfileHeat && calculateHeat(ownerProfileHeat)}</Text>
              <Text style={styles.description}>{moment(painting.created).fromNow()}</Text>
            </View>
          </TouchableHighlight>
          <Lightbox>
            <Image style={styles.image}
                   source={{uri: painting.attachment}}/>
          </Lightbox>

          <View style={styles.paintingDetail}>
            <View style={styles.paintingTop}>
              <Text style={styles.title}>{painting.title}</Text>
              <Text
                style={styles.heat}>{paintingHeat && paintingHeat[paintingId] && calculateHeat(paintingHeat[paintingId])}</Text>
            </View>
            {(painting && painting.tags ?
              <View style={styles.tag}>
                <Text style={styles.tagSign}>#</Text>
                {painting.tags.map((id) => (
                  <Text style={styles.tagName} key={id}>{tags[id].name}</Text>
                ))}
              </View> :
              <Text>没有标签 =A=</Text>)}
            <View style={styles.separator}/>
          </View>
          <TouchableHighlight onPress={this.handleComment.bind(this, paintingId)}>
            <Text>评论</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.handleLike.bind(this, paintingId)}>
            <Text>点赞</Text>
          </TouchableHighlight>
          <Comments paintingId={paintingId}/>
        </View> : <View/>

    )
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  profile: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F8F8F8'
  },
  avatar: {
    width: 50,
    height: 50
  },
  paintingDetail: {
    backgroundColor: '#F8F8F8',
  },
  paintingTop: {
    flexDirection: 'row',
  },

  separator: {
    height: 1,
    backgroundColor: '#DDDDDD'
  },
  image: {
    width: 400,
    height: 300
  },
  title: {
    fontSize: 20,
    margin: 5,
    color: '#656565'
  },
  heat: {
    fontSize: 20,
    color: '#656565'
  },
  description: {
    fontSize: 18,
    margin: 5,
    color: '#656565'
  },
  tag: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  tagSign: {
    color: '#656565'
  },
  tagName: {
    color: '#656565',
    margin: 5
  }
});


export default connect(
  (state, ownProps) => ({
    paintingId: ownProps.navigation.state.params.paintingId,
    paintingDetail: state.models.paintingDetail,
    profile: state.models.profile,
    paintingHeat: state.models.paintingHeat,
    tagHeat: state.models.tagHeat,
    tags: state.models.tags,
    contributedUsers: state.models.contributedUsers,
    profileHeat: state.models.profileHeat,
    component: state.containers.paintingDetail
  }),
  {
    loadPaintingDetail,
  }
)(PaintingDetail);
