import React, {Component, PropTypes} from "react";
import {AppRegistry, StyleSheet, Text, View, ListView, TouchableHighlight, Image} from "react-native";
import {loadTagTypeDetail} from "../redux/modules/models/TagDetail";
import {connect} from "react-redux";
import _ from "lodash";
import {calculateHeat} from "../utils/common";
import {switchTagType} from "../redux/modules/containers_mobile/navigation";
//import {initialTagType} from "../redux/modules/containers_mobile/tagType";

const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class TagTypeDetail extends Component {

  static propTypes = {
    tagType: PropTypes.string,
    loadTagTypeDetail: PropTypes.func,
    component: PropTypes.object,
    navigator: PropTypes.object
  };

  componentWillMount() {
    //this.props.initialTagType();
    console.log('willMount')
    this.loadMore();

  }

  // componentDidUpdate() {
  //   if (!this.props.component.loading && !this.props.component.loaded) {
  //     console.log('DidMount')

  //   }
  // }


  loadMore() {
    const{tagType} = this.props;
    console.log('tagType', tagType)
    const {pageMeta, loading} = this.props.component[tagType];
    if (loading || !pageMeta.next) return;
    this.props.loadTagTypeDetail(tagType,pageMeta.next);
  }

  handleTagDetail(tagType,tagName){
    this.props.navigator.push({
      title:tagType,
      screen: 'bumo.TagDetail',
      passProps:{tagType: tagType, tagName: tagName}
    })


  }
  renderRow(rowData, sectionID, rowID) {
    const{painting, tagHeat,tags, tagType}= this.props;
    const topPainting = rowData.paintings ? _.find(painting, {id: rowData.paintings[0]}) : '';
    return (
      <TouchableHighlight  onPress={this.handleTagDetail.bind(this, tagType, rowData.name)}underlayColor='#dddddd'>
        <View style={styles.rowContainer}>
          {topPainting?
         <View>
            <Image style={styles.topPainting} source={{uri: topPainting.attachment}}/>
            <Text style={styles.title}>{rowData.name}</Text>
              <Text style={styles.tagHeat}>{calculateHeat(tagHeat[rowData.heat])}</Text>
           </View> :<View/>}
        </View>
      </TouchableHighlight>
    );
  }


  render() {
    const {component, tags, tagType}=this.props;
    var orderTags= component[tagType].loaded
      ? component[tagType].indexes.map((orderTagsId)=> tags[orderTagsId])
      : [];
    const source = dataSource.cloneWithRows(orderTags);
    return (
      <ListView dataSource={source}
                renderRow={this.renderRow.bind(this)}
                  onEndReached={this.loadMore.bind(this)}

      />
    )
  }

}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  topPainting: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  tagHeat:{
    fontSize: 20,
    color: '#656565'
  }

});
export default connect(
  (state, ownProps) => ({
    component: state.containers.tagType,
    tags: state.models.tags,
    painting: state.models.painting,
    tagHeat: state.models.tagHeat
  }),
  {
    loadTagTypeDetail,
    switchTagType,
    //initialTagType
  }
)(TagTypeDetail);
