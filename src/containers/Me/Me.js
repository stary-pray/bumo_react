import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {load as loadMe} from 'redux/modules/me';
//import {loadSpec as loadMyPaintings} from 'redux/models/Painting';

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

  compomemtWillMount() {this.props.loadMe(); /*this.props.loadMyPaintings(me.user);*/}

  render() {
    const {me} = this.props;
    return (
      <div><img src={me.avatar} />{me.username} </div>);
  }
}
