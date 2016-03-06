import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addTag, deleteTag} from 'redux/modules/tags';

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
    deleteTag: PropTypes.func
  };
  componentDidMount(){
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

  logType(e) {
    const type = e.target.value.trim();
    this.type = type;
  }


  render() {
    const {tags} = this.props;
    return (
      <div>
        <div>
          <div onKeyDown={::this.handleSubmit}>
            <label>加个标签</label>
            <input
              type="text"
              ref="tag"
            />
          </div>
          <label>标签种类</label>
          <select onChange={::this.logType}>
            <option value="角色">角色</option>
            <option value="作品">作品</option>
            <option value="活动">活动</option>
            <option value="性别">性别</option>
            <option value="属性">属性</option>
          </select>
        </div>

        <div>
          { tags.map(tag =>
            <div key={"tag-" + tag.name}>{tag.name}</div>) }
        </div>
      </div>
    );
  }
}
