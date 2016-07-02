import {CHANGE_PAINTING_LIST_MODE} from "../preferences";
import {createAction} from "redux-actions";
import * as UserPaintingAction from "../models/UserPainting";


const LIST_MODE_DROPDOWN_CHANGE = 'cp/UserPainting/LIST_MODE_DROPDOWN_CHANGE';


const initialState = {
  pageMeta: {
    current: 0,
    next: 1,
  },
  indexes: [],
  loaded: false,
  loading: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UserPaintingAction.LOAD_USER_PAINTING:
    case UserPaintingAction.LOAD_USER_PAINTING_HOT:
    case UserPaintingAction.LOAD_USER_LIKED_PAINTING:
      return {
        ...state,
        loading: true
      };
    case UserPaintingAction.LOAD_USER_PAINTING_SUCCESS:
    case UserPaintingAction.LOAD_USER_PAINTING_HOT_SUCCESS:
    case UserPaintingAction.LOAD_USER_LIKED_PAINTING_SUCCESS:
      return {
        ...state,
        loaded: true,
        pageMeta: action.result,
        indexes: [...state.indexes, ...action.normalized.result],
        loading: false
      };
    case UserPaintingAction.LOAD_PROFILE_DETAIL_SUCCESS:
      return state;
    case LIST_MODE_DROPDOWN_CHANGE:
      return {
        ...state,
        isListModeDropdownOpened: action.payload
      };
    case CHANGE_PAINTING_LIST_MODE:
      return {
        ...state,
        isListModeDropdownOpened: false
      };
    case '@@router/LOCATION_CHANGE':
      return initialState
        ;
    default:
      return state;
  }

}

export const listModeDropdownChange = createAction(LIST_MODE_DROPDOWN_CHANGE);

