import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {resize} from 'utils/common';
import {Link} from 'react-router';
import PaintingInfo from '../PaintingInfo/PaintingInfo';``
import Waypoint from 'react-waypoint';

export default class PaintingList extends Component {
  static propTypes = {
      param: PropTypes.string,
      painting: PropTypes.object,
      profile: PropTypes.object,
      paintingHeat: PropTypes.object,
      load: PropTypes.func,
      component: PropTypes.object,
      page: PropTypes.number
  };


  loadMore() {
    const { page, loading } = this.props.component;
    if (loading) return;
    this.props.load(this.props.param, page);
    console.log('load more', page);
  }

  render() {
    const {painting, component, paintingHeat} = this.props;
    const { page, pageMeta } = this.props.component;
    return (<div className="Home">
      <div className="paintingInfo">
        {component.loaded ?
          component.indexes.map((paintingId)=>(
            <PaintingInfo key={'painting' + paintingId} heat={paintingHeat[painting[paintingId].heat]}
                          painting={painting[paintingId]}/>
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

