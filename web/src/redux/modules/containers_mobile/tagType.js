import {handleActions} from "redux-actions";
import lodash from "lodash";
import * as TagDetailActions from "../models/TagDetail";
const INITIAL_TAG_TYPE = 'bumo/INITIAL_TAG_TYPE';

const initialState = {
  pageMeta: {
    current: 0,
    next: 1,
  },
  indexes: [],
  loaded: false,
  loading: false,
  isDropdownOpened: false,
};

const initialTypeState = {
  'all': initialState,
  '人物': initialState,
  '作品': initialState,
  '属性': initialState,
  '活动': initialState,
};

//export const initialTagType = createAction(INITIAL_TAG_TYPE);

const handleTagTypeDetails = handleActions({
    [TagDetailActions.LOAD_TAG_TYPE_DETAIL]: (state, action) => ({
      ...state,
      loading: true
    }),
    [TagDetailActions.LOAD_TAG_TYPE_DETAIL_SUCCESS]: (state, action) => ({
      ...state,
      loaded: true,
      pageMeta: action.result,
      indexes: lodash.uniq([...state.indexes, ...action.normalized.result]),
      loading: false
    }),
    [TagDetailActions.LOAD_TAG_TYPE_DETAIL_FAIL]: (state, action) => ({
      ...state,
      loading: false,
    })
  },
  initialState);


export default function reducer(state = initialTypeState, action){
  switch(action.type){
    case TagDetailActions.LOAD_TAG_TYPE_DETAIL:
    case TagDetailActions.LOAD_TAG_TYPE_DETAIL_SUCCESS:
    case TagDetailActions.LOAD_TAG_TYPE_DETAIL_FAIL:
      const newSubState = {};
      newSubState[action.tagType] = handleTagTypeDetails(state[action.tagType], action);
      return lodash.assign(state, newSubState);
    default:
      return state;
  }
}
