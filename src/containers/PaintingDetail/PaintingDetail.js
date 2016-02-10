/**
 * Created by akistar on 16/2/10.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {load as loadPaintingDetail} from 'redux/modules/models/PaintingDetail';


@connect(
  (state, ownProps) => ({
    paintingDetail: state.models.paintingDetail,
    profile: state.models.profile,
    heat: state.models.heat,
    component: state.containers.PaintingDetail,
    id: +ownProps.params.paintingId
  }),
  dispatch => bindActionCreators({
    loadPaintingDetail
  }, dispatch)
)

export default class PaintingDetail extends Component {
  static propTypes = {
    id: PropTypes.number,
    paintingDetail: PropTypes.object,
    profile: PropTypes.object,
    heat: PropTypes.object,
    component: PropTypes.object,
    loadPaintingDetail: PropTypes.func
  };

  componentWillMount() {
    this.props.loadPaintingDetail(this.props.id);
  }

  render() {
    const {loaded: loaded} = this.props.component;
    const {paintingDetail, id} = this.props;

    return (loaded) ? ( <div> { paintingDetail[id].title } </div> ) : ( <div> Loading... </div> );
  }
}
