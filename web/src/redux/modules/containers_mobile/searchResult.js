import {handleActions} from "redux-actions";

const DO_SEARCH = 'bumo/SearchResult/do_search';
const DO_SEARCH_SUCCESS = 'bumo/SearchResult/do_search_success';
const DO_SEARCH_FAIL = 'bumo/SearchResult/do_search_fail';

const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

const initialState = {
  isSearching: false,
  results: [],
  count:null
};

export default handleActions({
  [DO_SEARCH]: (state) => ({
    ...state,
    isSearching: true,
  }),
  [DO_SEARCH_SUCCESS]: (state, action)=> ({
    ...state,
    isSearching: false,
    results: action.result.results,
    count: action.result.count
  })
}, initialState);

export function doSearch(text) {
  return {
    types: [DO_SEARCH, DO_SEARCH_SUCCESS, DO_SEARCH_FAIL],
    promise: (client) => client.get('/api/public/search?text=' + text)
  };
}
