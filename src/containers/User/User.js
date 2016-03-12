import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadUser} from 'redux/modules/containers/User';
import {Link} from 'react-router';
import PaintingInfo from 'components/PaintingInfo/PaintingInfo';

@connect(
  (state) => ({
    component: state.containers.User,
    user: state.models.profile,
    painting: state.models.painting,
    paintingHeat:state.models.paintingHeat
  }),
  dispatch => bindActionCreators({
    loadUser
  }, dispatch)
)


export default class Tags extends Component {
  static propTypes = {
    loadUser: PropTypes.func,
    loadUserPaintingHot: PropTypes.func,
    user: PropTypes.object,
    component: PropTypes.object,
    painting: PropTypes.object,
    paintingHeat: PropTypes.object,
  };

  componentWillMount() {
    this.props.loadUser();
  }


  render() {
    const {user, component,painting,paintingHeat} = this.props;
    return (<div className="User">
      <div> {component.loaded ?
        <div>
          { component.indexes.map((userId)=>
            <div key={"user"+userId}>
              <Link to={'/p/'+ userId}>
                <h1>{user[userId].nickname}</h1>
                <img src={user[userId].avatar}/>
              </Link>
              {component.hotPaintings[userId]? component.hotPaintings[userId].map(paintingId =>
                <PaintingInfo key={'painting' + paintingId} heat={paintingHeat[painting[paintingId].heat]} painting={painting[paintingId]}/>):''}
            </div>
          )}
        </div>
        : ''
      }
      </div>
    </div>);
  }
}
