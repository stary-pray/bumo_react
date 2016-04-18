import {handleActions} from 'redux-actions';

import * as TagDetailActions from '../models/TagDetail';

export const GoNextTagPage = 'bumo/painting/GoNextTagPage';


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
      tagLoaded: true,
      paintingLoaded: true,
      pageMeta: action.result,
      indexes: [...state.indexes, ...action.normalized.result],
      loading: false
    }),
    [TagDetailActions.LOAD_TAG_PAINTING_DETAIL]: (state, action) => ({
      ...state,
      loading: true
    }),
    [TagDetailActions.LOAD_TAG_PAINTING_HOT_DETAIL_SUCCESS]: (state, action) => ({   //[]是把字符串當做變量用
      ...state,
      paintingLoaded: true,
      pageMeta: action.result,
      indexes: [...state.indexes, ...action.normalized.result],
      loading: false
    }),
    [TagDetailActions.LOAD_TAG_TYPE_DETAIL]: (state, action) => ({
      ...state,
      loading: true
    }),
    [TagDetailActions.LOAD_TAG_TYPE_DETAIL_SUCCESS]: (state, action) => ({   //[]是把字符串當做變量用
      ...state,
      paintingLoaded: true,
      tagLoaded: true,
      pageMeta: action.result,
      indexes: [...state.indexes, ...action.normalized.result],
      loading: false
    }),
    [TagDetailActions.LOAD_TAG_TYPE_DETAIL_FAIL]: (state, action) => ({
      ...state,
      tagLoaded: false,
      loading: false,
      paintingLoaded: false
    }),
    [TagDetailActions.LOAD_TAG_NAME_DETAIL]: (state, action) => ({
      ...state,
      loading: true
    }),
    [TagDetailActions.LOAD_TAG_NAME_DETAIL_SUCCESS]: (state, action) => ({   //[]是把字符串當做變量用
      ...state,
      paintingLoaded: true,
      tagLoaded: true,
      pageMeta: action.result,
      indexes: [...state.indexes, ...action.normalized.result],
      loading: false
    }),
    [TagDetailActions.LOAD_TAG_NAME_DETAIL_FAIL]: (state, action) => ({
      ...state,
      tagLoaded: false,
      loading: false,
      paintingLoaded: false
    }),
    [GoNextTagPage]: (state, action) =>({
      ...state,
      page: state.page + 1
    }),
    ['@@router/LOCATION_CHANGE']: ()=>({
      tagLoaded: false,
      paintingLoaded: false,
      page: 1,
      indexes: []
    })
  },
  {
    loading: false,
    tagLoaded: false,
    paintingLoaded: false,
    page: 1,
    indexes: []
  });

