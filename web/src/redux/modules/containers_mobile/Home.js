import {handleActions} from "redux-actions";
import lodash from "lodash";
import * as PaintingActions from "../models/Painting";


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

const initialOrderPaintingState ={
  'Hot': initialState,
  'Latest': initialState
};

const handleOrderPainting = handleActions({
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
  })
}, initialState);


export default function reducer(state = initialOrderPaintingState, action){
  const newSubState = {};
  switch(action.type){
    case PaintingActions.LOAD_HOT:
    case PaintingActions.LOAD_HOT_SUCCESS:
      newSubState['Hot'] = handleOrderPainting(state['Hot'], action);
      return lodash.assign(state, newSubState);
    case PaintingActions.LOAD:
    case PaintingActions.LOAD_SUCCESS:
      newSubState['Latest'] = handleOrderPainting(state['Latest'], action);
      return lodash.assign(state, newSubState);
    default:
      return state;
  }
}
