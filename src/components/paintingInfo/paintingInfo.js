import React, {Component, PropTypes} from 'react';
import {resize, defaultAvatar} from '../../utils/common';
import {Link} from 'react-router';
import {imageHeight} from '../../utils/common';
import './PaintingInfo.scss';


export default class PaintingInfo extends Component {
  static propTypes = {
    owner: PropTypes.object,
    painting: PropTypes.object,
    heat: PropTypes.object,
    width: PropTypes.number,
  };

  componentDidMount() {
    this.loaded = false;
  }

  render() {
    const {painting, heat, owner} = this.props; // eslint-disable-line no-shadow
    const width = this.props.width || 360;
    return (
      <li style={{width: width, height: imageHeight(painting.width, painting.height, width) }}
          className="PaintingInfo">
        <div className="topInfo">
          <div className="heat">
            <i className="zmdi zmdi-fire"/> 
            <span>{Math.round(heat.point)}</span>
          </div>
          <div className="buttons">
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
              <img src={ resize(defaultAvatar(owner.avatar), 80)} alt={owner.nickname}/>
            </Link >
          </div>
        </div>
      </li>
    );
  }
}
