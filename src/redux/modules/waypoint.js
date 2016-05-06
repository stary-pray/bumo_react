import {handleActions, createAction} from "redux-actions";

const POSITION_CHANGE = 'bumo/waypoint/positionChange';
const ON_LEAVE ='bumo/waypoint/onLeave';

const initialState = {};

export default handleActions({
  [POSITION_CHANGE]: (state, action)=> action.payload,
}, initialState);


export const positionChange = createAction(POSITION_CHANGE);
