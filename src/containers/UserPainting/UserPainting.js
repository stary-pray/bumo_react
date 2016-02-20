import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadUserPainting} from 'redux/modules/containers/UserPainting';
import {Link} from 'react-router';
import '../Home/Home.scss';


@connect(
  (state, ownProps) => ({
    userPainting: state.models.painting,
    profile: state.models.profile,
    heat: state.models.heat,
    id: +ownProps.params.ownerId,
    component: state.containers.UserPainting

  }),
  dispatch => bindActionCreators({
    loadUserPainting
  }, dispatch)
)

export default class UserPainting extends Component {
  static propTypes = {
    id: PropTypes.number,
    userPainting: PropTypes.object,
    profile: PropTypes.object,
    heat: PropTypes.object,
    loadUserPainting: PropTypes.func,
    component: PropTypes.object
  };

  componentWillMount() {
    this.props.loadUserPainting(this.props.id);
  }

  render() {
    const {userPainting, component} = this.props;
    console.log('component', component);
    return (<div className="Home">
      <h1>H</h1>
      <p>Example for all paintings</p>
      <div className="paintingInfo">
        {component.loaded ?
          component.indexes.map((paintingId)=>(
            <div className="paintings" key={paintingId}>
              <Link to={'/painting/' + paintingId}>
                <img src={userPainting[paintingId].attachment}/>
                { userPainting[paintingId].title }
              </Link>
            </div>)) :
          ''}
      </div>
    </div>);
  }
}
