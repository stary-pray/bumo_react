import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadTags, loadTagsType} from 'redux/modules/models/Tags';
import {Link} from 'react-router';
import {resize} from 'utils/common';
import PaintingInfo from 'components/PaintingInfo/PaintingInfo';

@connect(
  (state) => ({
    tags: state.models.tags,
    painting: state.models.painting,
    component: state.containers.Tags,
    tagHeat: state.models.tagHeat,
    paintingHeat: state.models.paintingHeat,
    profile:state.models.profile
  }),
  dispatch => bindActionCreators({
    loadTags,
  }, dispatch)
)


export default class Tags extends Component {
  static propTypes = {
    loadTags: PropTypes.func,
    tags: PropTypes.object,
    painting: PropTypes.object,
    component: PropTypes.object,
    tagHeat: PropTypes.object,
    paintingHeat: PropTypes.object,
    profile:PropTypes.object
  };

  componentWillMount() {
    this.props.loadTags();
  }

  render() {
    const {tags, component, painting, tagHeat, paintingHeat, profile} = this.props;
    return (<div className="Tags">
      <h1>标签</h1>
      <h2>热门标签属性</h2>
      <Link to="/tags/type/角色"><h3>角色</h3></Link>
      <Link to="/tags/type/作品"><h3>作品</h3></Link>
      <div> {component.loaded ?
        <div>
          {component.indexes.map((tagsId) =>
            <div key={'tags'+tagsId}>
              <Link to={"/tags/"+ tags[tagsId].name}><h2>{tags[tagsId].type}_{tags[tagsId].name}</h2></Link>
              {tags[tagsId].paintings ? tags[tagsId].paintings.map((id) => (
                <PaintingInfo
                key={'painting' + id}
                heat={paintingHeat[painting[id].heat]}
                owner={profile[painting[id].profile]}
                painting={painting[id]}/>)) : ''}
            </div>
          )}
        </div>
        : ''
      }
      </div>
    </div>);
  }
}
