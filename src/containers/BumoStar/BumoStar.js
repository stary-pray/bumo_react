import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {bumo_star} from 'redux/modules/models/BumoStar';
import {Link} from 'react-router';

//import {loadSpec as loadMyPaintings} from 'redux/models/Painting';

@connect(
  (state) => ({
  }),
  dispatch => bindActionCreators({
    bumo_star//loadMyPaintings
  }, dispatch)
)

export default class BumoStar extends Component {
  static propTypes = {
    paintingId: PropTypes.number,
    bumo_star: PropTypes.func
  };

  handleSubmit(e){
    e.preventDefault();
    e.stopPropagation();
    this.props.bumo_star(this.props.paintingId)
  }

  render() {
    const {paintingId} = this.props;
    return (
      <div>
        <button className="btn btn-success" onClick={this.handleSubmit.bind(this)}><i className="fa fa-sign-in"/>{' '}点赞
        </button>
      </div>

    );
  }
}
