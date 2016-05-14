import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {load as loadMe} from '../../redux/modules/me';
import {update as updateMe}from '../../redux/modules/containers/MeUpdate';
import {Link} from 'react-router';
import {reduxForm} from 'redux-form';
import Dropzone from 'react-dropzone';
import {createNotification, createNotificationSuccess} from '../../redux/modules/notification';


//import {loadSpec as loadMyPaintings} from '../../redux/models/Painting';

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
          <div>
            <label>用户名</label>
            {me.username}
          </div>
          <div>
            <label>昵称*</label>{component.error ? (component.error.nickname ? <div>请输入昵称</div> : '') : ''}
            <input ref="nickname" {...nickname}/>
          </div>
          <div>
            <label>介绍</label>
            <input ref="introduction" {...introduction}/>
          </div>
          <div>
            <label>描述</label>
            <input ref="description" {...description}/>
          </div>
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
