import {handleActions, createAction} from "redux-actions";
import lodash from "lodash";
import {CHANGE_PAINTING_LIST_MODE} from "../preferences";
import * as TagDetailActions from "../models/TagDetail";
const DROPDOWN_CHANGE = 'cp/tagTypeDetail/DROPDOWN_CHANGE';


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


export default handleActions({
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
    }),
    [DROPDOWN_CHANGE]: (state, action) => ({
      ...state,
      isDropdownOpened: action.payload,
    }),
    [CHANGE_PAINTING_LIST_MODE]: (state, action) => ({
      ...state,
      isDropdownOpened: false,
    }),
    ['@@router/LOCATION_CHANGE']: ()=>(initialState)
  },
  initialState);


export const dropdownChange = createAction(DROPDOWN_CHANGE);
