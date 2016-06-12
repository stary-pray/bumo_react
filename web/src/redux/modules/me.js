import {handleActions} from "redux-actions";
import * as authActions from "./auth";

export const LOAD = 'bumo/me/LOAD';
export const LOAD_SUCCESS = 'bumo/me/LOAD_SUCCESS';
export const LOAD_FAIL = 'bumo/me/LOAD_FAIL';

const initialState = {};

export default handleActions({
    [authActions.LOGOUT_SUCCESS]: (state) => initialState,
    [LOAD]: (state) => state,
    [LOAD_SUCCESS]: (state, action) => ({
      ...action.result
    })
  },
  initialState);

export function isLoaded(globalState) {
  return globalState && globalState.me.id;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/api/me')
  };
}

