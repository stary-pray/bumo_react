import {handleActions} from 'redux-actions';
import * as authActions from './auth';

export const LOAD = 'bumo/me/LOAD';
export const LOAD_SUCCESS = 'bumo/me/LOAD_SUCCESS';
export const LOAD_FAIL = 'bumo/me/LOAD_FAIL';
export const UPDATE = 'bumo/me/UPDATE';
export const UPDATE_SUCCESS = 'bumo/me/UPDATE_SUCESS';
export const UPDATE_FAIL = 'bumo/me/UPDATE_FAIL';

export const UPLOAD_AVATAR = 'bumo/me/UPLOAD_AVATAR';
export const UPLOAD_AVATAR_SUCCESS = 'bumo/me/UPLOAD_AVATAR_SUCCESS';
export const UPLOAD_AVATAR_FAIL = 'bumo/me/UPLOAD_AVATAR_FAIL';


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

export function update(profile) {
  return {
    types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
    promise: (client) => client.put('/api/me', {
      data: profile
    })
  };
}

export function uploadAvatar(files){
  return {
    types: [UPLOAD_AVATAR, UPLOAD_AVATAR_SUCCESS, UPLOAD_AVATAR_FAIL],
    promise: (client) => client.put('/api/my/profile-upload?type=0&aaa=bbb&ccc=ddd', {
      data: files
    })
  };
}
