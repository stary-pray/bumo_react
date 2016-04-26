import React, {Component, PropTypes} from "react";
import {resize, imageHeight, calculateHeat} from "../../utils/common";
import {Link} from "react-router";
import "./PaintingInfo.scss";
import InlineSVG from "svg-inline-react";
import TahashiPopup from "../../containers/TamashiPopup/TamashiPopup";

export default class PaintingInfo extends Component {
  static propTypes = {
    owner: PropTypes.object,
    painting: PropTypes.object,
    heat: PropTypes.object,
    width: PropTypes.number,
    openModal: PropTypes.func,
    openTamashi: PropTypes.func.isRequired,
    openedTamashiId: PropTypes.number,
  };

  constructor() {
    super();
    this.openModal = this.openModal.bind(this);
    this.openTamashi = this.openTamashi.bind(this);
  }

  openModal() {
    const {painting} = this.props;
    this.props.openModal(painting.id);
  }
  
  openTamashi(){
    this.props.openTamashi(this.props.painting.id);
  }

  render() {
    const {painting, heat, owner} = this.props;
    const width = this.props.width || 320;
    const isOpenedTamashi = this.props.openedTamashiId === painting.id;
    return (
      <li style={{width: width, height: imageHeight(painting.width, painting.height, width) }}
          className={"PaintingInfo " + (isOpenedTamashi ? 'isOpened' : "") }>
        <div className="topInfo">
          <a onClick={this.openTamashi} className="heat">
            <i className="zmdi zmdi-fire"/>
            <span>{calculateHeat(heat)}</span>
          </a>
        </div>
        <img onClick={this.openModal} className="bumo_thumbnail" src={resize(painting.attachment,width)}/>
        <div className="bottomInfo">
          <div className="left">
            <Link className="title ellipses" to={'/painting/' + painting.id}> {painting.title} </Link >
            <Link className="nickname ellipses" to={'/p/' + owner.user}> {owner.nickname} </Link >
          </div>
          <div className="right">
            <Link className="avatar" to={'/p/' + owner.user}>
              {
                owner.avatar ?
                  <img src={ resize(owner.avatar, 80)} alt={owner.nickname}/> :
                  <InlineSVG className="svg" src={require("../../utils/assets/default_avatar.svg")}/>
              }
            </Link >
          </div>
        </div>
        <TahashiPopup id={painting.id} heat={heat}/>
      </li>
    );
  }
}
