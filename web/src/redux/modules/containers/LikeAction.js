/**
 * Created by akistar on 16/2/20.
 */
import {handleActions} from "redux-actions";
import * as NotificationActions from "../notification";

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


const LIKE_NOTIFIED = 'bumo/Like/LIKE_NOTIFIED';
const initialState = {
  likePaintingId: null,
  likeAmount: null,
  freeLikeSuccess: false,
  payLikeSuccess: false,
};

export default handleActions({
    [PAY_LIKE_SUCCESS]: (state, action) => ({
      likePaintingId: action.result.id,
      likeAmount: action.last_amount,
      freeLikeSuccess: false,
      payLikeSuccess: true
    }),
    [PAY_LIKE_FAIL]: (state, action) => ({
      likePaintingId: action.result.id,
      likeError: action.error,
      freeLikeSuccess: false,
      payLikeSuccess: false
    }),
    [NotificationActions.ADD_NOTIFICATION]: (state) => initialState,
    [FREE_LIKE_SUCCESS]: (state, action) => ({
      likePaintingId: action.result.id,
      freeLikeSuccess: true,
      payLikeSuccess: false
    }),
    ['@@router/LOCATION_CHANGE']: ()=> initialState,
  }, initialState
);

