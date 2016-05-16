import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {load as loadPainting, loadHot as loadHotPainting} from "../../redux/modules/models/Painting";
import {Link} from "react-router";
import "./Home.scss";
import PaintingList from "../../components/PaintingList/PaintingList";
import * as PaintingModalActions from "../../redux/modules/containers/PaintingModal";
import {openTamashi} from "../../redux/modules/containers/TamashiPopup";
import {loginModalOpen} from "../../redux/modules/containers/MainHeader";
import {changePaintingListMode} from "../../redux/modules/preferences";
import {StickyContainer, Sticky} from "react-sticky";
import BumoDropdown from "../../components/BumoDropdown/BumoDropdown";
import {listModeDropdownChange} from "../../redux/modules/containers/Home";
import classNames from "classnames";


@connect(
  (state, ownProps) => ({
    painting: state.models.painting,
    profile: state.models.profile,
    paintingHeat: state.models.paintingHeat,
    component: state.containers.Home,
    path: ownProps.route.path,
    openedTamashiId: state.containers.TamashiPopup.id,
    waypoint: state.waypoint,
    me: state.me,
    preferences: state.preferences,
  }),
  dispatch => bindActionCreators({
    loadPainting,
    loadHotPainting,
    openModal: PaintingModalActions.openModal,
    openTamashi,
    loginModalOpen,
    changePaintingListMode,
    listModeDropdownChange,
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
    waypoint: PropTypes.object,
    openedTamashiId: PropTypes.number,
    me: PropTypes.object,
    preferences: PropTypes.object,
    
    loginModalOpen: PropTypes.func,
    loadPainting: PropTypes.func,
    loadHotPainting: PropTypes.func,
    openModal: PropTypes.func,
    openTamashi: PropTypes.func,
    changePaintingListMode: PropTypes.func,
    listModeDropdownChange: PropTypes.func,
  };

  constructor() {
    super();
    this.handleLoginModalOpen = this.handleLoginModalOpen.bind(this);
    this.handleListModeDropdown = this.handleListModeDropdown.bind(this);
    this.handleListModeDropdownClose = this.handleListModeDropdownClose.bind(this);
  }

  handleLoginModalOpen() {
    this.props.loginModalOpen();
  }

  handleListModeDropdown() {
    this.props.listModeDropdownChange(!this.props.component.isListModeDropdownOpened);
  }

  handleListModeDropdownClose() {
    this.props.listModeDropdownChange(false);
  }

  render() {
    const {painting, component, paintingHeat, profile, loadPainting, loadHotPainting, path, me, preferences, changePaintingListMode} = this.props;
    const isLatest = path && path.indexOf('/latest') > -1;
    const load = isLatest ? loadPainting : loadHotPainting;

    return (<div className="Home">
      <div className="pageHead">
        <h1>绘画之魂完全燃烧</h1>
      </div>

      <StickyContainer>
        <Sticky className="NavControls" stickyClassName={'NavControls__sticky'}>
          <div className="leftSide">
            <Link onlyActiveOnIndex={true} activeClassName="active" to={`/`}>
              <span>热门</span>
            </Link>
            <Link activeClassName="active" to={`/latest`}>
              <span>新作</span>
            </Link>
          </div>
          <div className="rightSide">
            <a onClick={ this.handleListModeDropdown}>
                { preferences.listMode === 'masonry' ?
                (<span><i className="zmdi zmdi-view-dashboard"/> 瀑布流 <i className="zmdi zmdi-caret-down"/></span>) :
                (<span><i className="zmdi zmdi-view-module"/> 列表 <i className="zmdi zmdi-caret-down"/></span>) }
            </a>
            <BumoDropdown positionClass="ListModeDropdown" isOpened={component.isListModeDropdownOpened} close={this.handleListModeDropdownClose}>
              <div className={classNames('BumoDropdownItem', {active: preferences.listMode === 'masonry'})}
                   onClick={()=>changePaintingListMode('masonry')}>
                <i className="zmdi zmdi-view-dashboard"/> 瀑布流 <i className="zmdi zmdi-check check"/>
              </div>
              <div className={classNames('BumoDropdownItem', {active: preferences.listMode === 'card'})}
                   onClick={()=>changePaintingListMode('card')}>
                <i className="zmdi zmdi-view-module"/> 列表 <i className="zmdi zmdi-check check"/>
              </div>
            </BumoDropdown>
          </div>
        </Sticky>
        <PaintingList
          key={path}
          painting={painting}
          component={component}
          paintingHeat={paintingHeat}
          profile={profile}
          loadPainting={load}
          openModal={this.props.openModal}
          openTamashi={this.props.openTamashi}
          waypoint={this.props.waypoint}
          openedTamashiId={this.props.openedTamashiId}
          isMe={me.id?true:false}
          loginModalOpen={this.handleLoginModalOpen}
          preferences={preferences}
          changePaintingListMode={changePaintingListMode}
        />
      </StickyContainer>
    </div>);
  }
}
