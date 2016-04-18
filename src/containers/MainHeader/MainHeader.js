import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import * as containerAction from '../../redux/modules/containers/MainHeader';
import _ from 'lodash';
import './MainHeader.scss';

@connect(
  (state, ownProps) => ({
    component: state.containers.MainHeader,
    tagHeat: state.models.tagHeat,
    tags: state.models.tags,
    paintingId: ownProps.routeParams.paintingId,
    tagType: ownProps.routeParams.tagType,
    tagName: ownProps.routeParams.tagName,
  }),
  {
    searchFocus: containerAction.searchFocus,
    searchBlur: containerAction.searchBlur,
    searchInput: containerAction.searchInput,
  }
)

export default class TopNav extends Component {
  static displayName = 'TopNav';

  static propTypes = {
    tagHeat: PropTypes.object,
    tags: PropTypes.object,
    tagType: PropTypes.string,
    tagName: PropTypes.string,
    component: PropTypes.object,
    paintingId: PropTypes.string,

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

  handleSearchInput(e) {
    this.props.searchInput(this.refs.searchInput.value);
  }

  render() {
    const {component, tagType, tagName, tagHeat, tags, paintingId} = this.props;
    const tag = _.find(tags, {type: tagType, name: tagName});
    const paintingPage = paintingId ? 'paintingPage' : '';
    if (tag) {
      tag.heat = _.find(tagHeat, {id: tag.heat});
    }
    const {focus, inputText} = component;
    return (<div id="main-header" className={`grid-block ${paintingPage}` }>
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
        { tagType && tagName && tag &&
        <div className="searchLabel">
          <i className="zmdi zmdi-label"/>
            <span className="tagContent">
              <span className="name">{tag.name}</span>
              <span className="type">{tag.type}</span>
              <span className="heat"><i className="zmdi zmdi-fire"/> {tag.heat && Math.round(tag.heat.point)} </span>
            </span>
        </div>
        }
        { tagType && !tagName &&
        <div className="searchLabel">
          <i className="zmdi zmdi-labels"/>
            <span className="tagContent">
              <span className="type">{tagType}</span>
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
    </div>);
  }
}
