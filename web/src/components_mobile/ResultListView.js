import React, {Component, PropTypes} from "react";
import {AppRegistry, StyleSheet, Text, View, ListView, TouchableHighlight, Image, Dimensions} from "react-native";


const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export default class ResultListView extends Component {

  static propTypes = {
    type: PropTypes.string,
    component: PropTypes.array,
    navigator: PropTypes.object,

  };




  renderRow(rowData, sectionID, rowID) {
    const {type} = this.props;

    var attachment;
    var title;
    const windowWidth = Dimensions.get('window').width;
    switch (type) {
      case 'painting':
        attachment = rowData.attachment;
        title = rowData.title;
        break;
      case 'owner':
        attachment = rowData.avatar;
        title = rowData.nickname;
        break;
    }
    return (
      type == 'tag' ?
        <View>
          <TouchableHighlight onPress={()=>this.handleTagDetail(rowData.type, rowData.name)}>
            <Text style={styles.tag}># {rowData.name} : {rowData.type}</Text>
          </TouchableHighlight>
        </View> :
        (type == 'painting' ?
          <TouchableHighlight onPress={()=>this.handlePainting(rowData.key, rowData.title)}>
            <View style={styles.rowContainer}>

              <Image style={{width: windowWidth / 4, height: windowWidth / 4}}
                     resizeMode={Image.resizeMode.cover}
                     source={{uri: `https://o4dv415rs.qnssl.com/${attachment}?imageMogr2/format/webp/thumbnail/${windowWidth}x/interlace/1`}}/>
              <Text style={styles.title}>{title}</Text>
            </View>
          </TouchableHighlight>
          :
          <TouchableHighlight onPress={()=>this.handleOwner(rowData.key)}>
            <View style={styles.rowContainer}>

              <Image style={{width: windowWidth / 4, height: windowWidth / 4}}
                     resizeMode={Image.resizeMode.cover}
                     source={{uri: `https://o4dv415rs.qnssl.com/${attachment}?imageMogr2/format/webp/thumbnail/${windowWidth}x/interlace/1`}}/>
              <Text style={styles.title}>{title}</Text>
            </View>
          </TouchableHighlight>)

    )
      ;
  }


  handleTagDetail(tagType, tagName) {
    this.props.navigator.push({
      title: tagType,
      screen: 'bumo.TagDetail',
      passProps: {tagType: tagType, tagName: tagName},
    })
  }

  handlePainting(paintingId, paintingTitle) {

    this.props.navigator.push({
      title: paintingTitle,
      name: paintingTitle,
      screen: 'bumo.PaintingDetail',
      passProps: {paintingId: paintingId}
    })
  }

  handleOwner(userId) {
    this.props.navigator.push({
      screen: 'bumo.UserPainting',
      navigatorStyle: {
        navBarHideOnScroll: true, // make the nav bar hidden only after the user starts to scroll
        navBarTranslucent: true,
      },
      passProps: {UserId: userId}
    })
  }

  render() {
    const {component}=this.props;
    const source = dataSource.cloneWithRows(component);
    return (
      component.length == 0 ?
        <View>
          <Text style={styles.noResult}>还没有相关的结果</Text>
        </View> :
        <ListView style={{flex: 1, backgroundColor: '#EFEFF4'}}
                  dataSource={source}
                  renderRow={this.renderRow.bind(this)}
                  automaticallyAdjustContentInsets={false}

        />
    )
  }

}

const styles = StyleSheet.create({
  noResult:{
    marginTop: 15,
    marginLeft:10,
    color:'#8F8E94'
  },
  rowContainer: {
    marginBottom: 15,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    shadowColor: '#8F8E94',
    shadowOffset: {x: 0, y: 5},
    shadowRadius: 2,
    shadowOpacity: 0.2,
    borderStyle: 'solid'
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
  tag: {
    fontSize: 14,
    color: '#16A085',
    marginLeft: 15,
    marginTop: 8,
    borderBottomColor: '#C7C7CD',
    borderBottomWidth: 0.5,
    borderStyle: 'solid',
    height: 25,
  },
});
