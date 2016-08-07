import React, {Component, PropTypes} from "react";
import {AppRegistry, StyleSheet, Text, View, ListView, TouchableHighlight, Image} from "react-native";
import Lightbox from "react-native-lightbox";

const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class PureListView extends Component {

  static propTypes = {
    painting: PropTypes.object,
    loadPainting: PropTypes.func,
    component: PropTypes.object,
    navigator: PropTypes.object,
    profile: PropTypes.object,
    orderType: PropTypes.object,
  };

  componentWillMount() {
    console.log('willMount');
    this.loadMore();
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
    const {pageMeta, loading} = this.props.component;


    if (loading || !pageMeta.next) return;
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
    const {profile} = this.props;
    const OwnerObj = profile[rowData.owner];

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

  render() {
    const {component, painting}=this.props;
    var orderPainting = component.loaded
      ? component.indexes.map((paintingId)=> painting[paintingId])
      : [];
    const source = dataSource.cloneWithRows(orderPainting);
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
    width: 400,
    height: 200,
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
