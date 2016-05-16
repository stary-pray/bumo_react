import React, {Component, PropTypes} from "react";
import {resize, imageHeight, calculateHeat, compareAttrs} from "../../utils/common";
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
    openedTamashiId: PropTypes.number,
    isMe: PropTypes.bool,
    mode: PropTypes.string,
    
    loginModalOpen: PropTypes.func,
    openModal: PropTypes.func,
    openTamashi: PropTypes.func.isRequired,
  };

  constructor() {
    super();
    this.openModal = this.openModal.bind(this);
    this.openTamashi = this.openTamashi.bind(this);
    this.handleLoginModalOpen = this.handleLoginModalOpen.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState){
    return compareAttrs(this.props, nextProps, ['heat', 'mode', 'openedTamashiId']);
  }

  openModal() {
    const {painting} = this.props;
    this.props.openModal(painting.id);
  }

  openTamashi() {
    this.props.openTamashi(this.props.painting.id);
  }

  handleLoginModalOpen() {
    this.props.loginModalOpen();
  }

  renderCard() {
    const {painting, heat, owner, isMe} = this.props;
    const width = this.props.width || 320;
    const isOpenedTamashi = this.props.openedTamashiId === painting.id;

    return (
      <li className={"PaintingInfo__container PaintingInfo__card " + (isOpenedTamashi ? 'isOpened' : "") }>
        <div className="PaintingInfo__image-thumbnail">
          <img
            onClick={this.openModal}
            className="PaintingInfo__image-thumbnail_image"
            src={resize(painting.attachment,width)}/>
        </div>
        <div className="PaintingInfo__intro">
          <Link
            className="PaintingInfo__intro_title ellipses"
            to={'/painting/' + painting.id}> {painting.title} </Link >
          <Link className="PaintingInfo__intro_nickname ellipses" to={'/p/' + owner.user}> {owner.nickname} </Link >
          <a
            onClick={isMe ? this.openTamashi : this.handleLoginModalOpen}
            className="PaintingInfo__intro_heat">
            <i className="zmdi zmdi-fire"/>
            <span>{calculateHeat(heat)}</span>
          </a>
        </div>
        <TahashiPopup positionClass="PaintingInfoPopup" id={painting.id} heat={heat}/>
      </li>
    );
  }

  renderMasonry() {
    const {painting, heat, owner, isMe} = this.props;
    const width = this.props.width || 320;
    const isOpenedTamashi = this.props.openedTamashiId === painting.id;
    return (
      <li style={{width: width, height: imageHeight(painting.width, painting.height, width) }}
          className={"PaintingInfo__container PaintingInfo__thumbnail " + (isOpenedTamashi ? 'isOpened' : "") }>
        <div className="topInfo">
          <a onClick={isMe?this.openTamashi:this.handleLoginModalOpen} className="heat">
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
        <TahashiPopup positionClass="PaintingInfoPopup" id={painting.id} heat={heat}/>
      </li>
    );
  }

  render() {
    switch (this.props.mode){
      case 'masonry':
        return  this.renderMasonry();
      case 'card':
      default:
        return  this.renderCard();
    }
  }
}
