import {handleActions} from "redux-actions";
import * as MeActions from "../me";


export default handleActions({
  [MeActions.UPDATE]: (state) => state,
  [MeActions.UPDATE_SUCCESS]: (state, action) => ({
    profile_update:true,
    avatar_uploading: false,
    avatar_success: false
  }),
  [MeActions.UPDATE_FAIL]: (state, action) => ({
    error: action.error
  }),
  [MeActions.UPLOAD_AVATAR]: (state) => (
  {
    profile_update:false,
    avatar_uploading: true,
    avatar_success: false
  }
  ),
  [MeActions.UPLOAD_AVATAR_SUCCESS]: (state)=>(
  {
    profile_update:false,
    avatar_uploading: false,
    avatar_success: true
  }
  ),
  [MeActions.UPLOAD_BANNER]: (state) => (
  {
    profile_update:false,
    banner_uploading: true,
    banner_success: false
  }
  ),
  [MeActions.UPLOAD_BANNER_SUCCESS]: (state)=>(
  {
    profile_update:false,
    banner_uploading: false,
    banner_success: true
  }
  ),
  [MeActions.INITIAL_UPDATE_ME]:()=>({
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

