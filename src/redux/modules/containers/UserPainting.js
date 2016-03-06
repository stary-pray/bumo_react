import {handleActions} from 'redux-actions';

export const LOAD_USER_PAINTING = 'bumo/painting/LOAD_USER_PAINTING';
export const LOAD_USER_PAINTING_SUCCESS = 'bumo/painting/LOAD_USER_PAINTING_SUCCESS';
export const LOAD_USER_PAINTING_FAIL = 'bumo/painting/LOAD_USER_PAINTING_FAIL]';
export const GoNextUserPage = 'bumo/painting/GoNextUserPage';


export function loadUserPainting(ownerId, index) {
  return {
    types: [LOAD_USER_PAINTING, LOAD_USER_PAINTING_SUCCESS, LOAD_USER_PAINTING_FAIL],
    promise: (client) => client.get('/api/paintings?owner=' + ownerId+ '&page='+ index),
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
          return{
            ...state,
            loading:true
          };
    case LOAD_USER_PAINTING_SUCCESS:
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
    default:
      return state;
  }

}


