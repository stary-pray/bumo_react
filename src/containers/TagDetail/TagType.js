import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadTagTypeDetail} from '../../redux/modules/models/TagDetail';
import {Link} from 'react-router';
import {resize} from '../../utils/common';
import PaintingInfo from '../../components/PaintingInfo/PaintingInfo';
import _ from 'lodash';
import './TagDetail.scss';


@connect(
  (state, ownProps) => ({
    painting: state.models.painting,
    profile: state.models.profile,
    paintingHeat: state.models.paintingHeat,
    tagHeat: state.models.tagHeat,
    tagType: ownProps.params.tagType,
    tags: state.models.tags,
    component: state.containers.TagDetail,
    path: ownProps.route.path,

  }),
  dispatch => bindActionCreators({
    loadTagTypeDetail,
  }, dispatch)
)


export default class TagType extends Component {
  static propTypes = {
    tagType: PropTypes.string,
    profile: PropTypes.object,
    loadTagTypeDetail: PropTypes.func,
    tags: PropTypes.object,
    component: PropTypes.object,
    painting: PropTypes.object,
    paintingHeat: PropTypes.object,
    tagHeat: PropTypes.object,
  };


  componentWillMount() {
    this.props.loadTagTypeDetail(this.props.tagType, this.props.component.page);
  }

  render() {
    const {tagType, component, tags, painting, profile, paintingHeat, tagHeat} = this.props;
    const {tagLoaded, page}=this.props.component;
    return (<div className="TagType">
      { tagLoaded ?
        component.indexes.map((tagId)=> {
          const tag = tags[tagId];
          const heat = _.find(tagHeat, {id: tag.heat});
          const topPainting = _.find(painting, {id: tag.paintings[0]});
          return ( <div className="paintingCollection" key={'tagType' + tagId}>
              <span className="img" style={{backgroundImage: `url(${topPainting.attachment})`}} />
              <Link className="name" to={'/tag_name/' + tags[tagId].name}>
                <h2>{tags[tagId].name}</h2>
              </Link>
              <h4 className="type">{tagType}</h4>
              <h2 className="heat"><i className="zmdi zmdi-fire"/> {Math.round(heat.point)}</h2>
            </div>
          );
        }) : ''
      }
        </div>);
        }
      }
