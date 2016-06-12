import {handleActions, createAction} from "redux-actions";

const initialState = {
  id: null,
  type: '', // paid, free
  hoverAmount: 0,
};

const OPEN_TAMASHI = 'bumo/TamashiPopup/OpenTamashi';
const CLOSE_TAMASHI = 'bumo/TamashiPopup/CloseTamashi';
const HOVER_ON_BUTTON = 'bumo/TamashiPopup/HoverOnButton';

export default handleActions({
  [OPEN_TAMASHI]: (state, action) => ({
    id: action.payload
  }),
  [CLOSE_TAMASHI]: state => initialState,
  [HOVER_ON_BUTTON]: (state, action) => ({
    ...state,
    ...action.payload,
  })
}, initialState);

export const openTamashi = createAction(OPEN_TAMASHI);
export const closeTamashi = createAction(CLOSE_TAMASHI);
export const hoverButton = createAction(HOVER_ON_BUTTON);
