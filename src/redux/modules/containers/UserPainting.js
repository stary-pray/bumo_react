import {handleActions} from 'redux-actions';

export const LOAD_USER_PAINTING = 'bumo/painting/LOAD_USER_PAINTING';
export const LOAD_USER_PAINTING_SUCCESS = 'bumo/painting/LOAD_USER_PAINTING_SUCCESS';
export const LOAD_USER_PAINTING_FAIL = 'bumo/painting/LOAD_USER_PAINTING_FAIL]';


export function loadUserPainting(ownerId) {
  return {
    types: [LOAD_USER_PAINTING, LOAD_USER_PAINTING_SUCCESS, LOAD_USER_PAINTING_FAIL],
    promise: (client) => client.get('/api/paintings?owner=' + ownerId),
    normalizeSchema: 'painting'
  };
}

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_USER_PAINTING_SUCCESS:
      return {
        ...state,
        loaded: true,
        pageMeta: action.result,
        indexes: action.normalized.result
      };
    default:
      return state;
  }
}

