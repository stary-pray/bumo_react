import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {IndexLink, Link} from "react-router";
import InlineSVG from "svg-inline-react";
import {openSearch} from "../../redux/modules/containers/SearchResult";
import "./MainHeader.scss";

@connect(
  (state, ownProps) => ({
    component: state.containers.MainHeader,
  }),
  {
    openSearch: openSearch,
  }
)

export default class TopNav extends Component {
  static propTypes = {
    component: PropTypes.object,
    openSearch: PropTypes.func,
  };

  constructor() {
    super();
    this.handleOpenSearch = this.handleOpenSearch.bind(this);
  }
  
  handleOpenSearch(){
    this.props.openSearch();
  }

  render() {
    return (<div id="main-header">
      <IndexLink className="logo" to="/">
        <InlineSVG className="svg" src={require("./bumo_logo.svg")}/>
      </IndexLink>
      <section className="mono nav-section">
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
      <div className="user-notification-panel grid-content hide">
        <a href="">登录</a>
        <span className="secondary-color"> | </span>
        <a href="">注册</a>
      </div>
      <div className="user-notification-panel grid-content">
        <span className="item"><i className="zmdi zmdi-account"/> 秋肉</span>
        <span className="item"><i className="zmdi zmdi-power-off"/> 注销</span>
        <span onClick={this.handleOpenSearch} className="item"><i className="zmdi zmdi-search"/> 搜索</span>
      </div>
    </div>);
  }
}
