import {View, ListView, StyleSheet, Text, TextInput} from "react-native";
import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {loadComments, deleteComments, addComments} from "../redux/modules/models/Comments";
import {logComment} from "../redux/modules/containers_mobile/commentLog";
const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class Comment extends Component {

  static propTypes = {
    paintingId: PropTypes.number,
  };

  componentWillMount() {
    this.loadComments();
  }

  loadComments(){
    const {paintingId, component} = this.props;
    const {pageMeta, loading} = component;
    console.log('pageMeta', pageMeta);
    if(loading || !pageMeta.next) return;
    this.props.loadComments(paintingId, pageMeta.next);

  }

  renderRow(rowData, sectionID, rowID) {
    return (

        <View style={styles.rowContainer}>
          <Text style={styles.commentText}>{rowData.text}</Text>
        </View>
    );
  }

  handleChangeComment(comment){
    this.props.logComment(comment)
  }

  handleSubmit(){
    const {paintingId} = this.props;

    const {comment} = this.props.commentLog;
    this.props.addComments(paintingId,comment);
  }

  render() {
    const {component, comments}=this.props;
    var orderComments= component.loaded
      ? component.indexes.map((commentsId)=> comments[commentsId])
      : [];
    const source = dataSource.cloneWithRows(orderComments);
    return (
      <View style={styles.container}>
      <ListView dataSource={source}
                renderRow={this.renderRow.bind(this)}
                onEndReached={this.loadComments.bind(this)}
      />
        <View style={styles.comment}>
      <TextInput style={styles.commentInput} placeholder='评论' onChangeText={this.handleChangeComment.bind(this)}/>
          <Text style={styles.commentSend} onPress={this.handleSubmit.bind(this)}>评论</Text>
          </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container:{
    flex:1,

  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
  commentText: {
    fontSize: 20,
    color: '#656565'
  },
  comment:{
    flex:1,
    flexDirection: 'row'

  },
  commentSend:{
    padding: 4,
    margin: 15,
    fontSize: 18,
  },
  commentInput:{
    height: 36,
    width:280,
    padding: 4,
    margin: 15,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48BBEC',
    borderRadius: 8,
    color: '#48BBEC'
  }
});

export default connect(
  (state) =>({
    comments: state.models.comments,
    component: state.containers.comments,
    commentLog: state.containers.commentLog

  }),
  {
    loadComments,
    deleteComments,
    addComments,
    logComment
  }
)(Comment)
