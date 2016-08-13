import React, {Component, PropTypes} from "react";
import onClickOutside from "react-onclickoutside";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {load as loadMe, uploadAvatar, uploadBanner} from "../../redux/modules/me";
import {reduxForm} from "redux-form";
import Dropzone from "react-dropzone";
import {createNotification} from "../../redux/modules/notification";
import "./UserImageUpload.scss";

@connect(
  (state, ownProps) => ({
    me: state.me,
    component: state.containers.MeUpdate
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
@onClickOutside
export default class UserImageUpload extends Component {
  static propTypes = {
    me: PropTypes.object,
    type: PropTypes.string,
    loadMe: PropTypes.func,
    updateMe: PropTypes.func,
    uploadAvatar: PropTypes.func,
    uploadBanner: PropTypes.func,
    fields: PropTypes.object,
    createNotification: PropTypes.func,
    closeModal: PropTypes.func,
    component: PropTypes.object,
    isOpened: PropTypes.bool,
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

  handleCloseModal = () => {
    this.props.closeModal();
  };

  handleClickOutside = () => {
    if (this.props.isOpened) {
      this.handleCloseModal();
    }
  };

  componentWillReceiveProps(nextProps) {
    if (!this.props.component.avatar_success && nextProps.component.avatar_success) {
      this.props.createNotification({
        message: <div>头像上传成功</div>,
        level: 'success'
      });
    }
    if (!this.props.component.banner_success && nextProps.component.banner_success) {
      this.props.createNotification({
        message: <div>封面上传成功</div>,
        level: 'success'
      });
    }
  }

  renderUploadAvatar() {
    const {component, fields:{avatar}} = this.props;
    return (
      <div>
        <h3 className="UserImageUpload__title">上传这个头像</h3>
        <Dropzone
          className="Bumo-dropzone"
          activeClassName="Bumo-dropzone_active"
          ref="avatar"
          multiple={false}
          {...avatar}
          onDrop={ ( filesToUpload, e ) => {
                if (component.avatar_uploading) return;
                avatar.onChange(filesToUpload);
                this.uploadAvatar(filesToUpload);
              }
            }>
          <div className="Bumo-dropzone_intro">
            {component.avatar_uploading ?
              <span><i className="zmdi zmdi-refresh zmdi-hc-spin"/> 上传中..</span> :
              <span>请点击或把图片拖放到这里上传</span>
            }
          </div>
        </Dropzone>
      </div>
    );
  }

  renderUploadBanner() {
    const {component, fields:{banner}} = this.props;
    return (
      <div>
        <h3 className="UserImageUpload__title">上传那个封面</h3>
        <Dropzone
          className="Bumo-dropzone"
          activeClassName="Bumo-dropzone_active"
          ref="banner"
          multiple={false}
          {...banner}
          onDrop={ ( filesToUpload, e ) => {
                if (component.banner_uploading) return;
                banner.onChange(filesToUpload);
                this.uploadBanner(filesToUpload);
              }
            }>
          <div className="Bumo-dropzone_intro">
            {component.banner_uploading ?
              <span><i className="zmdi zmdi-refresh zmdi-hc-spin"/> 上传中..</span> :
              <span>请点击或把图片拖放到这里上传</span>
            }
          </div>
        </Dropzone>
      </div>
    );
  }


  render() {
    const isAvatar = this.props.type === 'avatar';
    return (
      <form className="UserImageUpload__container">
        <div onClick={this.handleCloseModal} className="modalCloseButton"/>
        {isAvatar ? this.renderUploadAvatar() : this.renderUploadBanner()}
      </form>
    );
  }
}
