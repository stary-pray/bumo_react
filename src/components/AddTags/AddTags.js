import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addTag, deleteTag} from '../../redux/modules/tags';
import './AddTags.scss';

@connect(
  (state) => ({
    tags: state.tags
  }),
  dispatch => bindActionCreators({
    addTag,
    deleteTag,
  }, dispatch)
)


export default class AddTags extends Component {
  static propTypes = {
    tags: PropTypes.object,
    addTag: PropTypes.func,
    deleteTag: PropTypes.func,
    showExtra: PropTypes.bool,
    toggleExtra: PropTypes.func,
  };

  componentDidMount() {
    this.type = "角色";
  }

  handleSubmit(e) {
    event.preventDefault();
    event.stopPropagation();
    const name = e.target.value.trim();
    if (e.which === 13) {
      this.props.addTag(name, this.type);
    }
  }

  addTag(e) {
    const name = this.refs.tag.value.trim();
    this.props.addTag(name, this.type);
  }

  logType(e) {
    const type = e.target.value.trim();
    if (type !== "自定义") {
      this.type = type;
      this.props.toggleExtra(false)
    } else {
      this.props.toggleExtra(true)
    }
  }

  relogType(e) {
    this.type = this.refs.type.value.trim();
  }

  render() {
    const {tags, showExtra} = this.props;
    return (
      <div className="AddTags">
        <label>标签种类</label>
        <div className="tag">
          <div>
            <select onChange={this.logType.bind(this)} id="type">
              <option value="角色">角色</option>
              <option value="作品">作品</option>
              <option value="活动">活动</option>
              <option value="性别">性别</option>
              <option value="属性">属性</option>
              <option value="自定义">自定义</option>
            </select>
          </div>

          <div onKeyDown={this.handleSubmit.bind(this)}>
            <input placeholder="名字" type="text" ref="tag"/>
          </div>

          <a className="button" onClick={this.addTag.bind(this)}> 加 </a>
        </div>

        <div>{showExtra ? <div>
          <input ref="type" onChange={this.relogType.bind(this)}/>
        </div> : ''}</div>

        <div>
          { tags.map(tag =>
            <div key={"tag-" + tag.id}>{tag.name}</div>) }
        </div>
      </div>

    );
  }
}
