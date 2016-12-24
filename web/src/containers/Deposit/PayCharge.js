import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {closePayCharge, openPayCharge} from "../../redux/modules/containers/ChargeWindow";
import {bindActionCreators} from "redux";
import "./PayCharge.scss";
@connect(
  (state) => ({
    deposit: state.containers.Deposit,
    chargeWindow: state.containers.ChargeWindow,
  }),
  dispatch => bindActionCreators({
    closePayCharge,
    openPayCharge
  }, dispatch)
)
export default class chargeWindow extends Component {
  static propTypes = {
    createCharge: PropTypes.object,
    closeCharge: PropTypes.func,
    deposit: PropTypes.object
  };

  closeCharge(){
    this.props.closePayCharge();
  }

  renderModal() {
    const {chargeWindow} = this.props;
    const {link} = chargeWindow;
    return (
      <div className="PayChargeModal">
        <div className="PayChargeModal__transition-wrapper">
        {link}
        <a className="button" onClick={this.closeCharge.bind(this)}>关闭</a>
          </div>
      </div>

    );
  }

  render() {
    const {isOpened} = this.props.chargeWindow;
    return (
      <div>
        {isOpened ? this.renderModal() : ''}
        </div>
    );
  }
}

