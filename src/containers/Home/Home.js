import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {load as loadPainting, loadHot as loadHotPainting} from "../../redux/modules/models/Painting";
import {Link} from "react-router";
import "./Home.scss";
import PaintingList from "../../components/PaintingList/PaintingList";
import * as PaintingModalActions from "../../redux/modules/containers/PaintingModal";
import {openTamashi} from "../../redux/modules/containers/TamashiPopup";

@connect(
  (state, ownProps) => ({
    painting: state.models.painting,
    profile: state.models.profile,
    paintingHeat: state.models.paintingHeat,
    component: state.containers.Home,
    path: ownProps.route.path,
    openedTamashiId: state.containers.TamashiPopup.id,
  }),
  dispatch => bindActionCreators({
    loadPainting,
    loadHotPainting,
    openModal: PaintingModalActions.openModal,
    openTamashi: openTamashi,
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
    loadHotPainting: PropTypes.func,
    openModal: PropTypes.func,
    openTamashi: PropTypes.func,
    openedTamashiId: PropTypes.number,
  };

  render() {
    const {painting, component, paintingHeat, profile, loadPainting, loadHotPainting, path} = this.props;
    const isLatest = path && path.indexOf('/latest') > -1;
    const load = isLatest ? loadPainting : loadHotPainting;

    return (<div className="Home">
      <div className="pageHead">
        <h1>原创画作鉴赏</h1>
      </div>

      <div className="NavControls">
        <div className="leftSide">
          <Link activeClassName="active" to={`/`}>
            <span>热门</span>
          </Link>
          <Link activeClassName="active" to={`/latest`}>
            <span>新作</span>
          </Link>
        </div>
      </div>

      <PaintingList
        painting={painting}
        component={component}
        paintingHeat={paintingHeat}
        profile={profile}
        loadPainting={load}
        openModal={this.props.openModal}
        openTamashi={this.props.openTamashi}
        openedTamashiId={this.props.openedTamashiId}
      />
    </div>);
  }
}
