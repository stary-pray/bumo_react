import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {browserHistory} from "react-router";
import "./SearchResult.scss";
import _ from "lodash";
import {resize} from "../../utils/common";
import SearchBar from "../../components/SearchBar/SearchBar";
import * as containerAction from "../../redux/modules/containers/SearchResult";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import onClickOutside from "react-onclickoutside";

const CDN_DOMAIN = 'http://7sbq0u.com1.z0.glb.clouddn.com/';

@connect(
  (state, ownProps) => ({
    component: state.containers.SearchResult
  }), {
    ...containerAction,
  }
)
@onClickOutside
export default class SearchResult extends Component {
  static propTypes = {
    component: PropTypes.object,

    searchFocus: PropTypes.func,
    searchBlur: PropTypes.func,
    searchInput: PropTypes.func,

    openSearch: PropTypes.func,
    closeSearch: PropTypes.func,
    doSearch: PropTypes.func,
  };

  constructor(){
    super();
    this.handleCloseSearch = this.handleCloseSearch.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  goToItem(item) {
    switch (item.modelType) {
      case 'Painting':
        browserHistory.push(`/p/${item.key}`);
        break;
      case 'PaintingTag':
        browserHistory.push(`/tag/${item.type}/${item.name}`);
        break;
      case 'Profile':
        browserHistory.push('/u/' + item.key);
    }
  }

  handleCloseSearch(){
    this.props.closeSearch();
  }

  handleClickOutside() {
    if (this.props.component.isOpened) {
      this.handleCloseSearch();
    }
  }

  renderOpened() {
    const {component} = this.props;
    const {isSearching, results, count} = component;
    const resultGroups = _.groupBy(results, 'modelType');
    return (<div className="SearchResult">
      <h4 className="SearchResultHeader">
        <span className="hint">搜索 {isSearching && <i className="zmdi zmdi-rotate-right zmdi-hc-spin"/>}</span>
        <span onClick={this.handleCloseSearch} className="close"><i className="zmdi zmdi-close"/></span>
      </h4>
      <SearchBar {...this.props} />
      {count == 0 ? <div>还没有相关的结果</div>:
        <div>
      { resultGroups.PaintingTag &&
      <div className="SearchResult_group">
        <label>标签</label>
        {resultGroups.PaintingTag.map((tag)=>
          <div onClick={()=>this.goToItem(tag)} className="SearchResult_item Tag" key={tag.key}>
            <div className="rightSide">
              <div className="main ellipses">{tag.name} : {tag.type}</div>
            </div>
          </div>
        )}
      </div>
      }
      { resultGroups.Painting &&
      <div className="SearchResult_group">
        <label>画作</label>
        {resultGroups.Painting.map((painting)=>
          <div onClick={()=>this.goToItem(painting)} className="SearchResult_item Painting" key={painting.key}>
            <div className="image">
              <img src={resize(CDN_DOMAIN + painting.attachment, 72)} alt={painting.title}/>
            </div>
            <div className="rightSide">
              <div className="main ellipses">{painting.title}</div>
            </div>
          </div>
        )}
      </div>
      }
      { resultGroups.Profile &&
      <div className="SearchResult_group">
        <label>用户</label>
        {resultGroups.Profile.map((profile)=>
          <div onClick={()=>this.goToItem(profile)} className="SearchResult_item Profile" key={profile.key}>
            <div className="image">
              <img src={resize(CDN_DOMAIN + profile.avatar, 72)} alt={profile.nickname}/>
            </div>
            <div className="rightSide">
              <div className="main ellipses">{profile.nickname}</div>
            </div>
          </div>
        )}
      </div>
      }</div>}

    </div>);
  }

  render(){
    const {component: {isOpened}} = this.props;
    return (
      <ReactCSSTransitionGroup
        transitionName="SearchResultTransition"
        transitionEnterTimeout={300}
        transitionLeaveTimeout={300}
      >
        {isOpened ? this.renderOpened() : ''}
      </ReactCSSTransitionGroup>);
  }
}
