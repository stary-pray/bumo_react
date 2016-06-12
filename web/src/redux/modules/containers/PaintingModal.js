import {handleActions, createAction} from "redux-actions";

const OPEN_MODAL = 'bumo/PaintingModal/open_modal';
const CLOSE_MODAL = 'bumo/PaintingModal/close_modal';
const CHANGE_ITEM = 'bumo/PaintingModal/change_item';
const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

const initialState = {
  id: null,
  indexes: null,
  isOpened: false,
};

export default handleActions({
  [OPEN_MODAL]: (state, action)=>({
    id: action.payload.id,
    indexes: action.payload.indexes,
    isOpened: true,
  }),
  [CLOSE_MODAL]: ()=> initialState,
  [CHANGE_ITEM]: (state, action)=> ({
    ...state,
    id: action.payload.id,
  }),
  [LOCATION_CHANGE]: ()=> initialState,

}, initialState);

export const openModal = createAction(OPEN_MODAL);
export const closeModal = createAction(CLOSE_MODAL);
export const changeItem = createAction(CHANGE_ITEM);
