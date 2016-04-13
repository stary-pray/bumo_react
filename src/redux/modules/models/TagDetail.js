export const LOAD_TAG_DETAIL = 'bumo/painting/LOAD_TAG_DETAIL';
export const LOAD_TAG_DETAIL_SUCCESS = 'bumo/painting/LOAD_TAG_DETAIL_SUCCESS';
export const LOAD_TAG_DETAIL_FAIL = 'bumo/painting/LOAD_TAG_DETAIL_FAIL';
export const LOAD_TAG_PAINTING_DETAIL = 'bumo/painting/LOAD_TAG_PAINTING_DETAIL';
export const LOAD_TAG_PAINTING_DETAIL_SUCCESS = 'bumo/painting/LOAD_TAG_PAINTING_DETAIL_SUCCESS';
export const LOAD_TAG_PAINTING_DETAIL_FAIL = 'bumo/painting/LOAD_TAG_PAINTING_DETAIL_FAIL';
export const LOAD_TAG_PAINTING_HOT_DETAIL = 'bumo/painting/LOAD_TAG_PAINTING_HOT_DETAIL';
export const LOAD_TAG_PAINTING_HOT_DETAIL_SUCCESS = 'bumo/painting/LOAD_TAG_PAINTING_HOT_DETAIL_SUCCESS';
export const LOAD_TAG_PAINTING_HOT_DETAIL_FAIL = 'bumo/painting/LOAD_TAG_PAINTING_HOT_DETAIL_FAIL';
export const LOAD_TAG_TYPE_DETAIL = 'bumo/painting/LOAD_TAG_TYPE_DETAIL';
export const LOAD_TAG_TYPE_DETAIL_SUCCESS = 'bumo/painting/LOAD_TAG_TYPE_DETAIL_SUCCESS';
export const LOAD_TAG_TYPE_DETAIL_FAIL = 'bumo/painting/LOAD_TAG_TYPE_DETAIL_FAIL';
export const LOAD_TAG_NAME_DETAIL = 'bumo/painting/LOAD_TAG_NAME_DETAIL';
export const LOAD_TAG_NAME_DETAIL_SUCCESS = 'bumo/painting/LOAD_TAG_NAME_DETAIL_SUCCESS';
export const LOAD_TAG_NAME_DETAIL_FAIL = 'bumo/painting/LOAD_TAG_NAME_DETAIL_FAIL';
export function loadTagDetail(tagName) {
  return {
    types: [LOAD_TAG_DETAIL, LOAD_TAG_DETAIL_SUCCESS, LOAD_TAG_DETAIL_FAIL],
    promise: (client) => client.get('/api/painting-tag/'+tagName),
    normalizeSchema: 'tagDetail'
  };
}



export function loadTagPaintingDetailHot(tagType,tagName,index) {
  return {
    types: [LOAD_TAG_PAINTING_DETAIL,LOAD_TAG_PAINTING_DETAIL_SUCCESS, LOAD_TAG_PAINTING_DETAIL_FAIL],
    promise: (client) => client.get('/api/painting-tag/hot?page='+index+'&type='+tagType+'&name='+tagName),
    normalizeSchema: 'tags'
  };
}


export function loadTagTypeDetail(tagType,index){
  return{
    types:[LOAD_TAG_TYPE_DETAIL,LOAD_TAG_TYPE_DETAIL_SUCCESS,LOAD_TAG_TYPE_DETAIL_FAIL],
    promise: (client) => client.get('/api/painting-tag/hot?page='+index+'&type='+tagType),
    normalizeSchema: 'tags'
  }
}
export function loadTagNameDetail(tagName,index){
  return{
    types:[LOAD_TAG_NAME_DETAIL,LOAD_TAG_NAME_DETAIL_SUCCESS,LOAD_TAG_NAME_DETAIL_FAIL],
    promise: (client) => client.get('/api/painting-tag/hot?page='+index+'&name='+tagName),
    normalizeSchema: 'tags'
  }
}
