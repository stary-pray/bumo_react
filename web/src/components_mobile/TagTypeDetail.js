import React, {Component, PropTypes} from "react";
import {Dimensions, Image, ListView, StyleSheet, Text, TouchableHighlight, View} from "react-native";
import {loadTagTypeDetail} from "../redux/modules/models/TagDetail";
import {connect} from "react-redux";
import lodash from "lodash";
import {calculateHeat} from "../utils/common";
import {switchTagType} from "../redux/modules/containers_mobile/navigation";
import Icon from "react-native-vector-icons/MaterialIcons";
//import {initialTagType} from "../redux/modules/containers_mobile/tagType";

const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const windowWidth = Dimensions.get('window').width;

class TagTypeDetail extends Component {

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
      passProps: {tagType: tagType, tagName: tagName},
    })
  }

  renderRow(rowData, sectionID, rowID) {
    const {painting, tagHeat, tags, tagType}= this.props;
    const topPainting = rowData.paintings ? lodash.find(painting, {id: rowData.paintings[0]}) : '';
    console.log('rowData', rowData.name);
    console.log('topPainting', topPainting);
    return (
      topPainting ?
        (<TouchableHighlight style={styles.rowContainer}
                             onPress={this.handleTagDetail.bind(this, rowData.type, rowData.name)}
                             underlayColor='#dddddd'>
          <View>
            <Image style={{
              width: (windowWidth - 40) / 2,
              height: 150
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
                </Text> : <View/>

              }
            </View>
          </View>
        </TouchableHighlight>)
        : <View/>
    );
  }


  render() {
    const {component, tags, tagType}=this.props;
    var orderTags = component[tagType].loaded
      ? component[tagType].indexes.map((orderTagsId)=> tags[orderTagsId])
      : [];
    const source = dataSource.cloneWithRows(orderTags);
    return (

      <ListView contentContainerStyle={styles.list}
                initialListSize={12}
                dataSource={source}
                renderRow={this.renderRow.bind(this)}
                onEndReached={this.loadMore.bind(this)}

      />
    )
  }

}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#EFEFF4',
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  rowContainer: {
    marginHorizontal: 10,
    marginTop: 10,
    width: (windowWidth - 40) / 2,
    height: 200,
    backgroundColor: '#FFFFFF',
    shadowColor: '#8F8E94',
    shadowOffset: {x: 0, y: 5},
    shadowRadius: 2,
    shadowOpacity: 0.2,
    borderStyle: 'solid',
  },
  info: {
    alignItems: 'center',
    marginTop: 8
  },
  title: {
    fontSize: 14,
    color: '#16A085'
  },
  tagHeat: {
    fontSize: 10,
    color: '#EE634C'
  },
  type: {
    fontSize: 10,
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
