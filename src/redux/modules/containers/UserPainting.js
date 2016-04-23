export const LOAD_PROFILE_DETAIL = 'bumo/painting/LOAD_PROFILE_DETAIL';
export const LOAD_PROFILE_DETAIL_SUCCESS = 'bumo/painting/LOAD_PROFILE_DETAIL_SUCCESS';
export const LOAD_PROFILE_DETAIL_FAIL = 'bumo/painting/LOAD_PROFILE_DETAIL_FAIL';

export const LOAD_USER_PAINTING = 'bumo/painting/LOAD_USER_PAINTING';
export const LOAD_USER_PAINTING_SUCCESS = 'bumo/painting/LOAD_USER_PAINTING_SUCCESS';
export const LOAD_USER_PAINTING_FAIL = 'bumo/painting/LOAD_USER_PAINTING_FAIL';

export const LOAD_USER_PAINTING_HOT = 'bumo/painting/LOAD_USER_PAINTING_HOT';
export const LOAD_USER_PAINTING_HOT_SUCCESS = 'bumo/painting/LOAD_USER_PAINTING_HOT_SUCCESS';
export const LOAD_USER_PAINTING_HOT_FAIL = 'bumo/painting/LOAD_USER_PAINTING_HOT_FAIL';
export const GoNextUserPage = 'bumo/painting/GoNextUserPage';

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
    promise: (client) => client.get('/api/paintings?owner=' + ownerId+ '&page='+ index),
    normalizeSchema: 'painting'
  };
}

export function loadUserPaintingHot(ownerId, index) {
  return {
    types: [LOAD_USER_PAINTING_HOT, LOAD_USER_PAINTING_HOT_SUCCESS, LOAD_USER_PAINTING_HOT_FAIL],
    promise: (client) => client.get('/api/paintings/hot?owner=' + ownerId+ '&page='+ index),
    normalizeSchema: 'painting'
  };
}

const initialState = {
  page:1,
  loaded: false,
  loading: false,
  indexes:[]
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_USER_PAINTING:
    case LOAD_USER_PAINTING_HOT:
          return{
            ...state,
            loading:true
          };
    case LOAD_USER_PAINTING_SUCCESS:
    case LOAD_USER_PAINTING_HOT_SUCCESS:
      return {
        ...state,
        loaded: true,
        pageMeta: action.result,
        indexes: [...state.indexes,...action.normalized.result],
        loading:false
      };
    case LOAD_PROFILE_DETAIL_SUCCESS:
      return state;
    case GoNextUserPage:
          return{
            ...state,
            page: state.page + 1
          };
    case '@@router/LOCATION_CHANGE':
          return initialState
          ;
    default:
      return state;
  }

}


