import React, {Component, PropTypes} from "react";
import "./Redirect.scss";

export default class Redirect extends Component {
  render() {
    return (
      <div className="Redirect__container grid-container">
        <h1 className="Redirect__title">请问你要去那个站？</h1>
        <div className="Redirect__button-wrapper ">
          <a className="button large" href="https://3acg.com/">物语·星祈</a>
          <a className="button large success" href="https://6koi.com/">恋绘·星祈</a>
        </div>
      </div>
    );
  }
}
