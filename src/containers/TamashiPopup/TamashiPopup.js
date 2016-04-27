import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {calculateHeat} from "../../utils/common";
import "./TamashiPopup.scss";
import * as tamashiPopupActions from "../../redux/modules/containers/TamashiPopup";
import BumoDropdown from "../../components/BumoDropdown/BumoDropdown";
import PayLike from "../Like/PayLike";
import FreeLike from "../Like/FreeLike";
import {load as loadPaintingDetail} from "../../redux/modules/models/PaintingDetail";


@connect(
  (state) => ({
    component: state.containers.TamashiPopup,
    paintingDetail: state.models.paintingDetail,
    tags: state.models.tags,
    me: state.me
  }),
  {
    ...tamashiPopupActions,
    loadPaintingDetail: loadPaintingDetail,
  }
)
export default class TamashiPopup extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    heat: PropTypes.object,
    paintingDetail: PropTypes.object,
    component: PropTypes.object,
    openTamashi: PropTypes.func,
    closeTamashi: PropTypes.func,
    loadPaintingDetail: PropTypes.func,
    tags: PropTypes.object,
    me: PropTypes.object
  };

  constructor(){
    super();
    this.handleClosePopup = this.handleClosePopup.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.component.id && (this.props.component.id !== nextProps.component.id
        && !this.props.paintingDetail[this.props.id])){
      this.props.loadPaintingDetail(this.props.id);
    }
  }

  handleClosePopup(){
    this.props.closeTamashi();
  }

  render() {
    const {heat, id, component, paintingDetail, tags, me} = this.props;
    const isOpened = id && component.id && (id == component.id);
    return (
      <BumoDropdown close={this.handleClosePopup} positionClass={"PaintingInfoPopup"} isOpened={isOpened}>
        <div className="TamashiPopup">
          <div className="top">
            <div className="tamashi">
              <i className="zmdi zmdi-fire"/>
              {calculateHeat(heat)}
            </div>
                <span className="close">
                  <i className="zmdi zmdi-close"/>
                </span>
          </div>
          <div className="section section-xing">
            <label>
              作品
            </label>
            <FreeLike><i className="zmdi zmdi-star"/> +1</FreeLike>
          </div>
          <div className="section section-qi">
            <label>
              作者
            </label>
            <PayLike paintingId={id} amount={1}><i className="zmdi zmdi-favorite"/> +1</PayLike>
            <PayLike paintingId={id} amount={1}>+5 </PayLike>
            <PayLike paintingId={id} amount={1}>+10</PayLike>
            <PayLike paintingId={id} amount={1}>+50</PayLike>
          </div>
          <div className="section section-tags">
            <label>标签</label>
            {paintingDetail[id]? paintingDetail[id].tags.map((tagId)=><div key={"tags"+tagId}>{tags[tagId].name}_{tags[tagId].type}</div>):''}
          </div>
          <div className="section section-tags">
            <label>作者</label>
          </div>
          {me.balance ? <div className="section section-profile-balance">
            <label>余额</label>
            <div className="balance">
              <span className="balanceXing"> <i className="zmdi zmdi-star"/>{me.balance.free_qb}</span>
              <span className="balanceQi"> <i className="zmdi zmdi-favorite"/>{me.balance.earned_qb}</span>
            </div>
          </div>:''}
        </div>
      </BumoDropdown>
    );
  }
}
