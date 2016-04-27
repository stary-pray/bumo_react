import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {freeLike} from "../../redux/modules/models/Like";

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
    this.props.freeLike(this.props.paintingId);
  };

  render() {
    return (
    <button className="button hollow small" onClick={this.handleFreeLike.bind(this)}>
      {this.props.children}
    </button>
    );
  }
}
