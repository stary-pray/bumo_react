import {handleActions, createAction} from "redux-actions";

const initialState = {
  id: null,
};

const OPEN_TAMASHI = 'bumo/TamashiPopup/OpenTamashi';
const CLOSE_TAMASHI = 'bumo/TamashiPopup/CloseTamashi';

export default handleActions({
  [OPEN_TAMASHI]: (state, action) => ({
    id: action.payload
  }),
  [CLOSE_TAMASHI]: state => initialState,
}, initialState);

export const openTamashi = createAction(OPEN_TAMASHI);
export const closeTamashi = createAction(CLOSE_TAMASHI);
