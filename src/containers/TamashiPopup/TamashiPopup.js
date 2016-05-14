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
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

@connect(
  (state) => ({
    component: state.containers.TamashiPopup,
    paintingDetail: state.models.paintingDetail,
    tags: state.models.tags,
    me: state.me,
    likeActionComponent: state.containers.LikeAction,
    profile: state.models.profile
  }),
  {
    ...tamashiPopupActions,
    loadPaintingDetail: loadPaintingDetail,
    createNotification,
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
    likeActionComponent: PropTypes.object,
    profile: PropTypes.object,
    hoverButton: PropTypes.func,
  };

  constructor() {
    super();
    this.handleClosePopup = this.handleClosePopup.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {payLikeSuccess, likeAmount, likePaintingId, freeLikeSuccess} = nextProps.likeActionComponent;
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
      });
    }

    if (freeLikeSuccess && (nextProps.component.id === likePaintingId) && (nextProps.component.id == id)) {
      this.props.createNotification({
        message: `给${paintingDetail[id].title}点了1个赞`,
        level: 'success'
      });
    }

  }

  handleClosePopup() {
    this.props.closeTamashi();
  }

  renderSectionWidth(key, title, heatObj, hoverAmount) {
    return (
      <div key={key} className="section-with__container">
        <div className="section-with__title">
          {title}
        </div>
        <ReactCSSTransitionGroup
          className="section-with__heat"
          transitionName="HeatPreviewTransaction"
          transitionEnterTimeout={150}
          transitionLeaveTimeout={100}
        >
          <span className="section-with__heat-animate" key={hoverAmount}>
            <i className="zmdi zmdi-fire"/> {calculateHeat(heatObj) + (hoverAmount || 0)}
          </span>
        </ReactCSSTransitionGroup>
      </div>
    );
  }

  render() {
    const {heat, id, component, paintingDetail, tags, me, profile, positionClass, hoverButton} = this.props;
    const isOpened = id && component.id && (id == component.id);

    return (
      <BumoDropdown close={this.handleClosePopup} positionClass={positionClass} isOpened={isOpened}>
        <div className="TamashiPopup">
          <div className="top">
            <span onClick={this.handleClosePopup} className="close">
              <i className="zmdi zmdi-close"/>
            </span>
          </div>
          {me.balance && paintingDetail[id] ? (
            <div>
              <div className="section section-xing">
                <label>单纯的支持作品:</label>
                <FreeLike
                  paintingId={id}
                  onMouseEnter={()=> hoverButton({type: 'free', hoverAmount: 1})}
                  onMouseLeave={()=> hoverButton({type: 'free', hoverAmount: 0})}
                  isDisabled={(paintingDetail[id].free_liked)|| (me.balance.free_qb<1)||(paintingDetail[id].owner===me.id)}
                >
                  <i className="zmdi zmdi-favorite"/> +1
                </FreeLike>
                  <span className="section__hint">
                    {paintingDetail[id].owner != me.id && paintingDetail[id].free_liked ? '每个作品用HP只能支持一次' : ''}
                    {paintingDetail[id].owner === me.id ? '不能给自己的作品续命' : ''}
                  </span>
              </div>
              <div className="section section-qi">
                <label>也支持一下作者:</label>
                {[1, 5, 10, 50]
                  .filter(amount => (amount <= me.balance.charged_qb || amount === 1))
                  .map((amount)=>
                    <PayLike
                      key={amount}
                      paintingId={id}
                      amount={amount}
                      onMouseEnter={()=> hoverButton({type: 'paid', hoverAmount: amount})}
                      onMouseLeave={()=> hoverButton({type: 'paid', hoverAmount: 0})}
                      isDisabled={me.balance.charged_qb<1}>
                      {amount === 1 ? <i className="zmdi zmdi-star"/> : '' } +{amount}
                    </PayLike>
                  )}
              </div>
              <hr/>
              <div className="section section-tamashi">
                <label>作品</label>
                {this.renderSectionWidth('p', paintingDetail[id].title, heat, component.hoverAmount)}
              </div>
              <div className="section section-tags">
                <label>作者</label>
                {this.renderSectionWidth('t', profile[paintingDetail[id].profile].nickname, heat, component.hoverAmount)}
                <div className="section section-tags">
                  <label>标签</label>
                  {paintingDetail[id].tags.map((tagId)=>
                    this.renderSectionWidth(tagId, tags[tagId].name, heat, component.hoverAmount)
                  )}
                </div>
                <hr/>
                <div className="section section-profile-balance">
                  <label>账户余额</label>
                  <div className="balance">
                    <span className="balanceXing"> 
                      <i
                        className="zmdi zmdi-favorite"/>HP {me.balance.free_qb - (component.type === 'free' ? component.hoverAmount : 0)}
                    </span>
                    <span className="balanceQi"> 
                      <i
                        className="zmdi zmdi-star"/>MP {me.balance.charged_qb - (component.type === 'paid' ? component.hoverAmount : 0)}
                    </span>
                  </div>
                </div>
              </div>
            </div> ) : ''}
        </div>
      </BumoDropdown>
    );
  }
}
