import {handleActions} from 'redux-actions';
import _ from 'lodash';

import * as TagDetailActions from '../models/TagDetail';


const initialState = {
  pageMeta: {
    current: 0,
    next: 1,
  },
  indexes: [],
  loaded: false,
  loading: false
};


export default handleActions({
    [TagDetailActions.LOAD_TAG_PAINTING_DETAIL]: (state, action) => ({
      ...state,
      loading: true
    }),
    [TagDetailActions.LOAD_TAG_PAINTING_DETAIL_SUCCESS]: (state, action) => ({
      ...state,
      loaded: true,
      pageMeta: action.result,
      indexes: _.uniq([...state.indexes, ...action.normalized.result]),
      loading: false
    }),
    [TagDetailActions.LOAD_TAG_PAINTING_HOT_DETAIL]: (state, action) => ({
      ...state,
      loading: true
    }),
    [TagDetailActions.LOAD_TAG_PAINTING_HOT_DETAIL_SUCCESS]: (state, action) => ({   //[]是把字符串當做變量用
      ...state,
      loaded: true,
      pageMeta: action.result,
      indexes: _.uniq([...state.indexes, ...action.normalized.result]),
      loading: false
    }),
    ['@@router/LOCATION_CHANGE']: ()=>(initialState)
  },
  initialState);
