import React, {Component, PropTypes} from "react";
import {resizeWidthSquare} from "../../utils/common";
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
    const height = +width;
    return (
      avatar ?
        <img className={"Avatar__component Avatar__image pic " + className} src={ resizeWidthSquare(avatar, width)} alt={nickname}/> :
        <InlineSVG style={{width: width, height: height}} className={"Avatar__component Avatar__placeHolder svg " + className} src={require("../../utils/assets/default_avatar.svg")}/>
    );
  }
}
