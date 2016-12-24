import {handleActions, createAction} from "redux-actions";

export const CREATE_CHARGE = 'bumo/user/CREATE_CHARGE';
export const CREATE_CHARGE_SUCCESS = 'bumo/user/CREATE_CHARGE_SUCCESS';
export const CREATE_CHARGE_FAIL = 'bumo/user/CREATE_CHARGE_FAIL';
export const CREATE_CHARGE_CANCEL = 'bumo/user/CREATE_CHARGE_CANCEL';
export const OPEN_CHARGE = 'bumo/user/OPEN_CHARGE';
export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE';

export function createCharge(data) {
  return {
    types: [CREATE_CHARGE, CREATE_CHARGE_SUCCESS, CREATE_CHARGE_FAIL],
    promise: (client) => client.post('/api/my/bumo-deposit/create_charge',{
      data:data}
    )
  };
}

export const cancelCreateCharge = createAction(CREATE_CHARGE_CANCEL);
export const openCharge = createAction(OPEN_CHARGE);


const initialState = {
  create: false,
  creating: false
};


export default handleActions({
  [OPEN_CHARGE]: (state, action) => ({
    ...state,
    creating: true
  }),
  [CREATE_CHARGE]: (state, action) => ({
    ...state,
    creating: true,
  }),
  [CREATE_CHARGE_SUCCESS]: (state, action) => ({
    ...state,
    id:action.result.id,
    create: true,
    creating: false,
    createTime: action.result.created,
    channel: action.result.charge_obj.channel,
    credential: action.result.charge_obj.credential
  }),
  [CREATE_CHARGE_FAIL]: (state, action) =>({
    ...state,
    error: action.error.err,
    create: false,
    creating: false
  }),
  [CREATE_CHARGE_CANCEL]:(state, action) => initialState,
}, initialState);
