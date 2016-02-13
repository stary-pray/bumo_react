import {handleActions} from 'redux-actions';
import * as authActions from './auth';

export const LOAD = 'bumo/me/LOAD';
export const LOAD_SUCCESS = 'bumo/me/LOAD_SUCCESS';
export const LOAD_FAIL = 'bumo/me/LOAD_FAIL';


export default handleActions({
  [authActions.LOGOUT_SUCCESS]: (state) => ({}),
  [LOAD]: (state) => state,
  [LOAD_SUCCESS]: (state, action) => ({
    ...action.result
  }),
  [LOAD_FAIL]: (state) => state,
}, {});

export function isLoaded(globalState) {
  return globalState.me.id;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/api/me')
  };
}

