import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {upload, toggleExtra} from '../../redux/modules/paintingUpload';
import {Link} from 'react-router';
import {reduxForm} from 'redux-form';
import Dropzone from 'react-dropzone';
import lodash from 'lodash';
import AddTags from '../../components/AddTags/AddTags';

//import {loadSpec as loadMyPaintings} from '../../redux/models/Painting';

@connect(
  (state) => ({
    paintingUpload: state.paintingUpload,
    tags: state.tags,
  }),
  dispatch => bindActionCreators({
    upload,
    toggleExtra,
  }, dispatch)
)

@reduxForm({
  form: 'uploadPainting',
  fields: ['title', 'description', 'file']
})


export default class uploadPaintingForm extends Component {
  static propTypes = {
    upload: PropTypes.func,
    toggleExtra: PropTypes.func,
    fields: PropTypes.object,
    tags: PropTypes.object,
    paintingUpload: PropTypes.object,
  };


  uploadPainting = (painting) => {
    const data = new FormData();
    painting.forEach((painting) => {
      data.append('file', painting);
    });
    this.data = data;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    lodash.forOwn({
      title: this.refs.title.value,
      description: this.refs.description.value,
      'private':false,
      quote_from: '',
      copyright: 2,
      tags:JSON.stringify(this.props.tags)
    }, (value, key)=>{
      this.data.append(key, value);
    });
    console.log('data',this.data);
    this.props.upload(this.data);
  };

  render() {
    const {fields:{title, description,file}, paintingUpload, toggleExtra} = this.props;
    return (
      <div>
        <form>
          <div>
            <label>上传图片</label>
            <Dropzone ref="file" multiple={false} {...file}
                      onDrop={ ( paintingToUpload, e ) => {
                            file.onChange(paintingToUpload);
                            this.uploadPainting(paintingToUpload);
             }}>
              <div>图片</div>
            </Dropzone>

          </div>
          <div>
            <label>标题*</label>
            <input ref="title"  autoFocus="true" {...title}/>
          </div>
          <div>
            <label>描述*</label>
            <input ref="description" {...description}/>
          </div>
          <AddTags showExtra={paintingUpload.showExtra} toggleExtra={toggleExtra}/>
          <a className="button" onClick={this.handleSubmit}>提交</a>
        </form>
      </div>

    )
      ;
  }
}


{/*<div>
 <label>头像</label><img src={me.avatar}/>
 <Dropzone ref="avatar" multiple={false} {...avatar} onDrop={ ( filesToUpload, e ) => {
 avatar.onChange(filesToUpload);
 this.uploadAvatar(filesToUpload);
 }
 }
 >
 <div>Try dropping some files here, or click to select files to upload.</div>
 </Dropzone>
 </div>*


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
 };*/
}
