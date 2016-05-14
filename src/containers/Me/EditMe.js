import React, {Component, PropTypes} from "react";
import {bindActionCreators} from "redux";
import {load as loadMe} from "../../redux/modules/me";
import {update as updateMe} from "../../redux/modules/containers/MeUpdate";
import {Link} from "react-router";
import {reduxForm} from "redux-form";
import {createNotification} from "../../redux/modules/notification";

@reduxForm({
    form: 'updateMe',
    fields: ['nickname', 'introduction', 'description'],
  },
  (state) => ({
    me: state.me,
    component: state.containers.MeUpdate,
    initialValues: {
      nickname: state.me.nickname,
      introduction: state.me.introduction?state.me.introduction:'',
      description: state.me.description?state.me.description:''
    }
  }),
  dispatch => bindActionCreators({
    loadMe,
    updateMe,
    createNotification
  }, dispatch)
)


export default class updateMeForm extends Component {
  static propTypes = {
    me: PropTypes.object,
    loadMe: PropTypes.func,
    fields: PropTypes.object,
    createNotification: PropTypes.func,
    component: PropTypes.object
  };

  compomemtWillMount() {
    this.props.loadMe();
  }


  handleSubmit = (event) => {
    event.preventDefault();
    this.props.updateMe({
      nickname: this.refs.nickname.value,
      introduction: this.refs.introduction.value,
      description: this.refs.description.value,
    });
  };


  render() {
    const {component, fields:{nickname,introduction, description},me} = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <div>用户名</div>
            <input type="text" value={me.username} readonly/>
          </label>
          <label>
            <div>昵称*</div>
            {component.error ? (component.error.nickname ? <div>昵称不能为空</div> : '') : ''}
            <input type="text" ref="nickname" {...nickname}/>
          </label>
          <label>
            <div>介绍</div>
            <input type="text" ref="introduction" {...introduction}/>
          </label>
          <label>
            <div>描述</div>
            <input type="text" ref="description" {...description}/>
          </label>
          <button onClick={this.handleSubmit}>提交</button>
        </form>
        <div>
          <div>你有{(me.balance ? me.balance.charged_qb : '')}个祈可以送给你爱的画家</div>
          <div>你有{(me.balance ? me.balance.free_qb : '')}个星可以送给你爱的画家</div>
          <div>你一共赚了{(me.balance ? me.balance.earned_qb : '')}钱</div>
          <Link to="me/createCharge">
            <div className="button">充值</div>
          </Link>
          <Link to="me/depositList">
            <div className="button">我的订单</div>
          </Link>
        </div>
      </div>

    )
      ;
  }
}
