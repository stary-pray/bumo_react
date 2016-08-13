import {handleActions} from "redux-actions";
import lodash from "lodash";
import * as TagTypeDetaillActions from "../models/Painting";

const initialState = {
  pageMeta: {
    current: 0,
    next: 1,
  },
  indexes: [],
  loaded: false,
  loading: false,
};

const initialTypePaintingState = {
  '人物': initialState,
  '作品': initialState,
  '属性': initialState,
  '活动': initialState,
  '人物热门': initialState,
  '作品热门': initialState,
  '属性热门': initialState,
  '活动热门': initialState,
};


const handleTagTypePaintingDetails = handleActions({
    [TagTypeDetaillActions.LOAD_TAG_TYPE_PAINTING]: (state, action) => ({
      ...state,
      loading: true
    }),
    [TagTypeDetaillActions.LOAD_TAG_TYPE_PAINTING_SUCCESS]: (state, action) => ({
      ...state,
      loaded: true,
      pageMeta: action.result,
      indexes: lodash.uniq([...state.indexes, ...action.normalized.result]),
      loading: false
    }),
    [TagTypeDetaillActions.LOAD_TAG_TYPE_PAINTING_FAIL]: (state, action) => ({
      ...state,
      loading: false,
    }),
    [TagTypeDetaillActions.LOAD_TAG_TYPE_PAINTING_HOT]: (state, action) => ({
      ...state,
      loading: true
    }),
    [TagTypeDetaillActions.LOAD_TAG_TYPE_PAINTING_HOT_SUCCESS]: (state, action) => ({
      ...state,
      loaded: true,
      pageMeta: action.result,
      indexes: lodash.uniq([...state.indexes, ...action.normalized.result]),
      loading: false
    }),
    [TagTypeDetaillActions.LOAD_TAG_TYPE_PAINTING_HOT_FAIL]: (state, action) => ({
      ...state,
      loading: false,
    })
  },
  initialState);


export default function reducer(state = initialTypePaintingState, action){
  const newSubState = {};
  switch(action.type){
    case TagTypeDetaillActions.LOAD_TAG_TYPE_PAINTING:
    case TagTypeDetaillActions.LOAD_TAG_TYPE_PAINTING_SUCCESS:
    case TagTypeDetaillActions.LOAD_TAG_TYPE_PAINTING_FAIL:
      newSubState[action.tagType] = handleTagTypePaintingDetails(state[action.tagType], action);
      return lodash.assign(state, newSubState);
    case TagTypeDetaillActions.LOAD_TAG_TYPE_PAINTING_HOT:
    case TagTypeDetaillActions.LOAD_TAG_TYPE_PAINTING_HOT_SUCCESS:
    case TagTypeDetaillActions.LOAD_TAG_TYPE_PAINTING_HOT_FAIL:
      newSubState[action.tagType+'热门'] = handleTagTypePaintingDetails(state[action.tagType+'热门'], action);
      return lodash.assign(state, newSubState);
    default:
      return state;
  }
}
