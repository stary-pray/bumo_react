import {handleActions, createAction} from "redux-actions";

const initialState = {
  id: null,
  isOpened: false
};

export const OPEN_PAY_CHARGE= 'bumo/OpenCharge';
export const CLOSE_PAY_CHARGE = 'bumo/CloseCharge';
export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

export default handleActions({
  [OPEN_PAY_CHARGE]: (state, action) => ({
    id: action.payload,
    isOpened: true,
    link: action.link
  }),
  [CLOSE_PAY_CHARGE]: state => initialState,
  [LOCATION_CHANGE]: ()=> initialState,
}, initialState);

export function openPayCharge(link) {
  return {
    type: OPEN_PAY_CHARGE,
    link
  };
}
export const closePayCharge = createAction(CLOSE_PAY_CHARGE);
