import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadUserPaintingHot, loadUserPainting} from '../../redux/modules/containers/UserPainting';
import {Link} from 'react-router';
import PaintingList from '../../components/PaintingList/PaintingList';
import '../Home/Home.scss';


@connect(
  (state, ownProps) => ({
    userPainting: state.models.painting,
    profile: state.models.profile,
    paintingHeat: state.models.paintingHeat,
    id: +ownProps.params.ownerId,
    component: state.containers.UserPainting,
    page: state.containers.UserPainting.page,
    subRoute: ownProps.params.sub
  }),
  dispatch => bindActionCreators({
    loadUserPainting,
    loadUserPaintingHot
  }, dispatch)
)

export default class UserPainting extends Component {
  static propTypes = {
    id: PropTypes.number,
    userPainting: PropTypes.object,
    profile: PropTypes.object,
    paintingHeat: PropTypes.object,
    loadUserPaintingHot: PropTypes.func,
    loadUserPainting: PropTypes.func,
    component: PropTypes.object,
    page: PropTypes.number,
    subRoute: PropTypes.string,
  };

  render() {
    const {id, userPainting, component, paintingHeat,profile, loadUserPaintingHot, loadUserPainting, subRoute} = this.props;
    const loadUserPaintingHotWithId = (pageIndex) => loadUserPaintingHot(id, pageIndex);
    const loadUserPaintingWithId = (pageIndex) => loadUserPainting(id, pageIndex);
    const loadPainting = subRoute === 'latest' ? loadUserPaintingWithId : loadUserPaintingHotWithId ;
    return (<div className="Home">
      <h1>H</h1>
      <Link to={`/p/${id}/latest`}><p>新作</p></Link> <Link to={`/p/${id}`}><p>热门</p></Link>
      <PaintingList
        painting={userPainting}
        component={component}
        paintingHeat={paintingHeat}
        profile={profile}
        loadPainting={loadPainting}
      />
    </div>);
  }
}
