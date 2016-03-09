import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadUserPaintingHot} from 'redux/modules/containers/UserPainting';
import {Link} from 'react-router';
import '../Home/Home.scss';
import PaintingInfo from 'components/PaintingInfo/PaintingInfo';
import Waypoint from 'react-waypoint';
import PaintingList from 'components/PaintingList/PaintingList';


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
    loadUserPaintingHot
  }, dispatch)
)

export default class UserPaintingHot extends Component {
  static propTypes = {
    id: PropTypes.number,
    userPainting: PropTypes.object,
    profile: PropTypes.object,
    paintingHeat: PropTypes.object,
    loadUserPaintingHot: PropTypes.func,
    component: PropTypes.object,
    page: PropTypes.number
  };



  loadMore() {
    const { page, loading } = this.props.component;
    if (loading) return;
    this.props.loadUserPaintingHot(this.props.id, page);
  }

  render() {
    const {userPainting, component, paintingHeat,profile} = this.props;
    const { page, pageMeta } = this.props.component;

    console.log(this.props);
    return (<div className="Home">
      <h1>H</h1>
      <Link to={'/p/'+ this.props.id}><p>新作</p></Link> <Link to={'/p/hot/'+ this.props.id}><p>热门</p></Link>
      <PaintingList
                    loadMore={this.loadMore.bind(this)}
                    component={component}
                    painting={userPainting}
                    profile={profile}
                    paintingHeat={paintingHeat}/>
    </div>);
  }
}
