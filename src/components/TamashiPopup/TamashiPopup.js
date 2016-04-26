import React, {Component, PropTypes} from "react";
import {calculateHeat} from "../../utils/common";
import "./TamashiPopup.scss";


export default class TamashiPopup extends Component {
  static propTypes = {
    heat: PropTypes.object,
  };

  render() {
    const {heat} = this.props;
    return (<div className="TamashiPopup">
      <div className="top">
        <div className="tamashi">
          <i className="zmdi zmdi-fire"/>
          {calculateHeat(heat)}
        </div>
                <span className="close">
                  <i className="zmdi zmdi-close"/>
                </span>
      </div>
      <div className="section-xing">
        <i className="zmdi zmdi-star"/>作品
        <a href="#">+1</a>
      </div>
      <div className="section-qi">
        <i className="zmdi zmdi-favorite"/>作者
        <a href="#">+1</a>
        <a href="#">+5</a>
        <a href="#">+10</a>
        <a href="#">+50</a>
      </div>
      <div className="section-tags">
        <h5>标签</h5>
      </div>
      <div className="section-profile-balance">
        余额
        <div className="balance">
          <i className="zmdi zmdi-star"/> 8
          <i className="zmdi zmdi-favorite"/> 10
        </div>
      </div>
    </div>);
  }
}
