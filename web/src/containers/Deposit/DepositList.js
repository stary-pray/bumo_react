import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getCharge, checkCharge} from "../../redux/modules/models/Deposit";
import classNames from "classnames";
import "./DepositList.scss";
import moment from "moment";
import {openPayCharge} from "../../redux/modules/containers/ChargeWindow";

@connect(
  state => ({
    deposit:state.models.deposit,
    component:state.containers.Deposit,
    waypoint: state.waypoint
  }),
  dispatch => bindActionCreators({
    getCharge,
    checkCharge,
    openPayCharge
  }, dispatch)
)

export default class DepositList extends Component {
  static propTypes = {
    deposit:PropTypes.object,
    component:PropTypes.object,
    getCharge: PropTypes.func,
    goDepositLastPage:PropTypes.func,
    checkCharge: PropTypes.func,
    waypoint: PropTypes.object
  };

  constructor() {
    super();
    this.loadMore = this.loadMore.bind(this);
    this.waypointOnEnter = this.waypointOnEnter.bind(this);
  }

  componentDidMount() {
    this.loadMore();
  }

  componentWillReceiveProps(nextProps) {
    const currentWaypoint = this.props.waypoint;
    const nextWaypoint = nextProps.waypoint;
    if (currentWaypoint.currentPosition != 'inside' &&
      (nextWaypoint.currentPosition == 'inside')) {
      this.waypointOnEnter();
    }
  }

  componetWillUnmount() {
    this.loadMore.cancel();
  }

  loadMore() {
    const {pageMeta, loading} = this.props.component;
    if (loading || !pageMeta.next) return;
    this.props. getCharge(pageMeta.next);
  }

  waypointOnEnter() {
    const {pageMeta} = this.props.component;
    if (pageMeta.current === 0 || pageMeta.current % 3) {
      this.loadMore();
    }
  }

  handleOpenPayCharge(link){
    this.props.openPayCharge(link)
  }

  render() {
    const{deposit,component}=this.props;
    const {pageMeta, loading}=this.props.component;
    const isLastPage = !pageMeta.next;

    return(
      <div className="DepositList">
        <h2 className="DepositList_title">为画手注入的魂 <span className="DepositList__heat"><i className="zmdi zmdi-fire"/></span></h2>
        {component.loaded ?
          (component.indexes.map((depositId)=>(
          <div key={'depositId"'+ depositId} className="DepositList_rowContainer">
            <div className="DepositList_date">{moment(deposit[depositId].created).format('L')}</div>
            <div className="DepositList_number">订单号: {deposit[depositId].charge_obj.order_no}</div>
            <div className="DepositList_money">金额: ￥{deposit[depositId].amount}.00</div>
            {deposit[depositId].status == 0 ?
            <div className="DepositList_status">
              {(new Date() - new Date(deposit[depositId].created))/1000/3600 > 1 ?
                <div>交易关闭</div>:
                <a onClick={this.handleOpenPayCharge.bind(this, deposit[depositId].charge_obj.credential[deposit[depositId].charge_obj.channel])}>未付款</a>
              }
            </div>:
              deposit[depositId].status == 2 ?
                <div className="DepositList_status">交易成功</div>:<div className="DepositList_status">未知错误</div>}
            </div>
          )))
          :
          ''}
        <button
          onClick={this.loadMore}
          className={classNames("button hollow PaintingList__pageButton", {disabled: isLastPage}) }>
          { loading ? '载入中...' : (isLastPage ? '已到最后一页' : '载入更多') }
        </button>
      </div>
    )
  }
}
