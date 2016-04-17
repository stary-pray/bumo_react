import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {load as loadMe} from '../../redux/modules/me';
import {Link} from 'react-router';

//import {loadSpec as loadMyPaintings} from '../../redux/models/Painting';

@connect(
  (state) => ({
    me: state.me
  }),
  dispatch => bindActionCreators({
    loadMe//loadMyPaintings
  }, dispatch)
)

export default class Me extends Component {
  static propTypes = {
    me: PropTypes.object,
    loadMe: PropTypes.func,
    // loadMyPaintings:PropTypes.func,
  };

  compomemtWillMount() {
    this.props.loadMe();
    /*this.props.loadMyPaintings(me.user);*/
  }

  render() {
    const {me} = this.props;
    return (
      <div>
        <img src={me.avatar}/>{me.username}
        <div><Link to="me/edit">编辑</Link></div>
        <div><Link to="me/paintingUpload">上传图片</Link></div>
        <div>{(me.id?
          <Link to={'/p/'+ me.id}>我的图片
          </Link>
          : '')}</div>
        <div>你有{(me.balance? me.balance.charged_qb :'')}个祈可以送给你爱的画家</div>
        <div>你有{(me.balance? me.balance.free_qb:'')}个星可以送给你爱的画家</div>
        <div>你一共赚了{(me.balance? me.balance.earned_qb:'')}钱</div>
        <Link to="me/createCharge"><div className="button">充值</div></Link>
        <Link to="me/depositList"><div className="button">我的订单</div></Link>
      </div>

    );
  }
}
