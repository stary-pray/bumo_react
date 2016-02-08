export const LOAD = 'bumo/painting/LOAD';
export const LOAD_SUCCESS = 'bumo/painting/LOAD_SUCCESS';
export const LOAD_FAIL = 'bumo/painting/LOAD_FAIL';

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/api/paintings'),
    normalizeSchema: 'painting'
  };
}
