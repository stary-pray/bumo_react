import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadTags} from 'redux/modules/models/Tags';
import {Link} from 'react-router';
import {resize} from 'utils/common';
import PaintingInfo from 'components/PaintingInfo/PaintingInfo';

@connect(
  (state) => ({
    tags: state.models.tags,
    paintings: state.models.painting,
    component: state.containers.Tags,
    tagHeat: state.models.tagHeat,
    paintingHeat: state.models.paintingHeat
  }),
  dispatch => bindActionCreators({
    loadTags
  }, dispatch)
)


export default class Tags extends Component {
  static propTypes = {
    loadTags: PropTypes.func,
    tags: PropTypes.object,
    paintings: PropTypes.object,
    component: PropTypes.object,
    tagHeat: PropTypes.object,
    paintingHeat: PropTypes.object
  };

  componentWillMount() {
    this.props.loadTags();
  }

  render() {
    const {tags, component, paintings, tagHeat, paintingHeat} = this.props;
    return (<div className="Tags">
      <h1>标签</h1>
      <div> {component.loaded ?
        <div>
          {component.indexes.map((tagsId) =>
            <div key={'tags'+tagsId}>
              <h2>{tags[tagsId].name}</h2>
              <h3>{tagHeat[tags[tagsId].heat].point}</h3>
              {tags[tagsId] ? tags[tagsId].paintings.map((id) => (
                <PaintingInfo key={'painting' + id} heat={paintingHeat[paintings[id].heat]}
                              painting={paintings[id]}/>)) : ''}
            </div>
          )}
        </div>
        : ''
      }
      </div>
    </div>);
  }
}
