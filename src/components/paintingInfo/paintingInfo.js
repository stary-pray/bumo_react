import React, {Component, PropTypes} from "react";
import {resize, imageHeight, calculateHeat} from "../../utils/common";
import {Link} from "react-router";
import "./PaintingInfo.scss";
import InlineSVG from "svg-inline-react";

export default class PaintingInfo extends Component {
  static propTypes = {
    owner: PropTypes.object,
    painting: PropTypes.object,
    heat: PropTypes.object,
    width: PropTypes.number,
  };

  render() {
    const {painting, heat, owner} = this.props; // eslint-disable-line no-shadow
    const width = this.props.width || 320;
    return (
      <li style={{width: width, height: imageHeight(painting.width, painting.height, width) }}
          className="PaintingInfo">
        <div className="topInfo">
          <a className="heat">
            <i className="zmdi zmdi-fire"/>
            <span>{calculateHeat(heat)}</span>
          </a>
          <div className="buttons hide">
            <button className="button hollow xing"><i className="zmdi zmdi-star-outline"/></button>
            <button className="button hollow qi"><i className="zmdi zmdi-favorite-outline"/></button>
          </div>
        </div>
        <img src={resize(painting.attachment,width)}/>
        <div className="bottomInfo">
          <div className="left">
            <Link className="title" to={'/painting/' + painting.id}> {painting.title} </Link >
            <Link className="nickname" to={'/p/' + owner.user}> {owner.nickname} </Link >
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
      </li>
    );
  }
}
