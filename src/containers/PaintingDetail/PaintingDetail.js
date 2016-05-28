import React, {Component, PropTypes} from "react";
import Helmet from "react-helmet";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import InlineSVG from "svg-inline-react";
import {load as loadPaintingDetail} from "../../redux/modules/models/PaintingDetail";
import {Link, browserHistory} from "react-router";
import moment from "moment";
import {resize, resizeHeight, calculateHeat} from "../../utils/common";
import "./PaintingDetail.scss";
import TahashiPopup from "../../containers/TamashiPopup/TamashiPopup";
import Avatar from "../../components/Avatar/Avatar";
import {openTamashi} from "../../redux/modules/containers/TamashiPopup";
import {loginModalOpen} from "../../redux/modules/containers/MainHeader";
import classNames from "classnames";
import CommentForm from "../../containers/CommentForm/CommentForm";
import CommentList from "../../containers/CommentList/CommentList";
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
    profileHeat: state.models.profileHeat
  }),
  dispatch => bindActionCreators({
    loadPaintingDetail,
    openTamashi: openTamashi,
    loginModalOpen,
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
    profileHeat: PropTypes.object,
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
    if (!this.props.isInModal) {
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

  goProfile(ownerId) {
    browserHistory.push(`/u/${ownerId}`);
  }


  render() {
    const {paintingDetail, id, paintingHeat, profile, tags, tagHeat, isInModal, me, contributedUsers, profileHeat} = this.props;
    const {loaded} = this.props.component;
    const painting = paintingDetail[id];
    const ownerId = painting ? painting.owner : -1;
    const profileId = painting ? painting.profile : -1;
    const ownerProfile = profile[profileId];
    const profileHeatId = ownerProfile && ownerProfile.heat;
    const ownerProfileHeat = profileHeatId && profileHeat[profileHeatId];
    const tagsArray = painting ? painting.tags : [];
    const contributedUsersIDs = painting ? painting.contributed_users : [];
    const previousLink = painting && painting.user_previous_painting ? `/p/${painting.user_previous_painting}` : '';
    const nextLink = painting && painting.user_next_painting ? `/p/${painting.user_next_painting}` : '';

    return (
      <div className={"PaintingDetail " + (isInModal ? 'inModal' : '')}>
        <Helmet
          title={`${painting ? painting.title : ''} - 恋绘·星祈`}
          meta={[{description: painting ? painting.description : ''}]}
        />
        <div className="PaintingDetail__top">

          {/* leftPanel */}
          <div className="leftPanel">
            <div ref="leftPanel" className="leftPanel__top">
              <div
                className={classNames("PaintingDetail__image-wrapper",
                      {'PaintingDetail__image-wrapper_landscape':
                      painting && (painting.width / painting.height > this.leftPanelScale) })}
              >
                {painting ?
                  <img
                    className="PaintingDetail__image-full"
                    src={painting && resizeHeight(painting.attachment, 800)} alt="detail"/> : ''}
              </div>
              <Link to={previousLink} className={'go_previous ' + (previousLink ? '' : 'disabled')}
                    disabled={!previousLink}>
                <i className="zmdi zmdi-chevron-left"/>
              </Link>
              <Link to={nextLink} className={'go_next '+ (nextLink ? '' : 'disabled')} disabled={!nextLink}>
                <i className="zmdi zmdi-chevron-right"/>
              </Link>

            </div>
            <div className="PaintingDetail__left_bottom">
              <CommentForm paintingId={id}/>
              {loaded? <CommentList paintingId={id}/> : '' }
            </div>
          </div>

          {/* rightPanel */}
          <div className="rightPanel">
            <div onClick={()=> this.goProfile(ownerId)} className="userInfo">
              <Link className="avatarImage" to={'/u/'+ ownerId}>
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
              <h4 className="nickname"><Link to={'/u/'+ ownerId}> {ownerProfile ? ownerProfile.nickname : '---'} </Link>
              </h4>
              <p className="introduction">
                <span className="heat"> <i
                  className="zmdi zmdi-fire"/> {ownerProfileHeat && calculateHeat(ownerProfileHeat)} </span>
                <Link to={'/u/'+ ownerId}> {ownerProfile && ownerProfile.introduction} </Link>
              </p>
            </div>
            <div className="info">
              <h1 className="title"><Link to={`/p/${id}`}> { painting ? painting.title : '---' }</Link></h1>
              <p className="description">{ painting && painting.description }</p>
              <div className="infoGroup">
                <label> 作品魂 </label>
                {painting && painting.status !== 2 ? <div>审核中...</div> :
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
                  <p className="infoGroup__nothing">没有标签 =A=</p>)}
              </div>

              <div className="infoGroup">
                <label> 信息 </label>
                <p>发布: {painting && moment(painting.created).fromNow()}</p>
              </div>

              {contributedUsersIDs.length ?
                <div className="infoGroup">
                  <label> 粉 </label>
                  {contributedUsersIDs.map((id)=> {
                      const contributedUser = contributedUsers[id];
                      const contributedProfile = profile[contributedUser.profile];
                      return (
                        <Link to={`/u/${id}`} className="PaintingDetail__fan" key={id}>
                          <Avatar
                            className="PaintingDetail__fan-avatar"
                            avatar={contributedProfile.avatar}
                            nickname={contributedProfile.nickname}
                            width={30}
                          />
                            <span className="PaintingDetail__fan-nickname ellipses">
                              {contributedProfile.nickname}
                            </span>
                          <span className="PaintingDetail__fan-amount ellipses">
                            +{contributedUser.amount}
                          </span>
                        </Link>
                      );
                    }
                  )
                  }
                </div>
                : ''}

            </div>
            { painting && paintingHeat && paintingHeat[id] &&
            <TahashiPopup positionClass="PaintingDetailPopup" id={painting.id} heat={paintingHeat[id]}/> }
          </div>
        </div>

      </div>);
  }
}
