import React, {Component, PropTypes} from "react";
import {AppRegistry, StyleSheet, Text, View, ListView, TouchableHighlight, Image, Dimensions} from "react-native";
import Lightbox from "react-native-lightbox";
import shallowCompare from "react-addons-shallow-compare";
import OrderPainting from "./OrderPainting";
import moment from "moment";
import "moment/locale/zh-cn";
import Icon from "react-native-vector-icons/MaterialIcons";
import {calculateHeat} from "../utils/common";

moment.locale('zh-cn');

const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class PureListView extends Component {

  static propTypes = {
    painting: PropTypes.object,
    loadPainting: PropTypes.func,
    component: PropTypes.object,
    navigator: PropTypes.object,
    profile: PropTypes.object,
    orderType: PropTypes.string,
    tagType: PropTypes.string,
    paintingHeat: PropTypes.object
  };

  componentWillMount() {
    this.loadMore(this.props);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.orderType != nextProps.orderType) {
      this.loadMore(nextProps);
    }
  }


  loadMore(props) {
    const {tagType} = props;
    const {pageMeta, loading} = props.component;
    if (loading || !pageMeta.next) return
    tagType ?
      props.loadPainting(tagType, pageMeta.next) :
      props.loadPainting(pageMeta.next);

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
    const windowWidth = Dimensions.get('window').width;
    return (
      <View style={styles.rowContainer}>
        <Lightbox
          activeProps={
          {
            style: {
              width: Dimensions.get('window').width,
              height: Dimensions.get('window').height
            },
            resizeMode: 'contain'
          }
          }>
          <Image style={{width: windowWidth,
            height: windowWidth / rowData.width * rowData.height}}
                 resizeMode={Image.resizeMode.cover}
                 source={{uri: `${rowData.attachment}?imageMogr2/format/webp/thumbnail/${windowWidth * 2}x/interlace/1`}}/>
        </Lightbox>
        <View style={styles.infoContainer}>
          <TouchableHighlight
            onPress={()=>this.rowPressed(rowData.id)}
            underlayColor='#dddddd'
            style={styles.info}
          >
            <View>
              <View style={styles.titleView}>
                <Text style={styles.title}>{rowData.title}</Text>
              </View>
              <View style={styles.ownerInfo}>
                <Image style={styles.avatar} source={{uri: OwnerObj.avatar}}/>
                <View>
                  <Text style={styles.nickname}>{OwnerObj.nickname}</Text>
                  <Text style={styles.created}>{moment(rowData.created).fromNow()}</Text>
                </View>
              </View>
            </View>
          </TouchableHighlight>
          <View style={styles.like}>
            <Text style={styles.likeCount}>
              <Icon name="whatshot" color={'#EE634C'}/>
              {Math.round(calculateHeat(heatObj))}</Text>
            <TouchableHighlight
              onPress={this.handleLike.bind(this, rowData.id)}
              underlayColor='#dddddd'
            >
              <View style={styles.likeButton}><Icon name="favorite" color={'#EE634C'} size={30}/></View>
            </TouchableHighlight>
          </View>
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
      this.loadMore(this.props);
    }
  }

  render() {
    const {component, painting, tagType, loadPainting}=this.props;
    const {loading} =this.props.component;
    console.log('loading',loading);
    var orderPainting = component.loaded
      ? component.indexes.map((paintingId)=> painting[paintingId])
      : [];
    const source = dataSource.cloneWithRows(orderPainting);

    return (

      <ListView style={{flex: 1, backgroundColor: '#EFEFF4'}}
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
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    shadowColor: '#8F8E94',
    shadowOffset: {x: 0, y: 5},
    shadowRadius: 2,
    shadowOpacity: 0.2,
    borderStyle: 'solid'

  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  info: {
    flex: 1,
    height: 80,
    flexDirection: 'column',
  },
  titleView: {
    borderBottomColor: '#C7C7CD',
    borderBottomWidth: 0.5,
    borderStyle: 'solid',
    height: 30,
  },
  title: {
    fontSize: 14,
    color: '#16A085',
    marginLeft: 15,
    marginTop: 8,
    borderBottomColor: '#C7C7CD',
    borderBottomWidth: 0.5,
    borderStyle: 'solid',
    height: 25,
  },
  like: {
    borderColor: '#C7C7CD',
    borderLeftWidth: 0.5,
    alignItems: 'center',
    width: 70,
    flexDirection: 'column',
  },
  nickname: {
    fontSize: 12,
    color: '#8F8E94',
    paddingLeft: 10,
  },
  created: {
    marginTop: 4,
    fontSize: 12,
    color: '#C7C7CD',
    paddingLeft: 10,
  },
  avatar: {
    marginTop: 2,
    marginLeft: 15,
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  ownerInfo: {
    flexDirection: 'row',
    marginTop: 8
  },
  likeCount:{
    color:'#EE634C',
    fontSize:14,
    marginTop: 8,
    height: 25,
  },
  likeButton:{
    marginTop: 2,

  }
});
