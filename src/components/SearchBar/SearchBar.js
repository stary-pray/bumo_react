import React, {Component, PropTypes} from "react";
import _ from "lodash";

export default class SearchBar extends Component {
  static propTypes = {
    component: PropTypes.object,

    searchFocus: PropTypes.func,
    searchBlur: PropTypes.func,
    searchInput: PropTypes.func,

    doSearch: PropTypes.func,
  };

  constructor() {
    super();
    this.handleSearchFocus = this.handleSearchFocus.bind(this);
    this.handleSearchBlur = this.handleSearchBlur.bind(this);
    this.handleSearchInput = this.handleSearchInput.bind(this);
    this.debounceDoSearch = _.debounce((value)=> {
      if(value){
        this.props.doSearch(value);
      }
    }, 1500);
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
    this.debounceDoSearch(this.refs.searchInput.value);
  }
  
  render(){
    const {component} = this.props;
    const {isOpened, isSearching, results, inputText} = component;
    return (
      <div className="SearchBar">
        <i className="zmdi zmdi-search"/>
        <input
          onFocus={this.handleSearchFocus}
          onBlur={this.handleSearchBlur}
          onChange={this.handleSearchInput}
          value={inputText}
          ref="searchInput"
          className="search-input"
          type="text"/>
      </div>
    );
  }
}
