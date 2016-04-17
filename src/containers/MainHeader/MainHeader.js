import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as containerAction from '../../redux/modules/containers/MainHeader';
import _ from 'lodash';
import './MainHeader.scss';

@connect(
  (state, ownProps) => ({
    component: state.containers.MainHeader,
    tagHeat: state.models.tagHeat,
    tagType: ownProps.tagType,
    tagName: ownProps.tagName,
  }),
  {
    searchFocus: containerAction.searchFocus,
    searchBlur: containerAction.searchBlur,
    searchInput: containerAction.searchInput,
  }
)

export default class TopNav extends Component {
  static propTypes = {
    tagHeat: PropTypes.object,
    tagType: PropTypes.string,
    tagName: PropTypes.string,
    component: PropTypes.object,

    searchFocus: PropTypes.func,
    searchBlur: PropTypes.func,
    searchInput: PropTypes.func,
  };

  constructor() {
    super();
    this.handleSearchFocus = this.handleSearchFocus.bind(this);
    this.handleSearchBlur = this.handleSearchBlur.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
  }

  handleSearchFocus() {
    if (!this.props.component.focus) {
      this.props.searchFocus();
    }
    this.refs.searchInput.focus();
  }

  handleSearchBlur() {
    if (this.props.component.focus) {
      this.props.searchBlur();
    }
  }

  handleSearchInput(e){
    this.props.searchInput(this.refs.searchInput.value)
  }

  render() {
    const {component} = this.props;
    const {focus, inputText} = component;
    console.log(focus, inputText);
    return <div id="main-header" className="grid-block">
      <div onClick={this.handleSearchFocus} id="search-bar" className="grid-content">
        <i className="zmdi zmdi-search"/>
        <input
          onFocus={this.handleSearchFocus}
          onBlur={this.handleSearchBlur}
          onChange={this.handleSearchInput}
          value={inputText}
          ref="searchInput"
          className="search-input"
          placeholder="搜索"
          type="text"/>
        {!focus &&
        <div className="searchLabel">
          <i className="zmdi zmdi-label"/>
          <span className="tagContent">
            <span className="name">萌</span>
            <span className="type">属性</span>
            <span className="heat"><i className="zmdi zmdi-fire"/> 31 </span>
          </span>
        </div>
        }
      </div>
      <div className="user-notification-panel grid-content shrink hide">
        <a href="">登录</a>
        <span className="secondary-color"> | </span>
        <a href="">注册</a>
      </div>
      <div className="user-notification-panel grid-content shrink">
        <a href="">秋肉</a>
        <span className="secondary-color"> | </span>
        <a href="">注销</a>
      </div>
    </div>
  }
}