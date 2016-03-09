import {handleActions} from 'redux-actions';


export const LOAD_USER = 'bumo/painting/LOAD_USER';
export const LOAD_USER_SUCCESS = 'bumo/painting/LOAD_USER_SUCCESS';
export const LOAD_USER_FAIL = 'bumo/painting/LOAD_USER_FAIL';

export const LOAD_USER_SIM_PAINTING_HOT = 'bumo/painting/LOAD_USER_SIM_PAINTING_HOT';
export const LOAD_USER_SIM_PAINTING_HOT_SUCCESS = 'bumo/painting/LOAD_USER_SIM_PAINTING_HOT_SUCCESS';
export const LOAD_USER_SIM_PAINTING_HOT_FAIL = 'bumo/painting/LOAD_USER_SIM_PAINTING_HOT_FAIL';


export function loadUserPaintingHot(ownerId) {
  return {
    types: [LOAD_USER_SIM_PAINTING_HOT, LOAD_USER_SIM_PAINTING_HOT_SUCCESS, LOAD_USER_SIM_PAINTING_HOT_FAIL],
    promise: (client) => client.get('/api/paintings/hot?owner=' + ownerId),
    normalizeSchema: 'painting',
    meta: {
      ownerId: ownerId
    }
  };
}


export function loadUser() {
  return {
    types: [LOAD_USER, LOAD_USER_SUCCESS, LOAD_USER_FAIL],
    promise: (client) => client.get('/api/profiles'),
    normalizeSchema: 'profile'
  };
}


export default handleActions({
  [LOAD_USER]: (state, action) => ({
    ...state,
    loading: true
  }),
  [LOAD_USER_SUCCESS]: (state, action) => ({
    ...state,
    loaded: true,
    loading: false,
    pageMeta: action.result,
    indexes: action.normalized.result
  }),
  [LOAD_USER_SIM_PAINTING_HOT_SUCCESS]: (state, action) => ({
    ...state,
    hotPaintings: {
      ...state.hotPaintings,
      [action.meta.ownerId]: action.normalized.result,
    }
  })
}, {
  loaded: false,
  loading: false,
  hotPaintings: {}
});
