/**
 * Created by akistar on 16/2/10.
 */
import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {load as loadPaintingDetail} from 'redux/modules/models/PaintingDetail';
import {like as likePainting} from 'redux/modules/models/Like';
import {Link} from 'react-router';
import moment from 'moment';
import {createNotification, createNotificationSuccess} from 'redux/modules/notification';

moment.locale('zh-cn');
const calculateHeat = (last_heat,last_time,like_amount=0) =>{
  const q = 0.5**((+Date.now()- +new Date(last_time))/(14*24*60*60*1000));
  console.log(+Date.now()- +new Date(last_time));
  return Math.round((last_heat+like_amount)*q);
};

@connect(
  (state, ownProps) => ({
    paintingDetail: state.models.paintingDetail,
    profile: state.models.profile,
    heat: state.models.heat,
    component: state.containers.PaintingDetail,
    id: +ownProps.params.paintingId,
    likeComponent: state.containers.Like,
    tags: state.models.tags
  }),
  dispatch => bindActionCreators({
    loadPaintingDetail,
    likePainting,
    createNotification,
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
    likeComponent: PropTypes.object,
    tags: PropTypes.object,
    createNotification: PropTypes.func
  };


  componentWillMount() {
    this.props.loadPaintingDetail(this.props.id);


  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.props);
    const like_amount = this.refs.like_amount;
    this.props.likePainting(this.props.id, like_amount.value);
    like_amount.value = '';
  }

  render() {
    const {loaded: loaded} = this.props.component;
    const {like_error, like_success, like_amount} = this.props.likeComponent;
    const {paintingDetail, id, heat, profile, tags} = this.props;
    const ownerId = paintingDetail[id] ? paintingDetail[id].owner : -1;
    const tagsArray = paintingDetail[id] ? paintingDetail[id].tags : [];
    let likeError = '';

    if (like_error && like_error.NUMBER_WRONG) {
      likeError = '点赞数必须在1到100之间的整数';
    }
    if (like_error && like_error ==='Not enough QB') {
      likeError = '钱数不够';
    }

    return (loaded) ? (
      <div>
        {(paintingDetail[id] ?
          <div><img src={paintingDetail[id].attachment}/>
            <h1>{ paintingDetail[id].title }</h1>
            {(paintingDetail[id].owner ?
              <Link to={'/p/'+ ownerId}>
                <img src={profile[ownerId].avatar}/>
                { profile[ownerId].nickname }
              </Link>
              : '')}
            <label>标签</label>
            {(paintingDetail[id].tags ?
              tagsArray.map((id) => (
                <div key={'tags' + id}>
                  <p>{tags[id].name}</p>
                </div>)) :
              '')}
            <span>热度{calculateHeat(heat[id].point, heat[id].modified,like_amount)}</span>
            <p>时间{moment(paintingDetail[id].modified).fromNow()}</p>
          </div>
          : '')}
        <form onSubmit={this.handleSubmit}>
          <div>
            <input type="number" ref="like_amount" placeholder="点赞数(1到100之间的整数)"/>
          </div>
          {like_success ?  this.props.createNotification({
            message: <div>给{paintingDetail[id].title}点了{like_amount}个赞</div>,
            level: 'success'
          }):''}
          {likeError}
          <button onClick={this.handleSubmit}>Like
          </button>
        </form>
      </div> ) : (
      <div> Loading... </div> );
  }
}
