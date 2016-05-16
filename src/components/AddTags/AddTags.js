import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import lodash from 'lodash';
import {addTag, deleteTag} from '../../redux/modules/tags';
import {searchTagHeat} from '../../redux/modules/searchTagHeat'
import './AddTags.scss';
import {calculateHeat} from "../../utils/common";


@connect(
  (state) => ({
    tags: state.tags,
    tagsModel: state.models.tags,
    tagHeat: state.models.tagHeat
  }),
  dispatch => bindActionCreators({
    addTag,
    deleteTag,
    searchTagHeat
  }, dispatch)
)


export default class AddTags extends Component {
  static propTypes = {
    tags: PropTypes.array,
    addTag: PropTypes.func,
    deleteTag: PropTypes.func,
    showExtra: PropTypes.bool,
    toggleExtra: PropTypes.func,
    searchTagHeat:PropTypes.func,
    tagsModel:PropTypes.object,
    tagHeat:PropTypes.object
  };

  componentDidMount() {
    this.type = "人物";
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
    this.props.searchTagHeat(this.type,name);
  }
  deleteTag(index) {
    this.props.deleteTag(index);
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
    const {tags, showExtra,tagsModel,tagHeat} = this.props;
    return (
      <div className="AddTags">
        <label>标签种类(最多只能有五个)</label>
        <div className="tag">
          <div>
            <select onChange={this.logType.bind(this)} id="type">
              <option value="人物">人物</option>
              <option value="作品">作品</option>
              <option value="活动">活动</option>
              <option value="性别">性别</option>
              <option value="属性">属性</option>
            </select>
          </div>

          <div onKeyDown={this.handleSubmit.bind(this)}>
            <input placeholder="名字" type="text" ref="tag"/>
          </div>
          {tags.length<5?
          <a className="button" onClick={this.addTag.bind(this)} > 加 </a>:''}
        </div>

        <div>{showExtra ? <div>
          <input ref="type" onChange={this.relogType.bind(this)}/>
        </div> : ''}</div>

        <div>
          { lodash.map(tags, (tag, index) =>{
            const tagFind =lodash.find(tagsModel, {
              name: tag.name,
              type: tag.type
            });
            return(<div key={"tag-" + tag.name+' '+ tag.type}>
            <div >{tag.name}_{tag.type}</div>
              <div>{tagFind?calculateHeat(tagHeat[tagFind.heat]):0}</div>
            <a className="button" onClick={this.deleteTag.bind(this,index)}> 删 </a>

          </div>)} )}
        </div>
      </div>

    );
  }
}
