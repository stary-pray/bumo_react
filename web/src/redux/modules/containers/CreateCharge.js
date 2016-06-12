export const CREATE_CHARGE = 'bumo/user/CREATE_CHARGE';
export const CREATE_CHARGE_SUCCESS = 'bumo/user/CREATE_CHARGE_SUCCESS';
export const CREATE_CHARGE_FAIL = 'bumo/user/CREATE_CHARGE_FAIL';

export function createCharge(data) {
  return {
    types: [CREATE_CHARGE, CREATE_CHARGE_SUCCESS, CREATE_CHARGE_FAIL],
    promise: (client) => client.post('/api/my/bumo-deposit/create_charge',{
      data:data}
    )
  };
}


import {handleActions} from "redux-actions";


export default handleActions({
  [CREATE_CHARGE]: (state, action) => ({
    ...state,
    creating: true
  }),
  [CREATE_CHARGE_SUCCESS]: (state, action) => ({
    ...state,
    create: true,
    creating: false,
    credential: action.result.charge_obj.credential
  }),
  [CREATE_CHARGE_FAIL]: (state, action) =>({
    ...state,
    create: false,
    creating: false
  })
}, {
  create: false,
  creating: true
});
