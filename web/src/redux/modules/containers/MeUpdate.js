import {handleActions, createAction} from "redux-actions";
export const UPDATE = 'bumo/me/UPDATE';
export const UPDATE_SUCCESS = 'bumo/me/UPDATE_SUCESS';
export const UPDATE_FAIL = 'bumo/me/UPDATE_FAIL';

export const UPLOAD_AVATAR = 'bumo/me/UPLOAD_AVATAR';
export const UPLOAD_AVATAR_SUCCESS = 'bumo/me/UPLOAD_AVATAR_SUCCESS';
export const UPLOAD_AVATAR_FAIL = 'bumo/me/UPLOAD_AVATAR_FAIL';

export const UPLOAD_BANNER = 'bumo/me/UPLOAD_BANNER';
export const UPLOAD_BANNER_SUCCESS = 'bumo/me/UPLOAD_BANNER_SUCCESS';
export const UPLOAD_BANNER_FAIL = 'bumo/me/UPLOAD_BANNER_FAIL';
export const INITIAL_UPDATE_ME = 'bumo/me/INITIAL_UPDATE_ME';


export default handleActions({
  [UPDATE]: (state) => state,
  [UPDATE_SUCCESS]: (state, action) => ({
    profile_update:true,
    avatar_uploading: false,
    avatar_success: false
  }),
  [UPDATE_FAIL]: (state, action) => ({
    error: action.error
  }),
  [UPLOAD_AVATAR]: (state) => (
  {
    profile_update:false,
    avatar_uploading: true,
    avatar_success: false
  }
  ),
  [UPLOAD_AVATAR_SUCCESS]: (state)=>(
  {
    profile_update:false,
    avatar_uploading: false,
    avatar_success: true
  }
  ),
  [UPLOAD_BANNER]: (state) => (
  {
    profile_update:false,
    banner_uploading: true,
    banner_success: false
  }
  ),
  [UPLOAD_BANNER_SUCCESS]: (state)=>(
  {
    profile_update:false,
    banner_uploading: false,
    banner_success: true
  }
  ),
  [INITIAL_UPDATE_ME]:()=>({
    profile_update:false,
    avatar_uploading: false,
    banner_uploading: false
  }),
  ['@@router/LOCATION_CHANGE']: ()=>({
    profile_update:false,
    avatar_uploading: false,
    banner_uploading: false
  })
}, {
  profile_update:false,
  avatar_uploading: false,
  banner_uploading: false
});
export function update(profile) {
  return {
    types: [UPDATE, UPDATE_SUCCESS, UPDATE_FAIL],
    promise: (client) => client.put('/api/me', {
      data: profile
    })
  };
}

export function uploadAvatar(files) {
  return {
    types: [UPLOAD_AVATAR, UPLOAD_AVATAR_SUCCESS, UPLOAD_AVATAR_FAIL],
    promise: (client) => client.put('/api/my/profile-upload?type=0&aaa=bbb&ccc=ddd', {
      data: files
    })
  };
}
export function uploadBanner(files) {
  return {
    types: [UPLOAD_BANNER, UPLOAD_BANNER_SUCCESS, UPLOAD_BANNER_FAIL],
    promise: (client) => client.put('/api/my/profile-upload?type=1&aaa=bbb&ccc=ddd', {
      data: files
    })
  };
}
export const initialUpdateMe = createAction(INITIAL_UPDATE_ME);
