import React, {Component, PropTypes} from "react";
import {AppRegistry, StyleSheet, Text, View, ListView, TouchableHighlight, Image, Dimensions} from "react-native";
import {loadTagTypeDetail} from "../redux/modules/models/TagDetail";
import {connect} from "react-redux";
import _ from "lodash";
import {calculateHeat} from "../utils/common";
import {switchTagType} from "../redux/modules/containers_mobile/navigation";
import Icon from "react-native-vector-icons/MaterialIcons";
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
    this.loadMore();

  }

  // componentDidUpdate() {
  //   if (!this.props.component.loading && !this.props.component.loaded) {
  //     console.log('DidMount')

  //   }
  // }


  loadMore() {

    const {tagType} = this.props;
    const {pageMeta, loading} = this.props.component[tagType];
    if (loading || !pageMeta.next) return;
    this.props.loadTagTypeDetail(tagType, pageMeta.next);

  }


  handleTagDetail(tagType, tagName) {
    this.props.navigator.push({
      title: tagType,
      screen: 'bumo.TagDetail',
      passProps: {tagType: tagType, tagName: tagName}
    })


  }

  renderRow(rowData, sectionID, rowID) {
    const {painting, tagHeat, tags, tagType}= this.props;
    const windowWidth = Dimensions.get('window').width;
    const topPainting = rowData.paintings ? _.find(painting, {id: rowData.paintings[0]}) : '';
    return (
      <TouchableHighlight onPress={this.handleTagDetail.bind(this, rowData.type, rowData.name)} underlayColor='#dddddd'>
        {topPainting ? <View style={styles.rowContainer}>
          <View>
            <Image style={{
              width: windowWidth - 20,
              height: (windowWidth - 20) / topPainting.width * topPainting.height
            }}
                   resizeMode={Image.resizeMode.cover}
                   source={{uri: topPainting.attachment}}/>
            <View style={styles.info}>
              <Text style={styles.title}>{rowData.name}</Text>
              <Text style={styles.tagHeat}>
                <Icon name="whatshot" color={'#EE634C'}/>
                {Math.round(calculateHeat(tagHeat[rowData.heat]))}
              </Text>
              {
                tagType == "all" ? <Text style={styles.type}>
                  {rowData.type}
                </Text>:<View/>
              }
            </View>
          </View>
        </View> : <View/>}
      </TouchableHighlight>
    );
  }


  render() {
    const {component, tags, tagType}=this.props;
    var orderTags = component[tagType].loaded
      ? component[tagType].indexes.map((orderTagsId)=> tags[orderTagsId])
      : [];
    const source = dataSource.cloneWithRows(orderTags);
    return (
      <ListView style={{flex: 1, backgroundColor: '#EFEFF4', padding: 10}}
                dataSource={source}
                renderRow={this.renderRow.bind(this)}
                onEndReached={this.loadMore.bind(this)}

      />
    )
  }

}

const styles = StyleSheet.create({
  rowContainer: {
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    shadowColor: '#8F8E94',
    shadowOffset: {x: 0, y: 5},
    shadowRadius: 2,
    shadowOpacity: 0.2,
    borderStyle: 'solid',
  },
  info: {
    alignItems: 'center',
    marginTop: 15
  },
  title: {
    fontSize: 18,
    color: '#16A085'
  },
  tagHeat: {
    fontSize: 14,
    color: '#EE634C'
  },
  type:{
    fontSize:14,
    color: '#C7C7CD'

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
