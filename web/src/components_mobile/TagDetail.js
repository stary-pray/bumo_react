import React, {Component, PropTypes} from "react";
import {AppRegistry, StyleSheet, Text, View, ListView, TouchableHighlight, Image} from "react-native";
import {connect} from "react-redux";
import {loadTagPaintingDetailHot, loadTagPaintingDetail} from "../redux/modules/models/TagDetail";
import {intialTagPainting} from "../redux/modules/containers_mobile/tagPaintingDetail";
import PureListView from "./PureListView";


class TagDetail extends Component {

  static propTypes = {
    painting:PropTypes.object,
    tagType: PropTypes.string,
    tagName: PropTypes.string
  };
  static navigatorStyle = {
    tabBarHidden: true,
    navBarButtonColor: '#05AD97',
  };

  componentWillUnmount() {
    this.props.intialTagPainting();
  }



  render(){
    const{component,painting,loadTagPaintingDetailHot,
      tagType, tagName, profile, loadTagPaintingDetail, orderPainting,paintingHeat}=this.props;
    console.log(tagType, tagName);
    const loadTagPaintingHot = (pageIndex) => loadTagPaintingDetailHot(tagType, tagName, pageIndex);
    const loadTagPainting = (pageIndex) => loadTagPaintingDetail(tagType, tagName, pageIndex);
    const orderType = orderPainting.orderType == '热门' ? 'Hot' : 'Latest';
    const load = orderPainting.orderType == '热门' ? loadTagPaintingHot : loadTagPainting;



    return(
      <PureListView painting={painting}
                    component={component} loadPainting={load}
                    orderType={orderType}
                    navigator={this.props.navigator}
                    profile={profile}
                    paintingHeat={paintingHeat}
      />
    )
  }

}


export default connect(
  (state, ownProps) => ({
    painting: state.models.painting,
    me: state.me,
    component: state.containers.tagPaintingDetail,
    profile: state.models.profile,
    orderPainting: state.containers.orderPainting,
    paintingHeat: state.models.paintingHeat
  }),
  {
    loadTagPaintingDetailHot,
    loadTagPaintingDetail,
    intialTagPainting
  }
)(TagDetail);
