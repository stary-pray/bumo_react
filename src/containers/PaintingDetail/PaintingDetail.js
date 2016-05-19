import React, {Component, PropTypes} from "react";
import Helmet from "react-helmet";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import InlineSVG from "svg-inline-react";
import {load as loadPaintingDetail} from "../../redux/modules/models/PaintingDetail";
import {Link} from "react-router";
import moment from "moment";
import {createNotification} from "../../redux/modules/notification";
import {resize, resizeHeight, calculateHeat} from "../../utils/common";
import "./PaintingDetail.scss";
import TahashiPopup from "../../containers/TamashiPopup/TamashiPopup";
import Avatar from "../../components/Avatar/Avatar";
import {openTamashi} from "../../redux/modules/containers/TamashiPopup";
import {loginModalOpen} from "../../redux/modules/containers/MainHeader";
import classNames from "classnames";
import Scroll from "react-scroll";


@connect(
  (state, ownProps) => ({
    paintingDetail: state.models.paintingDetail,
    profile: state.models.profile,
    paintingHeat: state.models.paintingHeat,
    tagHeat: state.models.tagHeat,
    tags: state.models.tags,
    component: state.containers.PaintingDetail,
    id: ownProps.id || +ownProps.params.paintingId,
    me: state.me,
    contributedUsers: state.models.contributedUsers,
    profileHeat:state.models.profileHeat
  }),
  dispatch => bindActionCreators({
    loadPaintingDetail,
    createNotification,
    openTamashi: openTamashi,
    loginModalOpen
  }, dispatch)
)


export default class PaintingDetail extends Component {
  static propTypes = {
    id: PropTypes.number,
    paintingDetail: PropTypes.object,
    profile: PropTypes.object,
    paintingHeat: PropTypes.object,
    component: PropTypes.object,
    loadPaintingDetail: PropTypes.func,
    tags: PropTypes.object,
    tagHeat: PropTypes.object,
    isInModal: PropTypes.bool,
    openTamashi: PropTypes.func.isRequired,
    me: PropTypes.object,
    loginModalOpen: PropTypes.func,
    contributedUsers: PropTypes.object,
    profileHeat: PropTypes.object
  };

  constructor() {
    super();
    this.openTamashi = this.openTamashi.bind(this);
    this.handleLoginModalOpen = this.handleLoginModalOpen.bind(this);
  }


  componentWillMount() {
    this.props.loadPaintingDetail(this.props.id);
  }

  componentDidMount() {
    this.leftPanelScale = this.refs.leftPanel.offsetWidth / this.refs.leftPanel.offsetHeight;
    if(!this.props.isInModal){
      Scroll.animateScroll.scrollToTop({smooth: false, duration: 0,});
    }
  }

  componentWillReceiveProps(nextProps) {
    this.leftPanelScale = this.refs.leftPanel.offsetWidth / this.refs.leftPanel.offsetHeight;

    if (this.props.id !== nextProps.id) {
      this.props.loadPaintingDetail(nextProps.id);
    }
  }

  openTamashi() {
    this.props.openTamashi(this.props.id);
  }

  handleLoginModalOpen() {
    this.props.loginModalOpen();
  }

  render() {
    const {paintingDetail, id, paintingHeat, profile, tags, tagHeat, isInModal, me, contributedUsers,profileHeat} = this.props;
    const {loaded} = this.props.component;
    const painting = paintingDetail[id];
    const ownerId = painting ? painting.owner : -1;
    const profileId = painting ? painting.profile : -1;
    const ownerProfile = profile[profileId];
    const profileHeatId = ownerProfile && ownerProfile.heat;
    const ownerProfileHeat =profileHeatId && profileHeat[profileHeatId];
    const tagsArray = painting ? painting.tags : [];
    const contributedUsersIDs = painting ? painting.contributed_users : [];
    const previousLink = painting && painting.user_previous_painting ? `/painting/${painting.user_previous_painting}` : '';
    const nextLink = painting && painting.user_next_painting ? `/painting/${painting.user_next_painting}` : '';

    return (
      <div className={"PaintingDetail " + (isInModal ? 'inModal' : '')}>
        <Helmet
          title={`${painting ? painting.title : ''} - 恋绘.星祈`}
          meta={[{description: painting ? painting.description : ''}]}
        />
        <div className="PaintingDetail__top">
          <div ref="leftPanel" className="leftPanel">
            <div
              className={classNames("PaintingDetail__image-wrapper",
                      {'PaintingDetail__image-wrapper_landscape':
                      painting && (painting.width / painting.height > this.leftPanelScale) })}
            >
              {painting ?
                <img
                  className="PaintingDetail__image-full"
                  src={painting && resizeHeight(painting.attachment, 800)} alt="detail"/> : ''
              }
            </div>
            <Link to={previousLink} className={'go_previous ' + (previousLink ? '' : 'disabled')}
                  disabled={!previousLink}>
              <i className="zmdi zmdi-chevron-left"/>
            </Link>
            <Link to={nextLink} className={'go_next '+ (nextLink ? '' : 'disabled')} disabled={!nextLink}>
              <i className="zmdi zmdi-chevron-right"/>
            </Link>
          </div>
          <div className="rightPanel">
            <div className="userInfo">
              <Link className="avatarImage" to={'/p/'+ ownerId}>
                <Avatar
                  avatar={ownerProfile && ownerProfile.avatar}
                  nickname={ownerProfile && ownerProfile.nickname}
                  width={120}
                />
              </Link>
              {
                (ownerProfile && ownerProfile.banner) ?
                  <img
                    className="bannerBackground"
                    src={ resize(ownerProfile && ownerProfile.banner, 300)}
                    alt={ownerProfile.nickname}/> :
                  <InlineSVG className="svg" src={require("../../utils/assets/default_banner.svg")}/>
              }
              <span className="background"/>
              <h4 className="nickname"><Link to={'/p/'+ ownerId}> {ownerProfile ? ownerProfile.nickname : '---'} </Link>
              </h4>
              <p className="introduction">
              <span className="heat"> <i className="zmdi zmdi-fire"/> {ownerProfileHeat && calculateHeat(ownerProfileHeat)} </span>
                <Link to={'/p/'+ ownerId}> {ownerProfile && ownerProfile.introduction} </Link>
              </p>
            </div>
            <div className="info">
              <h1 className="title"><Link to={`/painting/${id}`}> { painting ? painting.title : '---' }</Link></h1>
              <p className="description">{ painting && painting.description }</p>
              <div className="infoGroup">
                <label> 作品魂 </label>
                {painting&&painting.status !== 2 ?<div>审核中...</div>:
                  <a onClick={me.id ? this.openTamashi: this.handleLoginModalOpen} className="button hollow heat">
                    <i className="zmdi zmdi-fire"/>
                    <span>{paintingHeat && paintingHeat[id] && calculateHeat(paintingHeat[id])}</span>
                  </a>
                }
              </div>
              <div className="infoGroup">
                <label> 标签 </label>
                {(painting && painting.tags ?
                  tagsArray.map((id) => (
                    <div className="tagLabel" key={'tags' + id}>
                      <Link to={"/tag/"+tags[id].type+'/'+tags[id].name}>
                        <span className="icon"><i className="zmdi zmdi-label"/></span>
                        <span className="name">{tags[id].name}</span>
                        <span className="type">{tags[id].type}</span>
                      <span className="heat"><i
                        className="zmdi zmdi-fire"/> {calculateHeat(tagHeat[tags[id].heat])}</span>
                      </Link>
                    </div>)) :
                  '')}
              </div>

              <div className="infoGroup">
                <label> 信息 </label>
                <p>发布: {painting && moment(painting.created).fromNow()}</p>
              </div>
            </div>
            { painting && paintingHeat && paintingHeat[id] &&
            <TahashiPopup positionClass="PaintingDetailPopup" id={painting.id} heat={paintingHeat[id]}/> }
          </div>
        </div>
        <div className="PaintingDetail__bottom">
          {contributedUsersIDs.length ?
            <div className="PaintingDetail__fans">
              <h3 className="PaintingDetail__fans-title">粉</h3>
              <div className="PaintingDetail__fans-wrap">
                {contributedUsersIDs.map((id)=> {
                    const contributedUser = contributedUsers[id];
                    const contributedProfile = profile[contributedUser.profile];
                    return (
                      <div className="PaintingDetail__fan" key={id}>
                        <Link to={`/p/${id}`}>
                          <Avatar
                            className="PaintingDetail__fan-avatar"
                            avatar={contributedProfile.avatar}
                            nickname={contributedProfile.nickname}
                            width={60}
                          />
                        </Link>
                        <div className="PaintingDetail__fan-wrap">
                          <Link to={`/p/${contributedProfile.user}`} className="PaintingDetail__fan-nickname">
                            {contributedProfile.nickname}
                          </Link>
                          <div className="PaintingDetail__fan-amount">
                            +{contributedUser.amount}
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div> : ''}
        </div>
      </div>);
  }
}
