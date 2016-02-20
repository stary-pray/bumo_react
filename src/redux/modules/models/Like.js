export const LIKE = 'bumo/paintingDetail/LIKE';
export const LIKE_SUCCESS = 'bumo/paintingDetail/LIKE_SUCCESS';
export const LIKE_FAIL = 'bumo/paintingDetail/LIKE_FAIL';

export function like(paintingId, number) {
  return {
    types: [LIKE, LIKE_SUCCESS, LIKE_FAIL],
    last_amount: number,
    promise: (client) => client.post('/api/paintings/' + paintingId + '/like',{
      data:{number}
    }),
    normalizeSchema: 'paintingDetail'
  };
}

