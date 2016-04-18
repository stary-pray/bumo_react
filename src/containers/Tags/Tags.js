import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadTags, loadTagsType} from '../../redux/modules/models/Tags';
import {Link} from 'react-router';
import {resize} from '../../utils/common';
import PaintingInfo from '../../components/PaintingInfo/PaintingInfo';
import '../TagDetail/TagDetail.scss';
import _ from 'lodash';

@connect(
  (state) => ({
    tags: state.models.tags,
    painting: state.models.painting,
    component: state.containers.Tags,
    tagHeat: state.models.tagHeat,
    paintingHeat: state.models.paintingHeat,
    profile: state.models.profile
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
    profile: PropTypes.object
  };

  componentWillMount() {
    this.props.loadTags();
  }

  render() {
    const {tags, component, painting, tagHeat, paintingHeat, profile} = this.props;
    return (<div className="Tags">
      <h1>标签</h1>
      <h2>热门标签属性</h2>
      <Link to="/tag_type/角色"><h3>角色</h3></Link>
      <Link to="/tag_type/作品"><h3>作品</h3></Link>
      <div className="TagType"> {component.loaded ?
        <div>
          {component.indexes.map((tagId) => {
              const tag = tags[tagId];
              const heat = _.find(tagHeat, {id: tag.heat});
              const topPainting = _.find(painting, {id: tag.paintings[0]});
              return ( <div className="paintingCollection" key={'tagType' + tagId}>
                  <span className="img" style={{backgroundImage: `url(${topPainting.attachment})`}}/>
                  <Link className="name" to={'/tags/' + tags[tagId].type+'/'+tags[tagId].name}>
                    <h2>{tags[tagId].name}</h2>
                  </Link>
                  <h4 className="type">{tags[tagId].type}</h4>
                  <h2 className="heat"><i className="zmdi zmdi-fire"/> {heat? Math.round(heat.point):''}</h2>
                </div>
              );
            }
          )}
        </div>
        : ''
      }
      </div>
    </div>);
  }
}
