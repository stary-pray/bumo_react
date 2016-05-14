import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {payLike} from "../../redux/modules/containers/LikeAction";

//import {loadSpec as loadMyPaintings} from '../../redux/models/Painting';

@connect(
  (state) => ({}),
  dispatch => bindActionCreators({
    payLike//loadMyPaintings
  }, dispatch)
)

export default class PayLike extends Component {
  static propTypes = {
    paintingId: PropTypes.number,
    payLike: PropTypes.func,
    amount: PropTypes.number.isRequired,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
    isDisabled: PropTypes.bool
  };

  handlePayLike = (event) => {
    event.preventDefault();
    this.props.payLike(this.props.paintingId, this.props.amount);
  };


  render() {
    const {isDisabled} = this.props;
    return (
      <button
        className={"button hollow small "  + (isDisabled ? 'is-disabled' : '')}
        onClick={this.handlePayLike.bind(this)}
        onMouseEnter={()=> !isDisabled && this.props.onMouseEnter()}
        onMouseLeave={this.props.onMouseLeave}
      >
        {this.props.children}
      </button>
    );
  }
}
