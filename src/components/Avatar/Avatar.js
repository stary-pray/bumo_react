import React, {Component, PropTypes} from "react";
import {resize} from "../../utils/common";
import InlineSVG from "svg-inline-react";

export default class Avatar extends Component {
  static propTypes = {
    avatar: PropTypes.string,
    nickname: PropTypes.string,
    width: PropTypes.number.isRequired,
    className: PropTypes.string,
  };
  
  render() {
    const {avatar, nickname, width, className} = this.props;
    return (
      avatar ?
        <img className={"Avatar__image " + className} src={ resize(avatar, width)} alt={nickname}/> :
        <InlineSVG className={"Avatar__placeHolder svg " + className} src={require("../../utils/assets/default_avatar.svg")}/>
    );
  }
}
