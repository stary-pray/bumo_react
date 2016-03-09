import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadTagDetail, loadTagPaintingDetailHot} from 'redux/modules/models/TagDetail';
import {Link} from 'react-router';
import PaintingInfo from 'components/PaintingInfo/PaintingInfo';
import Waypoint from 'react-waypoint';
import '../Home/Home.scss';


@connect(
  (state, ownProps) => ({
    painting: state.models.painting,
    profile: state.models.profile,
    paintingHeat: state.models.paintingHeat,
    tagDetail: state.models.tagDetail,
    name: ownProps.params.tagName,
    component: state.containers.TagDetail
  }),
  dispatch => bindActionCreators({
    loadTagDetail,
    loadTagPaintingDetailHot
  }, dispatch)
)


export default class TagDetail extends Component {
  static propTypes = {
    name: PropTypes.string,
    tagDetail: PropTypes.object,
    loadTagDetail: PropTypes.func,
    loadTagPaintingDetailHot: PropTypes.func,
    component: PropTypes.object,
    painting: PropTypes.object,
    profile: PropTypes.object,
    paintingHeat: PropTypes.object,
  };


  componentWillMount() {
    this.props.loadTagDetail(this.props.name);
    console.log(this.props);
  }


  loadMore() {
    const { page, paintingLoading } = this.props.component;
    if(paintingLoading) return;
    this.props.loadTagPaintingDetailHot(this.props.tagDetail[this.props.component.tagId].name,this.props.component.page);
    console.log('load more', page);
  }

  render() {
    const {tagLoaded, tagId, paintingLoaded, page, pageMeta} = this.props.component;
    const {tagDetail, painting,paintingHeat, component} = this.props;
    return ( <div className="Home">
      {tagLoaded ?
        <div>
          <h1>{tagDetail[tagId].name}</h1>
          <p><Link to={"/tags/"+ tagDetail[tagId].name}>最新作品   </Link><Link to={"/tags/hot/"+ tagDetail[tagId].name}>   热门作品</Link></p>
          <div className="paintingInfo">
            {component.paintingLoaded ?
              component.indexes.map((paintingId)=>(
                <PaintingInfo key={'painting' + paintingId} heat={paintingHeat[painting[paintingId].heat]} painting={painting[paintingId]}/>))
              :
              ''}
          </div>

          <div>{paintingLoaded && pageMeta.next === null ?
            <div>已到最后一页</div> :
            <div>{paintingLoaded && (page-1) % 2 == 0 ?
              <button onClick={this.loadMore.bind(this)}>加载更多</button> :
              <Waypoint className="waypoint" key={'waypoint' + page} style={{position: 'relative'}}
                        onEnter={this.loadMore.bind(this)}/>}
            </div>}
          </div>
        </div> : ''}
    </div>);
  }
}
