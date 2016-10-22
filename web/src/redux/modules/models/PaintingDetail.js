export const LOAD_DETAIL = 'bumo/paintingDetail/LOAD_DETAIL';
export const LOAD_DETAIL_SUCCESS = 'bumo/paintingDetail/LOAD_DETAIL_SUCCESS';
export const LOAD_DETAIL_FAIL = 'bumo/paintingDetail/LOAD_DETAIL_FAIL';

export const PRELOAD_DETAIL = 'bumo/paintingDetail/PRELOAD_DETAIL';
export const PRELOAD_DETAIL_SUCCESS = 'bumo/paintingDetail/PRELOAD_DETAIL_SUCCESS';
export const PRELOAD_DETAIL_FAIL = 'bumo/paintingDetail/PRELOAD_DETAIL_FAIL';

export function load(paintingId) {
  return {
    types: [LOAD_DETAIL, LOAD_DETAIL_SUCCESS, LOAD_DETAIL_FAIL],
    promise: (client) => client.get('/api/paintings/' + paintingId),
    normalizeSchema: 'paintingDetail'
  };
}

export function preload(paintingId) {
  return {
    types: [PRELOAD_DETAIL, PRELOAD_DETAIL_SUCCESS, PRELOAD_DETAIL_FAIL],
    promise: (client) => client.get('/api/paintings/' + paintingId),
    normalizeSchema: 'paintingDetail'
  };
}
