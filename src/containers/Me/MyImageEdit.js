import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {load as loadMe} from '../../redux/modules/me';
import {update as updateMe, uploadAvatar, uploadBanner}from '../../redux/modules/containers/MeUpdate';
import {Link} from 'react-router';
import {reduxForm} from 'redux-form';
import Dropzone from 'react-dropzone';
import {createNotification, createNotificationSuccess} from '../../redux/modules/notification';

//import {loadSpec as loadMyPaintings} from '../../redux/models/Painting';

@connect(
  (state,ownProps) => ({
    me: state.me,
    component: state.containers.MeUpdate,
    path: ownProps.route.path
  }),
  dispatch => bindActionCreators({
    loadMe,
    uploadAvatar,
    uploadBanner,
    createNotification,
  }, dispatch)
)
@reduxForm({
  form: 'updateMyImage',
  fields: ['avatar', 'banner']
})


export default class updateMyImage extends Component {
  static propTypes = {
    me: PropTypes.object,
    loadMe: PropTypes.func,
    updateMe: PropTypes.func,
    uploadAvatar: PropTypes.func,
    uploadBanner: PropTypes.func,
    fields: PropTypes.object,
    createNotification: PropTypes.func,
    component: PropTypes.object,
    path: PropTypes.string,
  };


  uploadAvatar = (files) => {
    const data = new FormData();
    files.forEach((file) => {
      data.append('file', file);
    });
    this.props.uploadAvatar(data);
  };

  uploadBanner = (files) => {
    const data = new FormData();
    files.forEach((file) => {
      data.append('file', file);
    });
    this.props.uploadBanner(data);
  };


  render() {
    const {component, fields:{avatar, banner},me, path} = this.props;
    const isAvatar= path && path.indexOf('/editAvatar') > -1;

    return (
      <div>
        <form>
          {isAvatar ?
            <div>
              <label>头像</label><img src={me.avatar}/>
              <Dropzone ref="avatar" multiple={false} {...avatar} onDrop={ ( filesToUpload, e ) => {
                avatar.onChange(filesToUpload);
                this.uploadAvatar(filesToUpload);
              }
            }
              >
                {component.avatar_success ? this.props.createNotification({
                  message: <div>头像上传成功</div>,
                  level: 'success'
                }) : ''}
                {component.avatar_uploading ? <div>头像上传中…………</div> : <div>点击这里上传头像</div>}
              </Dropzone>
            </div>
            :
            <div>
              <label>封面</label><img src={me.banner}/>
              <Dropzone ref="banner" multiple={false} {...banner} onDrop={ ( filesToUpload, e ) => {
                banner.onChange(filesToUpload);
                this.uploadBanner(filesToUpload);
              }
            }
              >
                {component.banner_success ? this.props.createNotification({
                  message: <div>封面上传成功</div>,
                  level: 'success'
                }) : ''}
                {component.banner_uploading ? <div>封面上传中…………</div> : <div>点击这里上传封面</div>}
              </Dropzone>
            </div>
          }
        </form>
      </div>

    )
      ;
  }
}
