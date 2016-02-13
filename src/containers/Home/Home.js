import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {load as loadPainting} from 'redux/modules/models/Painting';
import {Link} from 'react-router';


@connect(
  state => ({
    painting: state.models.painting,
    profile: state.models.profile,
    heat: state.models.heat,
    component: state.containers.Home
  }),
  dispatch => bindActionCreators({
    loadPainting
  }, dispatch)
)

export default class Home extends Component {
  static propTypes = {
    painting: PropTypes.object,
    profile: PropTypes.object,
    heat: PropTypes.object,
    component: PropTypes.object,
    paintingDetail: PropTypes.object,
    loadPainting: PropTypes.func
  };

  componentWillMount() {
    this.props.loadPainting();
  }

  render() {
    const style = require('./Home.scss');
    const {painting, component} = this.props;
    console.log('component', component);
    return (<div>
      <h1>Home</h1>
      <p>Example for all paintings</p>
      <div className={style.PaintingInfo}>
        {component.loaded ?
          component.indexes.map((paintingId)=>(<div key={paintingId}>
            <Link to={'/painting/' + paintingId}><img src={painting[paintingId].attachment} />{ painting[paintingId].title }</Link>
          </div>)) :
          ''}
      </div>
    </div>);
  }
}

// onClick={() => this.props.loadPaintingDetail(paintingId)}
