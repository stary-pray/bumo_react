/**
 * Created by akistar on 16/2/10.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {load as loadPaintingDetail} from 'redux/modules/models/PaintingDetail';
import {like as likePainting} from 'redux/modules/models/Like';
import {Link} from 'react-router';


@connect(
  (state, ownProps) => ({
    paintingDetail: state.models.paintingDetail,
    profile: state.models.profile,
    heat: state.models.heat,
    component: state.containers.PaintingDetail,
    id: +ownProps.params.paintingId,
    likeComponent: state.containers.Like
  }),
  dispatch => bindActionCreators({
    loadPaintingDetail,
    likePainting
  }, dispatch)
)


export default class PaintingDetail extends Component {
  static propTypes = {
    id: PropTypes.number,
    paintingDetail: PropTypes.object,
    profile: PropTypes.object,
    heat: PropTypes.object,
    component: PropTypes.object,
    loadPaintingDetail: PropTypes.func,
    likePainting: PropTypes.func,
    likeComponent: PropTypes.object
  };

  componentWillMount() {
    this.props.loadPaintingDetail(this.props.id);
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.props);
    const like_amount = this.refs.like_amount;
    this.props.likePainting(this.props.id,like_amount.value);
    like_amount.value = '';
  }

  render() {
    const {loaded: loaded} = this.props.component;
    const {like_error} = this.props.likeComponent;
    const {paintingDetail, id, heat, profile} = this.props;
    const ownerId = paintingDetail[id] ? paintingDetail[id].owner : -1;
    let likeError = '';

    if (like_error && like_error.NUMBER_WRONG) {
        likeError = '点赞数必须在1到100之间的整数';
    }

    return (loaded) ? (
      <div>
        {(paintingDetail[id] ?
          <div><img src={paintingDetail[id].attachment}/>
            <h1>{ paintingDetail[id].title }</h1>
            {(paintingDetail[id].owner ?
            <Link to={'/p/'+ ownerId}>
              { profile[ownerId].nickname }
            </Link>
            :'')}
            <span>热度{Math.round(heat[id].point)}</span>
          </div>
          : '')}
        <form onSubmit={this.handleSubmit}>
          <div>
            <input type="number" ref="like_amount" placeholder="点赞数(1到100之间的整数)"/>
          </div>
          {likeError}
          <button onClick={this.handleSubmit}>Like
          </button>
        </form>
      </div> ) : (
      <div> Loading... </div> );
  }
}
