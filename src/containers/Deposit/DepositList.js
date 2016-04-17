import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getCharge, checkCharge} from '../../redux/modules/models/Deposit';
import {Link} from 'react-router';
import moment from 'moment';
import {goDepositLastPage} from '../../redux/modules/containers/Deposit'

@connect(
  state => ({
    deposit:state.models.deposit,
    component:state.containers.Deposit

  }),
  dispatch => bindActionCreators({
    getCharge,
    goDepositLastPage,
    checkCharge
  }, dispatch)
)

export default class DepositList extends Component {
  static propTypes = {
    deposit:PropTypes.object,
    component:PropTypes.object,
    getCharge: PropTypes.func,
    goDepositLastPage:PropTypes.func,
    checkCharge: PropTypes.func
  };

  componentWillMount() {
    this.props.getCharge(this.props.component.page);
  }

  getNextpage() {
    const { page, loading } = this.props.component;
    if(loading) return;
    this.props.getCharge(page);
  }

  getLastpage(){
    const { page, loading } = this.props.component;
    if(loading) return;
    this.props.goDepositLastPage(page);
  }

  checkCharge(depositId) {
    this.props.checkCharge(depositId);
  }
  render() {
    const{deposit,component}=this.props;
    return(<div>
      <div>
        {component.loaded ?
          (component.indexes.map((depositId)=>(
          <div key={'depositId"'+ depositId}>
            <h3>订单号{deposit[depositId].charge_obj.order_no}</h3>
            <div>金额{deposit[depositId].amount}元</div>
            <div>创建时间{deposit[depositId].created}</div>
            <button onClick={this.checkCharge.bind(this,depositId)}>我已付款</button>
            {deposit[depositId].status == 0 ?
            <div>
              <a href={deposit[depositId].charge_obj.credential[deposit[depositId].charge_obj.channel]}>未付款</a>
            </div>:
              deposit[depositId].status == 2 ?
                <div>付款成功</div>:<div>未知错误</div>}
            <div></div>
          </div>)))
          :
          ''}
        {component.loaded ?
          (component.pageMeta.next!==null?
          <div><button onClick={this.getNextpage.bind(this)}>下一页</button></div>:''):''}
        {component.loaded ?
          (component.pageMeta.previous!==null ?
          <div><button onClick={this.getLastpage.bind(this)}>上一页</button></div>:''):''}
      </div>
    </div>)
  }
}
