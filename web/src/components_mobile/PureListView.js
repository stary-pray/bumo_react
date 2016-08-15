import React, {Component, PropTypes} from "react";
import {AppRegistry, StyleSheet, Text, View, ListView, TouchableHighlight, Image} from "react-native";
import Lightbox from "react-native-lightbox";
import shallowCompare from "react-addons-shallow-compare";
import OrderPainting from "./OrderPainting";

const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class PureListView extends Component {

  static propTypes = {
    painting: PropTypes.object,
    loadPainting: PropTypes.func,
    component: PropTypes.object,
    navigator: PropTypes.object,
    profile: PropTypes.object,
    orderType: PropTypes.object,
    tagType: PropTypes.string,
    paintingHeat: PropTypes.object
  };

  componentWillMount() {
    console.log('willMount');
    this.loadMore();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props.orderType, nextProps.orderType);
    if (this.props.orderType != nextProps.orderType) {
      // initial
      console.log('loadmore');
      this.loadMore();
    }
  }


  loadMore() {
    const {tagType} = this.props;
    const {pageMeta, loading} = this.props.component;
    if (loading || !pageMeta.next) return;
    tagType ?
      this.props.loadPainting(tagType, pageMeta.next) :
      this.props.loadPainting(pageMeta.next);

  }

  handleLike(paintingId) {
    this.props.navigator.push({
      title: '支持作者',
      name: '支持作者',
      screen: 'bumo.Like',
      passProps: {paintingId: paintingId}
    })
  }

  renderRow(rowData, sectionID, rowID) {
    const {profile, paintingHeat} = this.props;
    const OwnerObj = profile[rowData.owner];
    const heatObj = paintingHeat[rowData.heat];
    return (

      <View style={styles.rowContainer}>
        <Lightbox>

          <Image style={styles.thumb} source={{uri: rowData.attachment}}/>
        </Lightbox>
        <View style={styles.infoContainer}>
          <TouchableHighlight onPress={()=>this.rowPressed(rowData.id)}
                              underlayColor='#dddddd'>
            <View style={styles.info}>
              <Text style={styles.title}>{OwnerObj.nickname}</Text>
              <View style={styles.separator}/>
              <Text style={styles.title}>{rowData.title}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={this.handleLike.bind(this, rowData.id)}
                              underlayColor='#dddddd'>
            <View style={styles.like}>
              <Text style={styles.title}>喜欢</Text>
              <Text style={styles.title}>{heatObj.point}</Text>

            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
      ;
  }

  rowPressed(paintingId) {
    const {painting}=this.props;
    var paintingTitle = painting[paintingId].title;
    console.log('1', this.props.navigator
    );
    this.props.navigator.push({
      title: paintingTitle,
      name: paintingTitle,
      screen: 'bumo.PaintingDetail',
      passProps: {paintingId: paintingId}
    })
  }

  renderHeader() {
    return (
      <OrderPainting/>
    )

  }

  handleOnEndReached() {
    if (this.props.component.loaded && !this.props.component.loading) {
      this.loadMore();
    }
  }

  render() {
    const {component, painting, tagType, loadPainting}=this.props;
    var orderPainting = component.loaded
      ? component.indexes.map((paintingId)=> painting[paintingId])
      : [];
    const source = dataSource.cloneWithRows(orderPainting);

    return (
      <ListView style={{flex:1}}
                dataSource={source}
        renderRow={this.renderRow.bind(this)}
        onEndReached={this.handleOnEndReached.bind(this)}
        onEndReachedThreshold={50}
        renderHeader={this.renderHeader.bind(this)}
        automaticallyAdjustContentInsets={false}
      />
    )
  }

}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'column',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  info: {
    flexDirection: 'column',
  },
  title: {
    margin: 5,
    fontSize: 20,
    color: '#656565',
    paddingLeft: 10
  },
  thumb: {
    width: 375,
    height: 266,
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD',
    width: 300
  },
  like: {
    backgroundColor: 'red',
    borderColor: 'red',
    alignItems: 'center'
  }
});
