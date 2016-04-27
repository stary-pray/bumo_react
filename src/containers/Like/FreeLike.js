import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {freeLike} from '../../redux/modules/models/Like';
import {Link} from 'react-router';
import Tooltip from 'rc-tooltip';

//import {loadSpec as loadMyPaintings} from '../../redux/models/Painting';

@connect(
  (state) => ({
  }),
  dispatch => bindActionCreators({
    freeLike
  }, dispatch)
)

export default class FreeLike extends Component {
  static propTypes = {
    paintingId: PropTypes.number,
    freeLike: PropTypes.func
  };

  handleFreeLike = (event) =>{
    event.preventDefault();
    this.props.freeLike(this.props.paintingId)
  };

  render() {
    return (
      <div>
        <button className="btn btn-success" onClick={this.handleFreeLike.bind(this)}>
          星星
        </button>
      </div>
    );
  }
}
