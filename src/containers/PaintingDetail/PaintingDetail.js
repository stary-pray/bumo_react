/**
 * Created by akistar on 16/2/10.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {load as loadPaintingDetail} from '../../redux/modules/models/PaintingDetail';
import {like as likePainting} from '../../redux/modules/models/Like';
import {Link} from 'react-router';
import moment from 'moment';
import {createNotification, createNotificationSuccess} from '../../redux/modules/notification';
import BumoStar from '../../containers/BumoStar/BumoStar'
import './PaintingDetail.scss';
import {resize, defaultAvatar} from '../../utils/common';

moment.locale('zh-cn');
const calculateHeat = (last_heat, last_time, like_amount = 0) => {
  const q = 0.5 ** ((+Date.now() - +new Date(last_time)) / (14 * 24 * 60 * 60 * 1000));
  return Math.round((last_heat + like_amount) * q);
};

@connect(
  (state, ownProps) => ({
    paintingDetail: state.models.paintingDetail,
    profile: state.models.profile,
    paintingHeat: state.models.paintingHeat,
    tagHeat: state.models.tagHeat,
    component: state.containers.PaintingDetail,
    id: +ownProps.params.paintingId,
    likeComponent: state.containers.Like,
    tags: state.models.tags
  }),
  dispatch => bindActionCreators({
    loadPaintingDetail,
    likePainting,
    createNotification,
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
    createNotification: PropTypes.func
  };


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
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const like_amount = this.refs.like_amount;
    this.props.likePainting(this.props.id, like_amount.value);
  };

  render() {
    const {paintingDetail, id, paintingHeat, profile, tags, tagHeat} = this.props;
    const {loaded: loaded} = this.props.component;
    const {like_error, like_success, like_amount} = this.props.likeComponent;
    const ownerId = paintingDetail[id] ? paintingDetail[id].owner : -1;
    const profileId = paintingDetail[id] ? paintingDetail[id].profile : -1;
    const ownerProfile = profile[profileId];
    const tagsArray = paintingDetail[id] ? paintingDetail[id].tags : [];
    let likeError = '';

    if (like_error && like_error.NUMBER_WRONG) {
      likeError = '点赞数必须在1到100之间的整数';
    }
    if (like_error && like_error === 'Not enough QB') {
      likeError = '钱数不够';
    }

    return (loaded) ? (
      <div className="PaintingDetail">
        <div className="leftPanel">
          <img className="image" src={paintingDetail[id].attachment}/>
          {/*
          <span>热度{calculateHeat(paintingHeat[id].point, paintingHeat[id].modified, like_amount)}</span>
          <form className="heatForm" onSubmit={this.handleSubmit}>
            <div><label>点祈数</label>
              <select defaultValue="1" ref="like_amount">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
            {likeError}
            <button onClick={this.handleSubmit}>祈
            </button>
            <BumoStar paintingId={id}/>
          </form>
           */}
        </div>
        <div className="rightPanel">
          <div className="userInfo">
            <Link className="avatarImage" to={'/p/'+ ownerId}>
              <img src={ resize(defaultAvatar(ownerProfile.avatar), 120)} alt={ownerProfile.nickname}/>
            </Link>
            <img
              className="bannerBackground"
              src={ resize(defaultAvatar(ownerProfile.avatar), 120)}
              alt={ownerProfile.nickname}/>
            <span className="background"/>
            <h4 className="nickname"><Link to={'/p/'+ ownerId}> {ownerProfile.nickname} </Link></h4>
            <p className="introduction"><Link to={'/p/'+ ownerId}> 什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么什么   </Link></p>
          </div>
          <div className="info">
            <h1 className="title">{ paintingDetail[id].title }</h1>
            <p className="description">{ paintingDetail[id].description }</p>
            <div className="infoGroup">
              <label> 标签 </label>
              {(paintingDetail[id].tags ?
                tagsArray.map((id) => (
                  <div className="tagLabel" key={'tags' + id}>
                    <Link to={"tags/hot/"+tags[id].name}>
                      <span className="icon"><i className="zmdi zmdi-label"/></span>
                      <span className="name">{tags[id].name}</span>
                      <span className="type">{tags[id].type}</span>
                      <span className="heat"><i className="zmdi zmdi-fire"/> {Math.round(tagHeat[tags[id].heat].point)}</span>
                    </Link>
                  </div>)) :
                '')}
            </div>
            
            <div className="infoGroup">
              <label> 信息 </label>
              <p>发布: {moment(paintingDetail[id].modified).fromNow()}</p>
            </div>
          </div>
        </div>
      </div> ) :
      <div/>;
  }
}
