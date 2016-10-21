import {StyleSheet, Image, View, TouchableHighlight, ListView, Text, ScrollView} from "react-native";
import React, {Component, PropTypes} from "react";
import {load as loadPaintingDetail} from "../redux/modules/models/PaintingDetail";
import {connect} from "react-redux";

class PaintingModal extends Component {

  static propTypes = {
    paintingId: PropTypes.number,
  };

  static navigatorStyle = {

    tabBarHidden: true,
  };


  render() {
    const {paintingDetail, paintingId, profile, profileHeat, tags, component, paintingHeat}=this.props;
    const painting = paintingDetail[paintingId];
    const profileId = painting ? painting.profile : -1;
    const ownerProfile = painting ? profile[profileId] : -1;
    const profileHeatId = ownerProfile && ownerProfile.heat;
    const ownerProfileHeat = profileHeatId && profileHeat[profileHeatId];

    return (
      painting ?
        <View style={styles.container}>
          <Image style={styles.image}
                 source={{uri: painting.attachment}}/>
        </View> : <View/>

    )
  }

}

var styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#DDDDDD',
  },
  image: {
    width: 400,
    height: 300
  }
});


export default connect(
  (state, ownProps) => ({
    paintingDetail: state.models.paintingDetail,
    profile: state.models.profile,
    paintingHeat: state.models.paintingHeat,
    tagHeat: state.models.tagHeat,
    tags: state.models.tags,
    contributedUsers: state.models.contributedUsers,
    profileHeat: state.models.profileHeat,
    component: state.containers.Home
  }),
  {
    loadPaintingDetail,
  }
)(PaintingModal);
