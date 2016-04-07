import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {createCharge} from 'redux/modules/containers/CreateCharge';
import {reduxForm} from 'redux-form';
import lodash from 'lodash';

@connect(
  (state) => ({
  deposit: state.containers.Deposit
  }),
  dispatch => bindActionCreators({
    createCharge,
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

  handleSubmit = (event) => {
    event.preventDefault();
     this.props.createCharge({
      channel: this.refs.channel.value,
      amount: this.refs.amount.value,
      success_url: 'https://3acg.com'
    });
  };

  render() {
    const {fields:{channel,amount }, createCharge, deposit} = this.props;
    return (
      <div>
        <form>
          <div>
            <label>付款方式</label>
            <select defaultValue="alipay_pc" ref="channel" {...channel}>
              <option value="alipay_pc">支付宝（电脑）</option>
              <option value="alipay_wap">支付宝（移动）</option>
              <option value="wx_pub_qr">微信</option>
            </select>
          </div>
          <div>
            <label>数目*</label>
            <input ref="amount"  {...amount}/>
          </div>
          <a className="button" onClick={this.handleSubmit}>提交</a>
        </form>
      </div>

    )
      ;
  }
}
