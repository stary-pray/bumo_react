import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {upload, toggleExtra, selectedImage, removeSelectedImage} from "../../redux/modules/PaintingUpload";
import {reduxForm} from "redux-form";
import Dropzone from "react-dropzone";
import lodash from "lodash";
import AddTags from "../../components/AddTags/AddTags";
import "./PaintingUpload.scss";

const validate = values => {
  const errors = {};
  if (!values.file) {
    errors.file = '请上传图片';
  }
  if (!values.title) {
    errors.title = '请输入标题';
  }
  return errors;
};

@connect(
  (state) => ({
    paintingUpload: state.paintingUpload,
    tags: state.tags,
  }),
  dispatch => bindActionCreators({
    upload,
    toggleExtra,
    selectedImage,
    removeSelectedImage,
  }, dispatch)
)

@reduxForm({
  form: 'uploadPainting',
  fields: ['title', 'description', 'file'],
  validate
})
export default class uploadPaintingForm extends Component {
  static propTypes = {
    upload: PropTypes.func,
    toggleExtra: PropTypes.func,
    selectedImage: PropTypes.func,
    removeSelectedImage: PropTypes.func,
    fields: PropTypes.object,
    tags: PropTypes.array,
    paintingUpload: PropTypes.object,
    invalid: PropTypes.bool
  };


  uploadPainting = (painting) => {
    const data = new FormData();
    painting.forEach((painting) => {
      data.append('file', painting);
    });
    this.data = data;
  };

  handleSubmit () {
    lodash.forOwn({
      title: this.refs.title.value,
      description: this.refs.description.value,
      'private': false,
      quote_from: '',
      copyright: 2,
      tags: JSON.stringify(this.props.tags)
    }, (value, key)=> {
      this.data.append(key, value);
    });
    this.props.upload(this.data);
  }

  handleOnDrop = (paintingToUpload) => {
    const {fields:{file}, selectedImage} = this.props;
    this.selectedPainting = paintingToUpload[0];
    selectedImage({preview: this.selectedPainting.preview});
    file.onChange(paintingToUpload);
    this.uploadPainting(paintingToUpload);
  };

  handleRemoveSelected = ()=> {
    this.selectedPainting = null;
    this.props.removeSelectedImage();
  };

  render() {
    const {fields:{title, description, file}, paintingUpload, toggleExtra, invalid} = this.props;
    const {loading} = this.props.paintingUpload;
    return (
      <form className="grid-container grid-block vertical PaintingUpload__container">
        <div className="PaintingUpload__title grid-content">
          <h1>发布画作</h1>
        </div>
        <div className="grid-block">
          <div className="grid-content PaintingUpload__left">
            <Dropzone
              className="Bumo-dropzone"
              activeClassName="Bumo-dropzone_active"
              ref="file"
              {...file}
              multiple={false}
              onDrop={this.handleOnDrop}>
              {!this.selectedPainting ?
                <div className="Bumo-dropzone_intro">请点击或把图片拖放到这里上传</div> :
                <div className="Bumo-dropzone_frame">
                  <span className="Bumo-dropzone_helper"/>
                  <img className="Bumo-dropzone_img" src={this.selectedPainting.preview} alt="预览"/>
                </div>
              }
            </Dropzone>
            {file.touched && file.error && <div className="error">{file.error}</div>}
          </div>
          <div className="grid-content PaintingUpload__right">
            <label>
              <div>标题</div>
              <input type="text" ref="title" autoFocus="true" {...title}/>
            </label>
            {title.touched && title.error && <div className="error">{title.error}</div>}
            <label>
              <div>描述</div>
              <textarea ref="description" {...description} cols="30" rows="3"/>
            </label>
            <AddTags showExtra={paintingUpload.showExtra} toggleExtra={toggleExtra}/>
            <a
              onClick={()=> this.handleSubmit()}
              type="button"
              className={"button " + ((loading || invalid) ? 'disabled' : '')}
              disabled={invalid || loading}>
              { !loading ? '提交审核' : '上传中...'}
            </a>
          </div>
        </div>
      </form>
    )
      ;
  }
}

