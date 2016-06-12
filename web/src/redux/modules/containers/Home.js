import {handleActions, createAction} from "redux-actions";
import _ from "lodash";
import * as PaintingActions from "../models/Painting";
import {CHANGE_PAINTING_LIST_MODE} from "../preferences";

const routeChange = '@@router/LOCATION_CHANGE';
const LIST_MODE_DROPDOWN_CHANGE = 'cp/home/LIST_MODE_DROPDOWN_CHANGE';

const initialState = {
  pageMeta: {
    current: 0,
    next: 1,
  },
  indexes: [],
  loaded: false,
  loading: false,
  isListModeDropdownOpened: false,
};

export default handleActions({
  [PaintingActions.LOAD_HOT]: (state, action) => ({
    ...state,
    loading: true
  }),
  [PaintingActions.LOAD_HOT_SUCCESS]: (state, action) => ({
    ...state,
    loaded: true,
    pageMeta: action.result,
    indexes: _.uniq([...state.indexes, ...action.normalized.result]),
    loading: false
  }),
  [PaintingActions.LOAD]: (state, action) => ({
    ...state,
    loading: true
  }),
  [PaintingActions.LOAD_SUCCESS]: (state, action) => ({
    ...state,
    loaded: true,
    loading: false,
    pageMeta: action.result,
    indexes: _.uniq([...state.indexes, ...action.normalized.result])
  }),
  [LIST_MODE_DROPDOWN_CHANGE]: (state, action) => ({
    ...state,
    isListModeDropdownOpened: action.payload
  }),
  [CHANGE_PAINTING_LIST_MODE]: (state, action) => ({
    ...state,
    isListModeDropdownOpened: false,
  }),
  [routeChange]: (state) => initialState
}, initialState);

export const listModeDropdownChange = createAction(LIST_MODE_DROPDOWN_CHANGE);

