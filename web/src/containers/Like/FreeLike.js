import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {freeLike} from "../../redux/modules/containers/LikeAction";

//import {loadSpec as loadMyPaintings} from '../../redux/models/Painting';

@connect(
  (state) => ({
  }),
  dispatch => bindActionCreators({
    freeLike
  }, dispatch)
)

export default class FreeLike extends Component {
  static propTypes = {
    paintingId: PropTypes.number,
    freeLike: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    isDisabled: PropTypes.bool
  };

  handleFreeLike = (event) =>{
    event.preventDefault();
    if(!this.props.isDisabled){
      this.props.freeLike(this.props.paintingId);
    }
  };

  render() {
    const {isDisabled} = this.props;
    return (
    <button
      className={"button hollow small " + (isDisabled ? 'is-disabled' : '') }
      onClick={this.handleFreeLike.bind(this)}
      onMouseEnter={()=> !isDisabled && this.props.onMouseEnter()}
      onMouseLeave={this.props.onMouseLeave}
    >
      {this.props.children}
    </button>
    );
  }
}
