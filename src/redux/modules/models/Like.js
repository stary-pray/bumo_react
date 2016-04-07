export const LIKE = 'bumo/paintingDetail/LIKE';
export const LIKE_SUCCESS = 'bumo/paintingDetail/LIKE_SUCCESS';
export const LIKE_FAIL = 'bumo/paintingDetail/LIKE_FAIL';

export function like(paintingId, amount) {
  return {
    types: [LIKE, LIKE_SUCCESS, LIKE_FAIL],
    last_amount: amount,
    promise: (client) => client.post('/api/paintings/' + paintingId + '/pay_like',{
      data:{amount}
    }),
    normalizeSchema: 'paintingDetail'
  };
}

