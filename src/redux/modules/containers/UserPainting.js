import {handleActions} from 'redux-actions';

export const LOAD_USER_PAINTING = 'bumo/painting/LOAD_USER_PAINTING';
export const LOAD_USER_PAINTING_SUCCESS = 'bumo/painting/LOAD_USER_PAINTING_SUCCESS';
export const LOAD_USER_PAINTING_FAIL = 'bumo/painting/LOAD_USER_PAINTING_FAIL';
export const LOAD_USER_PAINTING_HOT = 'bumo/painting/LOAD_USER_PAINTING_HOT';
export const LOAD_USER_PAINTING_HOT_SUCCESS = 'bumo/painting/LOAD_USER_PAINTING_HOT_SUCCESS';
export const LOAD_USER_PAINTING_HOT_FAIL = 'bumo/painting/LOAD_USER_PAINTING_HOT_FAIL';
export const GoNextUserPage = 'bumo/painting/GoNextUserPage';


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
    case GoNextUserPage:
          return{
            ...state,
            page: state.page + 1
          };
    case '@@router/UPDATE_LOCATION':
          return initialState
          ;
    default:
      return state;
  }

}


