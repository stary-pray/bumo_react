import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {payLike} from '../../redux/modules/models/Like';
import {Link} from 'react-router';
import Tooltip from 'rc-tooltip';

//import {loadSpec as loadMyPaintings} from '../../redux/models/Painting';

@connect(
  (state) => ({
  }),
  dispatch => bindActionCreators({
    payLike//loadMyPaintings
  }, dispatch)
)

export default class PayLike extends Component {
  static propTypes = {
    paintingId: PropTypes.number,
    payLike:PropTypes.func,
    pay_num:PropTypes.func
  };

  handlePayLike = (event) =>{
    event.preventDefault();
    this.props.payLike(this.props.paintingId, this.props.pay_num)
  };


  render() {
    return (
      <div>
        <button className="btn btn-success" onClick={this.handlePayLike.bind(this)}>
          心心
        </button>
      </div>
    );
  }
}
