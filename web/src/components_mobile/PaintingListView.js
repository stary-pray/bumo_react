import {ListView, Text, Image, Dimensions, StyleSheet, View, TouchableHighlight} from "react-native";
import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import Lightbox from "react-native-lightbox";
import {calculateHeat} from "../utils/common";
import moment from "moment";
import "moment/locale/zh-cn";
import Icon from "react-native-vector-icons/MaterialIcons";

const dataSource = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
});

class PaintingListView extends Component {
  static propTypes = {
    orderType: PropTypes.string,
    load: PropTypes.func,
  };

  componentWillMount() {
    this.loadMore();
  }

  loadMore() {
    const {orderType} = this.props;
    const {pageMeta, loading} = this.props.component[orderType];
    if (loading || !pageMeta.next) return;
    this.props.load(pageMeta.next);

  }

  handleLike(paintingId) {
    this.props.navigator.push({
      title: '支持作者',
      name: '支持作者',
      screen: 'bumo.Like',
      passProps: {paintingId: paintingId}
    })
  }

  renderRow(rowData, sectionId, rowID) {
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
          <Image style={{
            width: windowWidth,
            height: windowWidth / rowData.width * rowData.height
          }}
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
  }

  render() {
    const {orderType, painting, component} = this.props;
    var orderPainting = component[orderType].loaded
      ? component[orderType].indexes.map((orderId)=> painting[orderId])
      : [];
    const source = dataSource.cloneWithRows(orderPainting);
    return (
      <ListView
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
  likeCount: {
    color: '#EE634C',
    fontSize: 14,
    marginTop: 8,
    height: 25,
  },
  likeButton: {
    marginTop: 2,

  }
});
export default connect(
  (state, ownProps) => ({
    component: state.containers.userPainting,
    painting: state.models.painting,
    profileHeat: state.models.profileHeat,
    profile: state.models.profile,
    paintingHeat: state.models.paintingHeat
  }),
  {}
)(PaintingListView);
