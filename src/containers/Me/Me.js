import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {load as loadMe} from 'redux/modules/me';


@connect(
  (state) => ({
    me: state.me
  }),
  dispatch => bindActionCreators({
    loadMe
  }, dispatch)
)

export default class Me extends Component {
  static propTypes = {
    me: PropTypes.object,
    loadMe: PropTypes.func
  };

  compomemtWillMount() {this.props.loadMe();}

  render() {
    const {me} = this.props;
    return (
      <div><img src={me.avatar} />{me.username} </div>);
  }
}
