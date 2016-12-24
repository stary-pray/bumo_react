import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {createCharge, cancelCreateCharge} from "../../redux/modules/containers/CreateCharge";
import {reduxForm} from "redux-form";
import "./CreateCharge.scss";
import {createNotification} from "../../redux/modules/notification";

@connect(
  (state) => ({
    deposit: state.containers.Deposit,
    charge: state.containers.CreateCharge
  }),
  dispatch => bindActionCreators({
    createCharge,
    cancelCreateCharge,
    createNotification
  }, dispatch)
)

@reduxForm({
  form: 'createCharge',
  fields: ['channel', 'amount']
})


export default class createChargeForm extends Component {
  static propTypes = {
    createCharge: PropTypes.func,
    getCharge: PropTypes.func
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.charge.error&&nextProps.charge.error=="amount_must_be_int") {
      this.props.createNotification({
        message: `金额必须是整数`,
        level: 'error'
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createCharge({
      channel: this.refs.channel.value,
      amount: this.refs.amount.value,
      success_url: 'https://3acg.com'
    });
  };

  handleCancel(){
    this.props.cancelCreateCharge();
  }

  renderCreateChargeModal() {
    const {fields:{channel, amount}, createCharge, deposit} = this.props;
    return (
      <div className="CreateChargeModal">
        <form className="CreateChargeModal__transition-wrapper">
          <div>
            <label>付款方式</label>
            <select defaultValue="alipay_pc" ref="channel" {...channel}>
              <option value="alipay_pc">支付宝（电脑）</option>
              <option value="alipay_wap">支付宝（移动）</option>
              <option value="wx_pub_qr">微信</option>
            </select>
          </div>
          <div>
            <label>数目*(金额必须是整数)</label>
            <input ref="amount"  {...amount}/>
          </div>
          <a className="button" onClick={this.handleSubmit}>提交</a>
          <a className="button" onClick={this.handleCancel.bind(this)}>取消</a>
        </form>
      </div>
    );
  }

  render() {
    const {charge} = this.props;
    console.log('creating',charge.creating)
    return (
      <div>
        {charge.creating ? this.renderCreateChargeModal() : ''}
      </div>
    );
  }
}
