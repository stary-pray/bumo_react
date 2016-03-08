import {handleActions} from 'redux-actions';

import * as TagDetailActions from '../models/TagDetail';

export const GoNextTagPage= 'bumo/painting/GoNextTagPage';


export default handleActions({
  [TagDetailActions.LOAD_TAG_DETAIL]: (state) => ({
    ...state,
    tagLoaded: false
  }),
  [TagDetailActions.LOAD_TAG_DETAIL_SUCCESS]: (state, action) => ({
    ...state,
    tagLoaded: true,
    tagId: action.normalized.result
  }),
  [TagDetailActions.LOAD_TAG_PAINTING_DETAIL_SUCCESS]: (state, action) => ({
    ...state,
    paintingLoaded: true,
    pageMeta: action.result,
    indexes: [...state.indexes, ...action.normalized.result],
    paintingLoading: false
  }),
  [TagDetailActions.LOAD_TAG_PAINTING_DETAIL]: (state, action) => ({
    ...state,
    paintingLoading: true
  }),
  [GoNextTagPage]: (state, action) =>({
    ...state,
    page: state.page + 1
  }),
  ['@@router/UPDATE_LOCATION']:()=>({
    tagLoaded: false,
    paintingLoaded: false,
    page: 1,
    indexes: []
  })
},
  {
  tagLoaded: false,
  paintingLoaded: false,
  page: 1,
  indexes: []
});

