import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {load as loadMe} from '../../redux/modules/me';
import {update as updateMe, uploadAvatar}from '../../redux/modules/containers/MeUpdate';
import {Link} from 'react-router';
import {reduxForm} from 'redux-form';
import Dropzone from 'react-dropzone';
import {createNotification, createNotificationSuccess} from '../../redux/modules/notification';


//import {loadSpec as loadMyPaintings} from '../../redux/models/Painting';

@connect(
  (state) => ({
    me: state.me,
    component:state.containers.MeUpdate
  }),
  dispatch => bindActionCreators({
    loadMe,//loadMyPaintings
    updateMe,
    uploadAvatar,
    createNotification
  }, dispatch)
)
@reduxForm({
  form: 'updateMe',
  fields: ['nickname', 'introduction', 'description', 'avatar']
})


export default class updateMeForm extends Component {
  static propTypes = {
    me: PropTypes.object,
    loadMe: PropTypes.func,
    updateMe: PropTypes.func,
    uploadAvatar: PropTypes.func,
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
      avatar: this.refs.avatar.value
    });
  };

  uploadAvatar = (files) => {
    const data = new FormData();
    files.forEach((file) => {
      data.append('file', file);
    });
    this.props.uploadAvatar(data);
  };


  render() {
    const {component, fields:{nickname, introduction, description, avatar},me} = this.props;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>用户名</label>
            {me.username}
          </div>
          <div>
            <label>邮箱</label>
            {me.email}
          </div>
          <div>
            <label>昵称*</label>{component.error ? (component.error.nickname?<div>请输入昵称</div>:''):''}
            <input value={me.nickname} ref="nickname" {...nickname}/>
          </div>
          <div>
            <label>介绍</label>
            <input value={me.introduction} ref="introduction" {...introduction}/>
          </div>
          <div>
            <label>描述</label>
            <input value={me.description} ref="description" {...description}/>
          </div>
          <div>
            <label>头像</label><img src={me.avatar}/>
            <Dropzone ref="avatar" multiple = {false} {...avatar} onDrop={ ( filesToUpload, e ) => {
                avatar.onChange(filesToUpload);
                this.uploadAvatar(filesToUpload);
              }
            }
            >
              {component.avatar_success ? this.props.createNotification({
                message: <div>头像上传成功</div>,
                level: 'success'
              }) : ''}
              {component.avatar_uploading ? <div>头像上传中…………</div>:<div>点击这里上传头像</div>}
            </Dropzone>
          </div>
          <button onClick={this.handleSubmit}>提交</button>
        </form>
      </div>

    )
      ;
  }
}
