import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getCharge, checkCharge} from "../../redux/modules/models/Deposit";
import {Link} from "react-router";
import classNames from "classnames";

@connect(
  state => ({
    deposit:state.models.deposit,
    component:state.containers.Deposit,
    waypoint: state.waypoint
  }),
  dispatch => bindActionCreators({
    getCharge,
    checkCharge
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

  checkCharge(depositId) {
    this.props.checkCharge(depositId);
  }
  render() {
    const{deposit,component}=this.props;
    const {pageMeta, loading}=this.props.component;
    const isLastPage = !pageMeta.next;

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
        <button
          onClick={this.loadMore}
          className={classNames("button hollow PaintingList__pageButton", {disabled: isLastPage}) }>
          { loading ? '载入中...' : (isLastPage ? '已到最后一页' : '载入更多') }
        </button>
      </div>
    </div>)
  }
}
