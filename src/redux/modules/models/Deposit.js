export const GET_CHARGE = 'bumo/user/GET_CHARGE';
export const GET_CHARGE_SUCCESS = 'bumo/user/GET_CHARGE_SUCCESS';
export const GET_CHARGE_FAIL = 'bumo/user/GET_CHARGE_FAIL';

export const CHECK_CHARGE = 'bumo/user/CHECK_CHARGE';
export const CHECK_CHARGE_SUCCESS = 'bumo/user/CHECK_CHARGE_SUCCESS';
export const CHECK_CHARGE_FAIL = 'bumo/user/CHECK_CHARGE_FAIL';

export function getCharge(index) {
  return {
    types: [GET_CHARGE, GET_CHARGE_SUCCESS, GET_CHARGE_FAIL],
    promise: (client) => client.get('/api/my/bumo-deposit?page=' + index),
    normalizeSchema: 'deposit'
  };
}

export function checkCharge(depositId) {
  return {
    types: [CHECK_CHARGE, CHECK_CHARGE_SUCCESS, CHECK_CHARGE_FAIL],
    promise: (client) => client.get('/api/my/bumo-deposit/'+depositId+'/check_charge'),
  };
}


