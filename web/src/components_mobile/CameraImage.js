import React, {Component, PropTypes} from "react";
import {StyleSheet, Text, View, ListView, TouchableHighlight, Image, CameraRoll, ScrollView} from "react-native";
import {logCameraImage} from "../redux/modules/containers_mobile/cameraImage";
import {connect} from "react-redux";

class CameraImage extends Component{

  constructor(){
    super();
    this.storeImages = this.storeImages.bind(this);
    this.logImageError = this.logImageError.bind(this);
  }

  componentDidMount() {
    const fetchParams = {
      first: 45,

    };
    CameraRoll.getPhotos(fetchParams, this.storeImages, this.logImageError);
  }

  storeImages(data) {
    const assets = data.edges;
    const images = assets.map((asset) => asset.node.image);
    console.log(images);
    this.props.logCameraImage(images);

  }

  logImageError(err) {
    console.log(err);
  }

  render() {
    const {cameraImage} = this.props;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.imageGrid}>

          {cameraImage.images&&cameraImage.images.map((image) => <Image style={styles.image} source={{ uri: image.uri }} />) }
        </View>
      </ScrollView>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  imageGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
});
export default connect(
  (state, ownProps) => ({
    cameraImage: state.containers.cameraImage
  }),
  {
   logCameraImage
  }
)(CameraImage);
