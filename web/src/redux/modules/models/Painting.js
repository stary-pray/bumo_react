export const LOAD = 'bumo/painting/LOAD';
export const LOAD_SUCCESS = 'bumo/painting/LOAD_SUCCESS';
export const LOAD_FAIL = 'bumo/painting/LOAD_FAIL';

export const LOAD_HOT = 'bumo/painting/LOAD_HOT';
export const LOAD_HOT_SUCCESS = 'bumo/painting/LOAD_HOT_SUCCESS';
export const LOAD_HOT_FAIL = 'bumo/painting/LOAD_HOT_FAIL';


export const LOAD_TAG_TYPE_PAINTING = 'bumo/painting/ LOAD_TAG_TYPE_PAINTING';
export const LOAD_TAG_TYPE_PAINTING_SUCCESS = 'bumo/painting/ LOAD_TAG_TYPE_PAINTING_SUCCESS';
export const LOAD_TAG_TYPE_PAINTING_FAIL = 'bumo/painting/ LOAD_TAG_TYPE_PAINTING_FAIL';

export const LOAD_TAG_TYPE_PAINTING_HOT = 'bumo/painting/ LOAD_TAG_TYPE_PAINTING_HOT';
export const LOAD_TAG_TYPE_PAINTING_HOT_SUCCESS = 'bumo/painting/ LOAD_TAG_TYPE_PAINTING_HOT_SUCCESS';
export const LOAD_TAG_TYPE_PAINTING_HOT_FAIL= 'bumo/painting/ LOAD_TAG_TYPE_PAINTING_HOT_FAIL';

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





export function loadTagTypePainting(tagType,index) {
  return {
    tagType,
    types: [LOAD_TAG_TYPE_PAINTING,LOAD_TAG_TYPE_PAINTING_SUCCESS, LOAD_TAG_TYPE_PAINTING_FAIL],
    promise: (client) => client.get('/api/paintings/tag?page='+index+'&type='+tagType),
    normalizeSchema: 'painting'
  };
}


export function loadTagTypePaintingHot(tagType,index) {
  return {
    tagType,
    types: [LOAD_TAG_TYPE_PAINTING_HOT,LOAD_TAG_TYPE_PAINTING_HOT_SUCCESS, LOAD_TAG_TYPE_PAINTING_HOT_FAIL],
    promise: (client) => client.get('/api/paintings/tag?page='+index+'&type='+tagType+'&hot'),
    normalizeSchema: 'painting'
  };
}
