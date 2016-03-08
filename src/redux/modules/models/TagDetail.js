export const LOAD_TAG_DETAIL = 'bumo/painting/LOAD_TAG_DETAIL';
export const LOAD_TAG_DETAIL_SUCCESS = 'bumo/painting/LOAD_TAG_DETAIL_SUCCESS';
export const LOAD_TAG_DETAIL_FAIL = 'bumo/painting/LOAD_TAG_DETAIL_FAIL';
export const LOAD_TAG_PAINTING_DETAIL = 'bumo/painting/LOAD_TAG_PAINTING_DETAIL';
export const LOAD_TAG_PAINTING_DETAIL_SUCCESS = 'bumo/painting/LOAD_TAG_PAINTING_DETAIL_SUCCESS';
export const LOAD_TAG_PAINTING_DETAIL_FAIL = 'bumo/painting/LOAD_TAG_PAINTING_DETAIL_FAIL';


export function loadTagDetail(tagName) {
  return {
    types: [LOAD_TAG_DETAIL, LOAD_TAG_DETAIL_SUCCESS, LOAD_TAG_DETAIL_FAIL],
    promise: (client) => client.get('/api/painting-tag/'+tagName),
    normalizeSchema: 'tagDetail'
  };
}



export function loadTagPaintingDetail(tagName,index) {
  return {
    types: [LOAD_TAG_PAINTING_DETAIL,LOAD_TAG_PAINTING_DETAIL_SUCCESS, LOAD_TAG_PAINTING_DETAIL_FAIL],
    promise: (client) => client.get('/api/paintings/tag?page='+index+'&tag='+tagName),
    normalizeSchema: 'painting'
  };
}
