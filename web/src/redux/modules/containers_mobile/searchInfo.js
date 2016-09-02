
const LOG_SEARCH = 'bumo/LOG_SEARCH';

const initialState = {
};

export default function searchInfo(state = initialState, action) {
  switch (action.type) {
    case LOG_SEARCH:
      return {...state, searchResult: action.searchResult};
    default:
      return state;

  }

}
export function logSearch(searchResult) {
  return {
    type:LOG_SEARCH,
    searchResult
  };
}

