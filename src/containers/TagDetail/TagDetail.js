import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadTagPaintingDetailHot} from 'redux/modules/models/TagDetail';
import {Link} from 'react-router';
import PaintingList from 'components/PaintingList/PaintingList';
import '../Home/Home.scss';
import PaintingInfo from 'components/PaintingInfo/PaintingInfo';


@connect(
  (state, ownProps) => ({
    painting: state.models.painting,
    profile: state.models.profile,
    paintingHeat: state.models.paintingHeat,
    tagType: ownProps.params.tagType,
    tagName: ownProps.params.tagName,
    component: state.containers.TagDetail,
    page: state.containers.TagDetail.page,
    tags:state.models.tags
  }),
  dispatch => bindActionCreators({
    loadTagPaintingDetailHot
  }, dispatch)
)

export default class TagPainting extends Component {
  static propTypes = {
    tagType: PropTypes.string,
    tagName:PropTypes.string,
    profile: PropTypes.object,
    paintingHeat: PropTypes.object,
    loadTagPaintingDetailHot: PropTypes.func,
    component: PropTypes.object,
    page: PropTypes.number,
    subRoute: PropTypes.string,
    painting:PropTypes.object,
    tags:PropTypes.object
  };

  componentWillMount(){
    this.props.loadTagPaintingDetailHot(this.props.tagType,this.props.tagName,this.props.component.page)
  }

  render() {
    const {id, painting,component, paintingHeat,profile,tags} = this.props;
    const {tagLoaded, page}=this.props.component
    return (<div className="Home">
      <h1>H</h1>
      <div>
        {
          tagLoaded ?
            component.indexes.map((tagId)=>(
              <div key={'tags' + tagId}>
                <h2>{tags[tagId].name}</h2>
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
    </div>);
  }
}
