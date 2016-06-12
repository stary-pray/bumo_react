import {handleActions, createAction} from "redux-actions";

export const CHANGE_PAINTING_LIST_MODE = 'bumo/preferences/change_painting_list_mode';

const initialState = {
  listMode: 'masonry', // masonry, card
};

export default handleActions({
  [CHANGE_PAINTING_LIST_MODE]: (state, action) => ({
    ...state,
    listMode: action.payload
  })
}, initialState);

export const changePaintingListMode = createAction(CHANGE_PAINTING_LIST_MODE);

