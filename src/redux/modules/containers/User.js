import {handleActions} from 'redux-actions';


export const LOAD_USER = 'bumo/painting/LOAD_USER';
export const LOAD_USER_SUCCESS = 'bumo/painting/LOAD_USER_SUCCESS';
export const LOAD_USER_FAIL = 'bumo/painting/LOAD_USER_FAIL';


export function loadUser() {
  return {
    types: [LOAD_USER, LOAD_USER_SUCCESS, LOAD_USER_FAIL],
    promise: (client) => client.get('/api/profiles'),
    normalizeSchema: 'profile'
  };
}


export default handleActions({
  [LOAD_USER]: (state, action) => ({
    ...state,
    loading: true
  }),
  [LOAD_USER_SUCCESS]: (state, action) => ({
    ...state,
    loaded: true,
    loading: false,
    pageMeta: action.result,
    indexes: action.normalized.result
  })
}, {
  loaded: false,
  loading: false
});
