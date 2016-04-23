import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {loadTagPaintingDetail} from "../../redux/modules/models/TagDetail";
import "../Home/Home.scss";
import PaintingInfo from "../../components/PaintingInfo/PaintingInfo";
import Masonry from "react-masonry-component";


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
    loadTagPaintingDetail
  }, dispatch)
)

export default class TagPainting extends Component {
  static propTypes = {
    tagType: PropTypes.string,
    tagName:PropTypes.string,
    profile: PropTypes.object,
    paintingHeat: PropTypes.object,
    loadTagPaintingDetail: PropTypes.func,
    component: PropTypes.object,
    page: PropTypes.number,
    subRoute: PropTypes.string,
    painting:PropTypes.object,
    tags:PropTypes.object
  };

  componentWillMount(){
    this.props.loadTagPaintingDetail(this.props.tagType,this.props.tagName,this.props.component.page)
  }

  render() {
    const {id, painting,component, paintingHeat,profile,tags} = this.props;
    const {tagLoaded, page}=this.props.component
    return (<div className="Home">

        {
          tagLoaded ?
            component.indexes.map((tagId)=>(
              <div key={'tags' + tagId}>
                <h2>{tags[tagId].type}_{tags[tagId].name}</h2>
                <Masonry
                  className={'BumoMasonry'}
                  elementType={'ul'}
                  options={{ columnWidth: 320, itemSelector: '.PaintingInfo', gutter: 15 }}
                  disableImagesLoaded={false}
                >
                {tags[tagId].paintings.map((paintingId)=>(
                  <PaintingInfo
                    key={'painting' + paintingId}
                    heat={paintingHeat[painting[paintingId].heat]}
                    owner={profile[painting[paintingId].profile]}
                    painting={painting[paintingId]}/>
                ))}
                </Masonry>
              </div>
            )) : ''
        }

    </div>);
  }
}
