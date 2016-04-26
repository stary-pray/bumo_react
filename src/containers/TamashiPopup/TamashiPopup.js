import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {calculateHeat} from "../../utils/common";
import "./TamashiPopup.scss";
import * as tamashiPopupActions from "../../redux/modules/containers/TamashiPopup";
import BumoDropdown from "../../components/BumoDropdown/BumoDropdown";
import {load as loadPaintingDetail} from "../../redux/modules/models/PaintingDetail";


@connect(
  (state) => ({
    component: state.containers.TamashiPopup,
    paintingDetail: state.models.paintingDetail
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
    const {heat, id, component} = this.props;
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
            <button className="button hollow small"><i className="zmdi zmdi-star"/> +1</button>
          </div>
          <div className="section section-qi">
            <label>
              作者
            </label>
            <button className="button hollow small"><i className="zmdi zmdi-favorite"/> +1</button>
            <button className="button hollow small">+5</button>
            <button className="button hollow small">+10</button>
            <button className="button hollow small">+50</button>
          </div>
          <div className="section section-tags">
            <label>标签</label>
          </div>
          <div className="section section-tags">
            <label>作者</label>
          </div>
          <div className="section section-profile-balance">
            <label>余额</label>
            <div className="balance">
              <span className="balanceXing"> <i className="zmdi zmdi-star"/> 8 </span>
              <span className="balanceQi"> <i className="zmdi zmdi-favorite"/> 10</span>
            </div>
          </div>
        </div>
      </BumoDropdown>
    );
  }
}
