import {CHANGE_PAINTING_LIST_MODE} from "../preferences";
import {handleActions, createAction} from "redux-actions";

export const LOAD_PROFILE_DETAIL = 'bumo/painting/LOAD_PROFILE_DETAIL';
export const LOAD_PROFILE_DETAIL_SUCCESS = 'bumo/painting/LOAD_PROFILE_DETAIL_SUCCESS';
export const LOAD_PROFILE_DETAIL_FAIL = 'bumo/painting/LOAD_PROFILE_DETAIL_FAIL';

export const LOAD_USER_PAINTING = 'bumo/painting/LOAD_USER_PAINTING';
export const LOAD_USER_PAINTING_SUCCESS = 'bumo/painting/LOAD_USER_PAINTING_SUCCESS';
export const LOAD_USER_PAINTING_FAIL = 'bumo/painting/LOAD_USER_PAINTING_FAIL';

export const LOAD_USER_PAINTING_HOT = 'bumo/painting/LOAD_USER_PAINTING_HOT';
export const LOAD_USER_PAINTING_HOT_SUCCESS = 'bumo/painting/LOAD_USER_PAINTING_HOT_SUCCESS';
export const LOAD_USER_PAINTING_HOT_FAIL = 'bumo/painting/LOAD_USER_PAINTING_HOT_FAIL';

export const LOAD_USER_LIKED_PAINTING = 'bumo/painting/LOAD_USER_LIKED_PAINTING';
export const LOAD_USER_LIKED_PAINTING_SUCCESS = 'bumo/painting/LOAD_USER_LIKED_PAINTING_SUCCESS';
export const LOAD_USER_LIKED_PAINTING_FAIL = 'bumo/painting/LOAD_USER_LIKED_PAINTING_FAIL';
const LIST_MODE_DROPDOWN_CHANGE = 'cp/UserPainting/LIST_MODE_DROPDOWN_CHANGE';

export function loadProfileDetail(userId) {
  return {
    types: [LOAD_PROFILE_DETAIL, LOAD_PROFILE_DETAIL_SUCCESS, LOAD_PROFILE_DETAIL_FAIL],
    promise: (client) => client.get(`/api/profiles/${userId}`),
    normalizeSchema: 'profileDetail'
  };
}

export function loadUserPainting(ownerId, index) {
  return {
    types: [LOAD_USER_PAINTING, LOAD_USER_PAINTING_SUCCESS, LOAD_USER_PAINTING_FAIL],
    promise: (client) => client.get('/api/paintings?owner=' + ownerId + '&page=' + index),
    normalizeSchema: 'painting'
  };
}

export function loadUserPaintingHot(ownerId, index) {
  return {
    types: [LOAD_USER_PAINTING_HOT, LOAD_USER_PAINTING_HOT_SUCCESS, LOAD_USER_PAINTING_HOT_FAIL],
    promise: (client) => client.get('/api/paintings/hot?owner=' + ownerId + '&page=' + index),
    normalizeSchema: 'painting'
  };
}

export function loadUserLikedPainting(ownerId, index) {
  return {
    types: [LOAD_USER_LIKED_PAINTING,  LOAD_USER_LIKED_PAINTING_SUCCESS , LOAD_USER_LIKED_PAINTING_FAIL],
    promise: (client) => client.get('/api/paintings/liked?liked_owner=' + ownerId + '&page=' + index),
    normalizeSchema: 'painting'
  };
}
const initialState = {
  pageMeta: {
    current: 0,
    next: 1,
  },
  indexes: [],
  loaded: false,
  loading: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_USER_PAINTING:
    case LOAD_USER_PAINTING_HOT:
    case LOAD_USER_LIKED_PAINTING:
      return {
        ...state,
        loading: true
      };
    case LOAD_USER_PAINTING_SUCCESS:
    case LOAD_USER_PAINTING_HOT_SUCCESS:
    case LOAD_USER_LIKED_PAINTING_SUCCESS:
      return {
        ...state,
        loaded: true,
        pageMeta: action.result,
        indexes: [...state.indexes, ...action.normalized.result],
        loading: false
      };
    case LOAD_PROFILE_DETAIL_SUCCESS:
      return state;
    case LIST_MODE_DROPDOWN_CHANGE:
      return {
        ...state,
        isListModeDropdownOpened: action.payload
      };
    case CHANGE_PAINTING_LIST_MODE:
      return {
        ...state,
        isListModeDropdownOpened: false
      };
    case '@@router/LOCATION_CHANGE':
      return initialState
        ;
    default:
      return state;
  }

}

export const listModeDropdownChange = createAction(LIST_MODE_DROPDOWN_CHANGE);

