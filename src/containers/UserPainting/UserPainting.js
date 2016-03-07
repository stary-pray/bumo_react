import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadUserPainting} from 'redux/modules/containers/UserPainting';
import {Link} from 'react-router';
import '../Home/Home.scss';
import PaintingInfo from 'components/PaintingInfo/PaintingInfo';
import Waypoint from 'react-waypoint';


@connect(
  (state, ownProps) => ({
    userPainting: state.models.painting,
    profile: state.models.profile,
    paintingHeat: state.models.paintingHeat,
    id: +ownProps.params.ownerId,
    component: state.containers.UserPainting,
    page: state.containers.UserPainting.page
  }),
  dispatch => bindActionCreators({
    loadUserPainting
  }, dispatch)
)

export default class UserPainting extends Component {
  static propTypes = {
    id: PropTypes.number,
    userPainting: PropTypes.object,
    profile: PropTypes.object,
    paintingHeat: PropTypes.object,
    loadUserPainting: PropTypes.func,
    component: PropTypes.object,
    page: PropTypes.number
  };



  loadMore() {
    const { page, loading } = this.props.component;
    if (loading) return;
    this.props.loadUserPainting(this.props.id, page);
    console.log('load more', page);
  }

  render() {
    const {userPainting, component, paintingHeat} = this.props;
    const { page, pageMeta } = this.props.component;

    console.log(this.props);
    return (<div className="Home">
      <h1>H</h1>
      <Link to={'/p/'+ this.props.id}><p>新作</p></Link> <Link to={'/p/hot/'+ this.props.id}><p>热门</p></Link>
      <div className="paintingInfo">
        {component.loaded ?
          component.indexes.map((paintingId)=>(
            <PaintingInfo key={'painting' + paintingId} heat={paintingHeat[userPainting[paintingId].heat]}
                          painting={userPainting[paintingId]}/>
          )) :
          ''}
      </div>
      <div>{component.loaded && pageMeta.next === null ?
        <div>已到最后一页</div> :
        <div>{component.loaded && (page - 1) % 2 == 0 ?
          <button onClick={this.loadMore.bind(this)}>加载更多</button> :
          <Waypoint className="waypoint" key={'waypoint' + page} style={{position: 'relative'}}
                    onEnter={this.loadMore.bind(this)}/>}
        </div>}
      </div>
    </div>);
  }
}
