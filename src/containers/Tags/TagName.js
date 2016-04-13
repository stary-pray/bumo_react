import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadTagNameDetail} from 'redux/modules/models/TagDetail';
import {Link} from 'react-router';
import {resize} from 'utils/common';
import PaintingInfo from 'components/PaintingInfo/PaintingInfo';



@connect(
  (state, ownProps) => ({
    painting: state.models.painting,
    profile: state.models.profile,
    paintingHeat: state.models.paintingHeat,
    tagName: ownProps.params.tagName,
    tags: state.models.tags,
    component: state.containers.TagDetail,
    path: ownProps.route.path,

  }),
  dispatch => bindActionCreators({
    loadTagNameDetail,
  }, dispatch)
)


export default class TagName extends Component {
  static propTypes = {
    tagName: PropTypes.string,
    profile: PropTypes.object,
    loadTagNameDetail: PropTypes.func,
    tags: PropTypes.object,
    component: PropTypes.object,
    painting: PropTypes.object,
    paintingHeat: PropTypes.object
  };


  componentWillMount() {
    this.props.loadTagNameDetail(this.props.tagName, this.props.component.page);
  }

  render() {
    const {tagName, component, tags, painting, profile, paintingHeat} = this.props;
    const {tagLoaded, page}=this.props.component
    return (<div>
        <h1>{tagName}</h1>
        <div>
          {
            tagLoaded ?
              component.indexes.map((tagId)=>(
                <div key={'tagName' + tagId}>
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
