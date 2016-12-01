export const LOAD_USER = 'bumo/painting/LOAD_USER';
export const LOAD_USER_SUCCESS = 'bumo/painting/LOAD_USER_SUCCESS';
export const LOAD_USER_FAIL = 'bumo/painting/LOAD_USER_FAIL';



export function loadUser(index) {
  return {
    types: [LOAD_USER, LOAD_USER_SUCCESS, LOAD_USER_FAIL],
    promise: (client) => client.get('/api/profiles/painter?page=' + index),
    normalizeSchema: 'profile'
  };
}
