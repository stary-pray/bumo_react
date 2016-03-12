export const BUMO_STAR= 'bumo/paintingDetail/BUMO_STAR';
export const BUMO_STAR_SUCCESS = 'bumo/paintingDetail/BUMO_STAR_SUCCESS';
export const BUMO_STAR_FAIL = 'bumo/paintingDetail/BUMO_STAR_FAIL';

export function bumo_star(paintingId) {
  return {
    types: [BUMO_STAR, BUMO_STAR_SUCCESS, BUMO_STAR_FAIL],
    promise: (client) => client.post('/api/paintings/' + paintingId + '/bumo_star'),
    normalizeSchema: 'paintingDetail'
  };
}

