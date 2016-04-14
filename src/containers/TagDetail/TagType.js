import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadTagTypeDetail} from 'redux/modules/models/TagDetail';
import {Link} from 'react-router';
import {resize} from 'utils/common';
import PaintingInfo from 'components/PaintingInfo/PaintingInfo';



@connect(
  (state, ownProps) => ({
    painting: state.models.painting,
    profile: state.models.profile,
    paintingHeat: state.models.paintingHeat,
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
    paintingHeat: PropTypes.object
  };


  componentWillMount() {
    this.props.loadTagTypeDetail(this.props.tagType, this.props.component.page);
  }

  render() {
    const {tagType, component, tags, painting, profile, paintingHeat} = this.props;
    const {tagLoaded, page}=this.props.component
    return (<div>
        <h1>{tagType}</h1>
        <div>
          {
            tagLoaded ?
              component.indexes.map((tagId)=>(
                <div key={'tagType' + tagId}>
                  <Link to={'tag_name/'+ tags[tagId].name}><h2>{tags[tagId].name}</h2></Link>
                  {tags[tagId].paintings.map((paintingId)=>(
                    <PaintingInfo
                      key={'painting' + paintingId}
                      heat={paintingHeat[painting[paintingId].heat]}
                      owner={profile[painting[paintingId].profile]}
                      painting={painting[paintingId]}/>
                  ))}
                </div>
              )) : ''
          }
        </div>
      </div>
    )
  }
}
