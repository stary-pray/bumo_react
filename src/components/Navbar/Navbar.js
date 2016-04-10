import React, {Component, PropTypes} from 'react';
import {IndexLink, Link} from 'react-router';
import InlineSVG from 'svg-inline-react';
import './Navbar.scss';

export default class Navbar extends Component {
  static propTypes = {
    me: PropTypes.object,
    loaded: PropTypes.bool,
    logout: PropTypes.func,
  };

  render() {
    const {logout, me, loaded} = this.props;
    const a = <div className="NavBar">
      <IndexLink to="/">首页</IndexLink>
      <Link to="/tags">标签</Link>
      <Link to="/user">热门用户</Link>
      { loaded ?
        <Link to="/me">{me.nickname}</Link> :
        <Link to="/login">登录</Link>
      }
      { loaded ?
        (<button onClick={logout} type="button" className="button">注销</button>) :
        ''
      }
    </div>;
    return (
      <nav id="nav-bar" className="grid-content shrink collapse">

        <IndexLink id="logo" to="/">
          <InlineSVG className="svg" src={require("./logo.svg")}/>
          <span className="title">星祈</span>
        </IndexLink>
        <section className="mono nav-section">
          <div className="nav-header">
            恋绘
          </div>
          <IndexLink activeClassName="active" className="nav-item" to="/">
            <i className="zmdi zmdi-compass"/>发现
          </IndexLink>
          <Link activeClassName="active" className="nav-item" to="/user">
            <i className="zmdi zmdi-palette"/>画手
          </Link>
          <Link activeClassName="active" className="nav-item" to="/tags">
            <i className="zmdi zmdi-label"/>标签
          </Link>
        </section>
        { loaded &&
        <section className="mono nav-section">
          <div className="nav-header"> 我的</div>
          <Link activeClassName="active" className="nav-item" to="/me">
            <i className="zmdi zmdi-account"/> 账户
          </Link>
        </section>
        }
        { loaded &&
        <section className="account-item">
          <a className="avatar">
            <img data-avatar="{{vm.me.data.avatar}}" ng-src="{{ vm.me.data.avatar | userAvatar }}" alt="avatar"/>
            <span className="text"> 账户 </span>
          </a>
        </section>
        }
        { !loaded &&
        <section className="account-item">
          <Link to="/login">登录</Link>
        </section>
        }
      </nav>
    );
  }
}
