import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {loadComments, deleteComments} from "../../redux/modules/models/Comments";
import Avatar from "../../components/Avatar/Avatar";

@connect(
  (state) => ({
    me: state.me,
    comments: state.models.comments,
    component: state.containers.Comments,
    profile: state.models.profile,
    paintingDetail: state.models.paintingDetail
  }),
  dispatch => bindActionCreators({
    loadComments,
    deleteComments
  }, dispatch)
)

export default class CommentList extends Component {
  static propTypes = {
    loadComments: PropTypes.func,
    deleteComments:PropTypes.func,
    me:PropTypes.object,
    paintingId: PropTypes.number,
    comments:PropTypes.object,
    component: PropTypes.object,
    profile: PropTypes.object,
    paintingDetail: PropTypes.object
  };

  constructor() {
    super();
    this.loadComments = this.loadComments.bind(this);
  }

  componentDidMount() {
    this.loadComments();
  }

  componentDidUpdate() {
    if (!this.props.component.loading && !this.props.component.loaded) {
      this.loadComments();
    }
  }

  loadComments(){
    const{paintingId}=this.props;
    const {pageMeta, loading} = this.props.component;
    if (loading || !pageMeta.next) return;
    this.props.loadComments(paintingId, pageMeta.next);
  }

  deleteComments(paintingId,index) {
    this.props.deleteComments(paintingId,index);
  }

  render() {
    const{me,comments,component,profile,paintingId, paintingDetail} =this.props;
    const {pageMeta, loading} = component;

    const isLastPage = !pageMeta.next;

    return (<div>
        <label>评论</label>
        {component.loaded ?
          component.indexes.map((commentId)=>
            <div key={"comment"+commentId}>
           <span>{profile[comments[commentId].profile].nickname}</span>
           <Avatar avatar={profile[comments[commentId].profile].avatar} width={20}/>
            <span>{comments[commentId].text}</span>
            {(me.id==comments[commentId].owner || me.id==(paintingDetail[paintingId]&&paintingDetail[paintingId].owner))?
              <a onClick={this.deleteComments.bind(this,paintingId,commentId)}>删除</a>
              :''}
            </div>
          )
          : ''}
        <button
          onClick={this.loadComments}>
          { loading ? '载入中...' : (isLastPage ? '没有更多评论' : '载入更多') }
        </button>
      </div>
    )
  }
}
