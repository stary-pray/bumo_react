import React, {Component, PropTypes} from 'react';
import {IndexLink, Link} from 'react-router';
import './Navbar.scss';

export default class Navbar extends Component {
  static propTypes = {
    me: PropTypes.object,
    loaded: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
  };

  render() {
    const {logout, me, loaded} = this.props;
    return (
      <div className="NavBar">
        <IndexLink to="/">首页</IndexLink>
        { loaded ?
          <Link to="/me">{me.nickname}</Link> :
          <Link to="/login">登录</Link>
        }
        { loaded ?
          (<button onClick={logout} type="button" className="button">注销</button>) :
          ''
        }
      </div>
    );
  }
}
