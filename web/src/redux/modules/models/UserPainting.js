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
