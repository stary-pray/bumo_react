import {handleActions} from 'redux-actions';

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
    ['@@router/LOCATION_CHANGE']: ()=>(initialState)
  },
 initialState);

