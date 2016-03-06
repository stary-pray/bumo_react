import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {loadUser} from 'redux/modules/containers/User';
import {Link} from 'react-router';

@connect(
  (state) => ({
    component: state.containers.User,
    user: state.models.profile
  }),
  dispatch => bindActionCreators({
    loadUser
  }, dispatch)
)


export default class Tags extends Component {
  static propTypes = {
    loadUser: PropTypes.func,
    user: PropTypes.object,
    component: PropTypes.object
  };

  componentWillMount() {
    this.props.loadUser();
  }

  render() {
    const {user, component} = this.props;
    return (<div className="User">
      <div> {component.loaded ?
        <div>
          { component.indexes.map((userId)=>
            <div key={"user"+userId}>
              <Link to={'/p/'+ userId}>
                <h1>{user[userId].nickname}</h1>
                <img src={user[userId].avatar}/>
              </Link>
            </div>
          )}
        </div>
        : ''
      }
      </div>
    </div>);
  }
}
