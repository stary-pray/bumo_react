import {createAction} from "redux-actions";
import * as UserPaintingAction from "../models/UserPainting";
import lodash from "lodash";


const INITIAL_USER_PAINTING = 'bumo/INITIAL_USER_PAINTING'
export const initialUserPainting = createAction(INITIAL_USER_PAINTING);

const initialState = {
  pageMeta: {
    current: 0,
    next: 1,
  },
  indexes: [],
  loaded: false,
  loading: false
};

const initialOrderUserPaintingState ={
  'Hot': initialState,
  'Latest': initialState,
  'Like' : initialState
};


function handleOrderUserPainting(state = initialState, action = {}) {
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
    case INITIAL_USER_PAINTING:
      return initialState
        ;
    default:
      return state;
  }

}

export default function reducer(state = initialOrderUserPaintingState, action){
  const newSubState = {};
  switch(action.type){
    case  UserPaintingAction.LOAD_USER_PAINTING_HOT:
    case UserPaintingAction.LOAD_USER_PAINTING_HOT_SUCCESS:
      newSubState['Hot'] = handleOrderUserPainting(state['Hot'], action);
      return lodash.assign(state, newSubState);
    case  UserPaintingAction.LOAD_USER_PAINTING:
    case UserPaintingAction.LOAD_USER_PAINTING_SUCCESS:
      newSubState['Latest'] = handleOrderUserPainting(state['Latest'], action);
      return lodash.assign(state, newSubState);
    case  UserPaintingAction.LOAD_USER_LIKED_PAINTING:
    case UserPaintingAction.LOAD_USER_LIKED_PAINTING_SUCCESS:
      newSubState['Like'] = handleOrderUserPainting(state['Like'], action);
      return lodash.assign(state, newSubState);
    case INITIAL_USER_PAINTING:
      newSubState['Hot'] = handleOrderUserPainting(state['Hot'], action);
      newSubState['Latest'] = handleOrderUserPainting(state['Latest'], action);
      newSubState['Like'] = handleOrderUserPainting(state['Like'], action);
      return lodash.assign(state, newSubState);

    default:
      return state;
  }
}

