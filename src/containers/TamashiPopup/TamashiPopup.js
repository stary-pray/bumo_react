import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {calculateHeat} from "../../utils/common";
import "./TamashiPopup.scss";
import * as tamashiPopupActions from "../../redux/modules/containers/TamashiPopup";
import BumoDropdown from "../../components/BumoDropdown/BumoDropdown";
import PayLike from "../Like/PayLike";
import FreeLike from "../Like/FreeLike";
import {load as loadPaintingDetail} from "../../redux/modules/models/PaintingDetail";
import {createNotification} from "../../redux/modules/notification";
import likeNotified from "../../redux/modules/containers/Like";

@connect(
  (state) => ({
    component: state.containers.TamashiPopup,
    paintingDetail: state.models.paintingDetail,
    tags: state.models.tags,
    me: state.me,
    likeComponent: state.containers.Like,
    profile: state.models.profile
  }),
  {
    ...tamashiPopupActions,
    loadPaintingDetail: loadPaintingDetail,
    createNotification,
    likeNotified
  }
)
export default class TamashiPopup extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    heat: PropTypes.object,
    paintingDetail: PropTypes.object,
    positionClass: PropTypes.string,
    component: PropTypes.object,
    openTamashi: PropTypes.func,
    closeTamashi: PropTypes.func,
    loadPaintingDetail: PropTypes.func,
    tags: PropTypes.object,
    me: PropTypes.object,
    createNotification: PropTypes.func,
    likeComponent: PropTypes.object,
    profile: PropTypes.object,
    likeNotified: PropTypes.func
  };

  constructor() {
    super();
    this.handleClosePopup = this.handleClosePopup.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {payLikeSuccess, likeAmount, likePaintingId, freeLikeSuccess} = nextProps.likeComponent;
    const {paintingDetail, id} = nextProps;

    if (nextProps.component.id &&
      (this.props.component.id !== nextProps.component.id) &&
      (nextProps.component.id === this.props.id) && !this.props.paintingDetail[this.props.id]) {
      this.props.loadPaintingDetail(this.props.id);
    }

    if (payLikeSuccess && (nextProps.component.id === likePaintingId) && (nextProps.component.id == id)) {
      this.props.createNotification({
        message: `给${paintingDetail[id].title}点了${likeAmount}个赞`,
        level: 'success'
      })
    }

    if (freeLikeSuccess && (nextProps.component.id === likePaintingId) && (nextProps.component.id == id)) {
      this.props.createNotification({
        message: `给${paintingDetail[id].title}点了1个赞`,
        level: 'success'
      })
    }

  }

  handleClosePopup() {
    this.props.closeTamashi();
  }

  render() {
    const {heat, id, component, paintingDetail, tags, me, profile, positionClass} = this.props;
    const isOpened = id && component.id && (id == component.id);
    const {like_error, like_success, like_amount} = this.props.likeComponent;
    let likeError = '';

    if (like_error && like_error === 'Not enough QB') {
      likeError = '钱数不够';
    }
    return (
      <BumoDropdown close={this.handleClosePopup} positionClass={positionClass} isOpened={isOpened}>
        <div className="TamashiPopup">
          <div className="top">
            <div className="tamashi">
              <i className="zmdi zmdi-fire"/>
              {calculateHeat(heat)}
            </div>
            <span onClick={this.handleClosePopup} className="close">
              <i className="zmdi zmdi-close"/>
            </span>
          </div>
          {me.balance && paintingDetail[id] ?
            <div>
              <div className="section section-xing">
                <label>
                  作品
                </label>
                <FreeLike paintingId={id} isDisabled={paintingDetail[id].free_liked && me.balance.free_qb>1}>
                  <i className="zmdi zmdi-star"/>
                  +1</FreeLike>
              </div>
              <div className="section section-qi">
                <label>
                  作者
                </label>
                <PayLike paintingId={id} amount={1}
                         isDisabled={me.balance.charged_qb<1}><i
                  className="zmdi zmdi-favorite"/> +1</PayLike>
                <PayLike paintingId={id} amount={5}
                         isDisabled={me.balance.charged_qb<5}>+5 </PayLike>
                <PayLike paintingId={id} amount={10}
                         isDisabled={me.balance.charged_qb<10}>+10</PayLike>
                <PayLike paintingId={id} amount={50}
                         isDisabled={me.balance.charged_qb<50}>+50</PayLike>
              </div>
              <div className="section section-tags">
                <label>标签</label>
                {paintingDetail[id].tags.map((tagId)=><div
                  key={"tags"+tagId}>{tags[tagId].name}_{tags[tagId].type}</div>)}
              </div>
              <div className="section section-tags">
                <label>作者</label>
                {<div>{profile[paintingDetail[id].profile].nickname}</div>}
              </div>
              <div className="section section-profile-balance">
                <label>余额</label>
                <div className="balance">
                  <span className="balanceXing"> <i className="zmdi zmdi-star"/>{me.balance.free_qb}</span>
                  <span className="balanceQi"> <i className="zmdi zmdi-favorite"/>{me.balance.charged_qb}</span>
                </div>
              </div>
            </div> : ''}
        </div>
      </BumoDropdown>
    );
  }
}
