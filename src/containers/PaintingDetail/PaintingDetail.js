import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import InlineSVG from "svg-inline-react";
import {load as loadPaintingDetail} from "../../redux/modules/models/PaintingDetail";
import {like as likePainting} from "../../redux/modules/models/Like";
import {Link} from "react-router";
import moment from "moment";
import {createNotification} from "../../redux/modules/notification";
import {resize, calculateHeat} from "../../utils/common";
import "./PaintingDetail.scss";
import TahashiPopup from "../../containers/TamashiPopup/TamashiPopup";
import {openTamashi} from "../../redux/modules/containers/TamashiPopup";
@connect(
  (state, ownProps) => ({
    paintingDetail: state.models.paintingDetail,
    profile: state.models.profile,
    paintingHeat: state.models.paintingHeat,
    tagHeat: state.models.tagHeat,
    tags: state.models.tags,

    component: state.containers.PaintingDetail,
    id: ownProps.id || +ownProps.params.paintingId,
    likeComponent: state.containers.Like,
  }),
  dispatch => bindActionCreators({
    loadPaintingDetail,
    likePainting,
    createNotification,
    openTamashi: openTamashi,
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
    likePainting: PropTypes.func,
    likeComponent: PropTypes.object,
    tags: PropTypes.object,
    tagHeat: PropTypes.object,
    createNotification: PropTypes.func,
    isInModal: PropTypes.bool,
    openTamashi: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.openTamashi = this.openTamashi.bind(this);
  }


  componentWillMount() {
    this.props.loadPaintingDetail(this.props.id);
  }

  componentWillReceiveProps(nextProps) {
    const {like_success, like_amount} = nextProps.likeComponent;
    const {paintingDetail, id} = nextProps;

    if (like_success) {
      this.props.createNotification({
        message: <div>给{paintingDetail[id].title}点了{like_amount}个赞</div>,
        level: 'success'
      });
    }

    if (this.props.id !== nextProps.id) {
      this.props.loadPaintingDetail(nextProps.id);
    }
  }
  
  openTamashi(){
    this.props.openTamashi(this.props.id);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const like_amount = this.refs.like_amount;
    this.props.likePainting(this.props.id, like_amount.value);
  };

  render() {
    const {paintingDetail, id, paintingHeat, profile, tags, tagHeat, isInModal} = this.props;
    const {loaded} = this.props.component;
    const {like_error, like_success, like_amount} = this.props.likeComponent;
    const painting = paintingDetail[id];
    const ownerId = painting ? painting.owner : -1;
    const profileId = painting ? painting.profile : -1;
    const ownerProfile = profile[profileId];
    const tagsArray = painting ? painting.tags : [];
    const previousLink = painting && painting.user_previous_painting ? `/painting/${painting.user_previous_painting}` : '';
    const nextLink = painting && painting.user_next_painting ? `/painting/${painting.user_next_painting}` : '';
    let likeError = '';

    if (like_error && like_error.NUMBER_WRONG) {
      likeError = '点赞数必须在1到100之间的整数';
    }
    if (like_error && like_error === 'Not enough QB') {
      likeError = '钱数不够';
    }

    return (
      <div className={"PaintingDetail " + (isInModal ? 'inModal' : '')}>
        <div className="leftPanel">
          <img className="image" src={painting && painting.attachment}/>
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
              {
                (ownerProfile && ownerProfile.avatar) ?
                  <img src={ resize(ownerProfile.avatar, 120)} alt={ownerProfile.nickname}/> :
                  <InlineSVG className="svg" src={require("../../utils/assets/default_avatar.svg")}/>
              }
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
            <p className="introduction"><Link to={'/p/'+ ownerId}>   {ownerProfile && ownerProfile.introduction} </Link>
            </p>
          </div>
          <div className="info">
            <h1 className="title"><Link to={`/painting/${id}`}> { painting ? painting.title : '---' }</Link></h1>
            <p className="description">{ painting && painting.description }</p>
            <div className="infoGroup">
              <label> 作品魂 </label>
              <a onClick={this.openTamashi} className="heat">
                <i className="zmdi zmdi-fire"/>
                <span>{paintingHeat && calculateHeat(paintingHeat[id])}</span>
              </a>
            </div>
            <div className="infoGroup">
              <label> 标签 </label>
              {(painting && painting.tags ?
                tagsArray.map((id) => (
                  <div className="tagLabel" key={'tags' + id}>
                    <Link to={"/tags/"+tags[id].type+'/'+tags[id].name}>
                      <span className="icon"><i className="zmdi zmdi-label"/></span>
                      <span className="name">{tags[id].name}</span>
                      <span className="type">{tags[id].type}</span>
                      <span className="heat"><i className="zmdi zmdi-fire"/> {calculateHeat(tagHeat[tags[id].heat])}</span>
                    </Link>
                  </div>)) :
                '')}
            </div>

            <div className="infoGroup">
              <label> 信息 </label>
              <p>发布: {painting && moment(painting.modified).fromNow()}</p>
            </div>
          </div>
          {
            paintingHeat && <TahashiPopup id={painting.id} heat={paintingHeat[id]}/>
          }
        </div>
      </div>);
  }
}
