import React, {Component, PropTypes} from "react";
import {AppRegistry, StyleSheet, Text, View, ListView, TouchableHighlight, Image} from "react-native";
import {connect} from "react-redux";
import {loadTagPaintingDetailHot} from "../redux/modules/models/TagDetail";
import {intialTagPainting} from "../redux/modules/containers_mobile/tagPaintingDetail";
import PureListView from "./PureListView";


export default class TagDetail extends Component {

  static propTypes = {
    painting:PropTypes.object,
    tagType: PropTypes.string,
    tagName: PropTypes.string
  };

  componentWillUnmount() {
    this.props.intialTagPainting();
  }



  render(){
    const{component,painting,loadTagPaintingDetailHot, tagType, tagName, profile}=this.props;
    console.log(tagType, tagName);
    const loadTagPaintingHot = (pageIndex) => loadTagPaintingDetailHot(tagType, tagName, pageIndex);

    return(
      <PureListView painting={painting}
                    component={component} loadPainting={loadTagPaintingHot}
                    navigator={this.props.navigator}
                    profile={profile}
      />
    )
  }

}


export default connect(
  (state, ownProps) => ({
    painting: state.models.painting,
    me: state.me,
    component: state.containers.tagPaintingDetail,
    profile: state.models.profile
  }),
  {
    loadTagPaintingDetailHot,
    intialTagPainting
  }
)(TagDetail);
