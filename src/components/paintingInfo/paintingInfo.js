import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {resize} from 'utils/common';
import {Link} from 'react-router';

export default class PaintingInfo extends Component {
  static propTypes = {
    painting: PropTypes.object,
    heat: PropTypes.object

  };

  render() {
    const {painting, heat} = this.props; // eslint-disable-line no-shadow
    return (
      <div>
        <Link to={'/painting/' + painting.id}>
          <img src={resize(painting.attachment,360)}/>
          <div>{heat.point}</div>
          <div>{painting.title}</div>
        </Link >
      </ div >
    );
  }
}
