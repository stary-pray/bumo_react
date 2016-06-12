import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {Link} from "react-router";
import {bindActionCreators} from "redux";
import {loadComments, deleteComments} from "../../redux/modules/models/Comments";
import Avatar from "../../components/Avatar/Avatar";
import "./CommentList.scss";
import {createNotification} from "../../redux/modules/notification";
import moment from "moment";

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
    deleteComments,
    createNotification
  }, dispatch)
)

export default class CommentList extends Component {
  static propTypes = {
    loadComments: PropTypes.func,
    deleteComments: PropTypes.func,
    me: PropTypes.object,
    paintingId: PropTypes.number,
    comments: PropTypes.object,
    component: PropTypes.object,
    profile: PropTypes.object,
    paintingDetail: PropTypes.object,
    createNotification:PropTypes.func
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

  componentWillReceiveProps(nextProps) {
    let commentError = '';
    if (!this.props.component.error && nextProps.component.error) {
      commentError = <span> 评论过于频繁,一分钟之后再评论 </span>;
      this.props.createNotification({
      message: <div className="error">{commentError}</div>,
      level: 'error',
      position:'tl',
    })}
  }

  loadComments() {
    const {paintingId}=this.props;
    const {pageMeta, loading} = this.props.component;
    if (loading || !pageMeta.next) return;
    this.props.loadComments(paintingId, pageMeta.next);
  }

  deleteComments(paintingId, index) {
    this.props.deleteComments(paintingId, index);
  }

  render() {
    const {me, comments, component, profile, paintingId, paintingDetail} =this.props;
    const {pageMeta, loading} = component;

    const isLastPage = !pageMeta.next;

    return (<div className="CommentList__container">
        {component.loaded ?
          component.indexes.map((commentId)=>
            <div className="CommentList__item" key={"comment"+commentId}>
              <div className="CommentList__avatar">
                <Avatar avatar={profile[comments[commentId].profile].avatar} width={20}/>
              </div>
              <div className="CommentList__content">
                <div className="CommentList__info">
                <Link className="CommentList__username"
                      to={`/u/${profile[comments[commentId].profile].user}`}>
                  {profile[comments[commentId].profile].nickname}
                </Link>
                  <p className="CommentList__created">{moment(comments[commentId].created).format("MMMDo kk:mm")}</p>
                  </div>
                <p className="CommentList__text typo">{comments[commentId].text}</p>
                <div className="CommentList__actions">
                  {(me.id == comments[commentId].owner || me.id == (paintingDetail[paintingId] && paintingDetail[paintingId].owner)) ?
                    <a onClick={this.deleteComments.bind(this,paintingId,commentId)}>删除</a>
                    : ''}
                </div>
              </div>
            </div>
          )
          : ''}
        <button
          className={"button hollow PaintingList__pageButton " + (loading || isLastPage ? 'disabled' : '' )}
          onClick={this.loadComments}>
          { loading ? '载入中...' : (isLastPage ? '没有更多评论' : '载入更多') }
        </button>
      </div>
    )
  }
}
