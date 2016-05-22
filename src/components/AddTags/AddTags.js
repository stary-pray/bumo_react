import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import lodash from "lodash";
import {addTag, deleteTag} from "../../redux/modules/tags";
import {searchTagHeat} from "../../redux/modules/searchTagHeat";
import "./AddTags.scss";
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
    searchTagHeat: PropTypes.func,
    tagsModel: PropTypes.object,
    tagHeat: PropTypes.object
  };

  componentDidMount() {
    this.type = "人物";
  }

  handleSubmit(e) {
    const name = e.target.value.trim();
    if (e.which === 13) {
      e.stopPropagation();
      e.preventDefault();
      this.props.addTag(name, this.type);
      this.props.searchTagHeat(this.type, name);
    }
  }

  addTag(e) {
    const name = this.refs.tag.value.trim();
    this.props.addTag(name, this.type);
    this.props.searchTagHeat(this.type, name);
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
    const {tags, showExtra, tagsModel, tagHeat} = this.props;
    return (
      <div className="AddTags">
        <label>标签 (最多五个)</label>
        {tags.length < 5 ?
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
              <input placeholder="请尽量使用中文 =A=" type="text" ref="tag"/>
            </div>
            <a className="button success" onClick={this.addTag.bind(this)}> 添加 </a>
          </div>
          : ''}
        <div>{showExtra ?
          <input ref="type" onChange={this.relogType.bind(this)}/>
          : ''}</div>

        <div>
          { lodash.map(tags, (tag, index) => {
            const tagFind = lodash.find(tagsModel, {
              name: tag.name,
              type: tag.type
            });
            return (<div className="AddTags__list" key={"tag-" + tag.name+' '+ tag.type}>
              <span className="AddTags__list_type">{tag.type} - </span>
              <span className="AddTags__list_name ellipses"> {tag.name}</span>
              <span className="AddTags__list_heat"> {tagFind ?
                <span className="point"> <i className="zmdi zmdi-fire"/> {calculateHeat(tagHeat[tagFind.heat])}</span> :
                <span className="new">新标签</span>}
              </span>
              <a className="button hollow success small AddTags__list_remove" onClick={this.deleteTag.bind(this,index)}>
                <i className="zmdi zmdi-close"/>
              </a>
            </div>);
          })}
        </div>
      </div>

    );
  }
}
