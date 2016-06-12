import {handleActions, createAction} from "redux-actions";

const OPEN_SEARCH = 'bumo/SearchResult/open_search';
const CLOSE_SEARCH = 'bumo/SearchResult/close_search';

const DO_SEARCH = 'bumo/SearchResult/do_search';
const DO_SEARCH_SUCCESS = 'bumo/SearchResult/do_search_success';
const DO_SEARCH_FAIL = 'bumo/SearchResult/do_search_fail';

export const SEARCH_FOCUS = 'bumo/main_header/search_focus';
export const SEARCH_BLUR = 'bumo/main_header/search_blur';
export const SEARCH_INPUT = 'bumo/main_header/search_input';

const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

const initialState = {
  isOpened: true,
  isSearching: false,
  focus: false,
  inputText: '',
  results: [],
  count:null
};

export default handleActions({
  [SEARCH_FOCUS]: (state) => ({
    ...state,
    focus: true,
  }),
  [SEARCH_BLUR]: (state) => ({
    ...state,
    focus: false,
  }),
  [SEARCH_INPUT]: (state, action) => ({
    ...state,
    focus: true,
    inputText: action.payload,
  }),
  [DO_SEARCH]: (state) => ({
    ...state,
    isSearching: true,
  }),
  [DO_SEARCH_SUCCESS]: (state, action)=> ({
    ...state,
    isSearching: false,
    results: action.result.results,
    count: action.result.count
  }),
  [OPEN_SEARCH]: (state) => ({
    ...state,
    isOpened: true,
  }),
  [CLOSE_SEARCH]: (state) => ({
    ...state,
    isOpened: false,
    count:null
  }),
  [LOCATION_CHANGE]: (state) => ({
    ...state,
    isOpened: false,
  }),
}, initialState);

export const openSearch = createAction(OPEN_SEARCH);
export const closeSearch = createAction(CLOSE_SEARCH);

export const searchFocus = createAction(SEARCH_FOCUS);
export const searchBlur = createAction(SEARCH_BLUR);
export const searchInput = createAction(SEARCH_INPUT);

export function doSearch(text) {
  return {
    types: [DO_SEARCH, DO_SEARCH_SUCCESS, DO_SEARCH_FAIL],
    promise: (client) => client.get('/api/public/search?text=' + text)
  };
}
