import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {payLike} from "../../redux/modules/models/Like";

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
    amount: PropTypes.number.isRequired
  };

  handlePayLike = (event) => {
    event.preventDefault();
    this.props.payLike(this.props.paintingId, this.props.amount);
  };


  render() {
    return (
      <button className="button hollow small" onClick={this.handlePayLike.bind(this)}>
        {this.props.children}
      </button>
    );
  }
}
