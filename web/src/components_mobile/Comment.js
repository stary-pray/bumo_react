import {Image, ListView, StyleSheet, Text, TextInput, View} from "react-native";
import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {addComments, deleteComments, loadComments} from "../redux/modules/models/Comments";
import {logComment} from "../redux/modules/containers_mobile/commentLog";
import moment from "moment";
moment.locale('zh-cn');


const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Comment extends Component {

  static propTypes = {
    paintingId: PropTypes.number,
  };

  componentWillMount() {
    this.loadComments();
  }

  loadComments() {
    const {paintingId, component} = this.props;
    const {pageMeta, loading} = component;
    console.log('pageMeta', pageMeta);
    if (loading || !pageMeta.next) return;
    this.props.loadComments(paintingId, pageMeta.next);

  }

  renderRow(rowData, sectionID, rowID) {
    const {profile} =this.props;

    return (

      <View style={styles.rowContainer}>
        {profile[rowData.profile].avatar ?
          <Image style={styles.avatar} source={{uri: profile[rowData.profile].avatar}}/> :
          <Image style={styles.avatar} source={require("../utils/assets_mobile/default_avatar.png")}/>
        }
        <View style={styles.message}>
          <View style={styles.ownerInfo}>
            <Text style={styles.nickname}> {profile[rowData.profile].nickname}</Text>
            <Text style={styles.time}>{moment(rowData.created).format("MMMDo kk:mm")}</Text>
          </View>
          <Text style={styles.commentText}>{rowData.text}</Text>
        </View>
      </View>
    );
  }

  handleChangeComment(comment) {
    this.props.logComment(comment)
  }

  handleSubmit() {
    const {paintingId} = this.props;

    const {comment} = this.props.commentLog;
    this.props.addComments(paintingId, comment);
  }

  render() {
    const {component, comments}=this.props;
    var orderComments = component.loaded
      ? component.indexes.map((commentsId)=> comments[commentsId])
      : [];
    const source = dataSource.cloneWithRows(orderComments);
    return (
      <View style={styles.container}>
        <ListView style={styles.commentList}
                  dataSource={source}
                  renderRow={this.renderRow.bind(this)}
                  onEndReached={this.loadComments.bind(this)}
        />
        <View style={styles.comment}>
          <TextInput style={styles.commentInput} placeholder='发表评论' onChangeText={this.handleChangeComment.bind(this)}/>
          <Text style={styles.commentSend} onPress={this.handleSubmit.bind(this)}>发送</Text>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomColor: '#C7C7CD',
    borderBottomWidth: 0.5,
    borderStyle: 'solid',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    shadowColor: '#8F8E94',
    shadowOpacity: 0.2,
    marginBottom: 15,
  },
  message: {
    flex: 1,
  },
  ownerInfo: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  nickname: {
    flex: 1,
    fontSize: 14,
    color: '#8F8E94',
    marginLeft: 10,
    marginTop: 4,
  },
  time: {
    marginTop: 4,
    fontSize: 12,
    color: '#C7C7CD',
    marginRight: 10,
  },
  container: {
    flex: 1,
  },
  commentList: {},
  commentText: {
    marginLeft: 10,
    marginTop: 10,
    fontSize: 14,
    color: '#656565'
  },
  comment: {
    flexDirection: 'row',
    alignSelf: 'flex-end',
    borderTopColor: '#C7C7CD',
    borderTopWidth: 0.5,
    borderStyle: 'solid',
    justifyContent: 'space-between',

  },
  commentSend: {
    fontSize: 16,
    color: '#8F8E94',
    marginTop: 10,
    marginBottom: 10,
    flex: 1,
  },
  commentInput: {
    marginTop: 10,
    marginBottom: 10,
    flex: 5,
    height: 30,
    marginLeft: 7.5,
    marginRight: 7.5,
    borderRadius: 5,
    backgroundColor: 'rgba(3,3,3,0.09)',
  }
});

export default connect(
  (state) =>({
    comments: state.models.comments,
    component: state.containers.comments,
    commentLog: state.containers.commentLog,
    profile: state.models.profile,
  }),
  {
    loadComments,
    deleteComments,
    addComments,
    logComment
  }
)(Comment)
