import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as paintingActions from 'redux/modules/models/painting';

@connect(
  state => ({
    painting: state.models.painting,
    profile: state.models.profile,
    heat: state.models.heat,
    component: state.containers.Home,
  }),
  paintingActions)

export default class Home extends Component {
  static propTypes = {
    painting: PropTypes.object,
    profile: PropTypes.object,
    heat: PropTypes.object,
    component: PropTypes.object,
    load: PropTypes.func,
  };

  componentWillMount() {
    this.props.load();
  }

  render() {
    const style = require('./Home.scss');
    const {painting, component} = this.props;
    console.log('component', component);
    return (<div>
      <h1>Home</h1>
      <p>Example for all paintings</p>
      <div className={style.PaintingInfo}>
        { component.loaded ?
          component.indexes.map((paintingId)=>(<div key={paintingId}>
            { painting[paintingId].title }
          </div>)) :
          ''
        }
      </div>
    </div>);
  }
}
