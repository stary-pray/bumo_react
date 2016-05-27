import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {addComments, loadComments} from "../../redux/modules/models/Comments";
import {reduxForm} from "redux-form";
import Avatar from "../../components/Avatar/Avatar";

@connect(
  (state) => ({
    me: state.me,
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
    deleteComments:PropTypes.func,
    me:PropTypes.object,
    paintingId: PropTypes.number,
  };


  handleSubmit = (event) => {
    const{paintingId} =this.props;
    event.stopPropagation();
    this.props.addComments(paintingId, this.refs.comment.value.trim());
    this.props.resetForm();
  };

  render() {
    const{me, fields:{comment}} =this.props;

    return (<div>
    {me.id?<form>
      <Avatar
        avatar={me && me.avatar}
        nickname={me && me.nickname}
        width={40}
      />
      <textarea type="test" ref="comment" {...comment}/>
      <a onClick={this.handleSubmit}>提交</a>
    </form>:''}
    </div>
    )
  }
}
