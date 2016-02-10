export const LOAD_DETAIL = 'bumo/paintingDetail/LOAD';
export const LOAD_DETAIL_SUCCESS = 'bumo/paintingDetail/LOAD_SUCCESS';
export const LOAD_DETAIL_FAIL = 'bumo/paintingDetail/LOAD_FAIL';

export function load(paintingId) {
  return {
    types: [LOAD_DETAIL, LOAD_DETAIL_SUCCESS, LOAD_DETAIL_FAIL],
    promise: (client) => client.get('/api/paintings/' + paintingId),
    normalizeSchema: 'paintingDetail'
  };
}
