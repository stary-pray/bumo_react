import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {addComments, loadComments} from "../../redux/modules/models/Comments";
import {reduxForm} from "redux-form";
import Avatar from "../../components/Avatar/Avatar";
import "./CommentForm.scss";

@connect(
  (state) => ({
    me: state.me,
    component: state.containers.Comments,
  }),
  dispatch => bindActionCreators({
    addComments,
    loadComments
  }, dispatch)
)

@reduxForm({
  form: 'addComments',
  fields: ['comment']
})

export default class Comment extends Component {
  static propTypes = {
    loadComments: PropTypes.func,
    addComments: PropTypes.func,
    deleteComments: PropTypes.func,
    me: PropTypes.object,
    paintingId: PropTypes.number,
    component: PropTypes.object
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.component.addSuccess && nextProps.component.addSuccess) {
      this.props.resetForm()
    }
  }

  handleSubmit = (event) => {
    const {paintingId} =this.props;
    event.stopPropagation();
    if(this.refs.comment.value.trim()){
      this.props.addComments(paintingId, this.refs.comment.value.trim());
    }
  };



  render() {
    const {me, fields:{comment}} =this.props;

    return (<div className="CommentForm__container">
        <h3 className="CommentForm__title"> 评论 </h3>
        {me.id ? <form className="CommentForm__form">
          <div className="CommentForm__top">
            <div className="CommentForm__avatar">
              <Avatar avatar={me && me.avatar} nickname={me && me.nickname} width={40}/>
            </div>
            <textarea className="CommentForm__textarea" type="text" ref="comment" {...comment}/>
          </div>
          <a className="CommentForm__submit button small" onClick={this.handleSubmit}>提交</a>
        </form> : ''}
      </div>
    );
  }
}
