export const LOAD = 'bumo/painting/LOAD';
export const LOAD_SUCCESS = 'bumo/painting/LOAD_SUCCESS';
export const LOAD_FAIL = 'bumo/painting/LOAD_FAIL';

export const LOAD_HOT = 'bumo/painting/LOAD_HOT';
export const LOAD_HOT_SUCCESS = 'bumo/painting/LOAD_HOT_SUCCESS';
export const LOAD_HOT_FAIL = 'bumo/painting/LOAD_HOT_FAIL';


export function load(index) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/api/paintings?page=' + index),
    normalizeSchema: 'painting'
  };
}



export function loadHot(index){
  return{
    types: [LOAD_HOT, LOAD_HOT_SUCCESS, LOAD_HOT_FAIL],
    promise: (client) => client.get('/api/paintings/hot?page=' + index),
    normalizeSchema: 'painting'
  };
}
