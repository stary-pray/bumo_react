import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {load as loadPainting, loadHot as loadHotPainting} from 'redux/modules/models/Painting';
import {Link} from 'react-router';
import './Home.scss';
import {resize} from 'utils/common';
import PaintingList from '../../components/PaintingList/PaintingList';

@connect(
  (state, ownProps) => ({
    painting: state.models.painting,
    profile: state.models.profile,
    paintingHeat: state.models.paintingHeat,
    component: state.containers.Home,
    path: ownProps.route.path,
  }),
  dispatch => bindActionCreators({
    loadPainting,
    loadHotPainting
  }, dispatch)
)

export default class Home extends Component {
  static propTypes = {
    painting: PropTypes.object,
    profile: PropTypes.object,
    paintingHeat: PropTypes.object,
    component: PropTypes.object,
    paintingDetail: PropTypes.object,
    path: PropTypes.string,
    loadPainting: PropTypes.func,
    loadHotPainting: PropTypes.func
  };

  render() {
    const {painting, component, paintingHeat, profile, loadPainting, loadHotPainting, path} = this.props;
    const isLatest = path && path.indexOf('/latest') > -1;
    const load = isLatest ? loadPainting : loadHotPainting;
    
    return (<div className="Home">
      <h1>Home</h1>
      <p>Example for all paintings</p>

      <p>
        <Link to="/latest">最新作品</Link>
        <Link to="/"> 热门作品</Link>
      </p>

      <PaintingList
        painting={painting}
        component={component}
        paintingHeat={paintingHeat}
        profile={profile}
        loadPainting={load}
      />
    </div>);
  }
}
