import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadTags} from 'redux/modules/models/Tags';
import {Link} from 'react-router';

@connect(
  (state) => ({
    tags: state.models.tags,
    paintings: state.models.paintings,
    component: state.containers.Tags
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
    component: PropTypes.object
  };

  componentWillMount() {
    this.props.loadTags();
  }

  render() {
    const {tags, component, paintings} = this.props;
    return (<div className="Tags">
      <h1>标签</h1>
      <div> {component.loaded ?
        <div>
          {component.indexes.map((tagsId) =>
            <div key={'tags'+tagsId}>
              <h2>{tags[tagsId].name}</h2>
              {tags[tagsId].paintings.map((id) => (<div key={'paintings' + id}>{paintings[id].title}</div>))}
            </div>
          )}
        </div>
        : ''
      }
      </div>
    </div>);
  }
}
