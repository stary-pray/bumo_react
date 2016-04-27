export const PAY_LIKE = 'bumo/paintingDetail/PAY_LIKE';
export const PAY_LIKE_SUCCESS = 'bumo/paintingDetail/PAY_LIKE_SUCCESS';
export const PAY_LIKE_FAIL = 'bumo/paintingDetail/PAY_LIKE_FAIL';

export const FREE_LIKE= 'bumo/paintingDetail/FREE_LIKE';
export const FREE_LIKE_SUCCESS = 'bumo/paintingDetail/ FREE_LIKE_SUCCESS';
export const FREE_LIKE_FAIL = 'bumo/paintingDetail/FREE_LIKE_FAIL';

export function freeLike(paintingId) {
  return {
    types: [FREE_LIKE, FREE_LIKE_SUCCESS, FREE_LIKE_FAIL],
    promise: (client) => client.post('/api/paintings/' + paintingId + '/free_like'),
    normalizeSchema: 'paintingDetail'
  };
}

export function payLike(paintingId, amount) {
  return {
    types: [PAY_LIKE, PAY_LIKE_SUCCESS, PAY_LIKE_FAIL],
    last_amount: amount,
    promise: (client) => client.post('/api/paintings/' + paintingId + '/pay_like',{
      data:{amount}
    }),
    normalizeSchema: 'paintingDetail'
  };
}

