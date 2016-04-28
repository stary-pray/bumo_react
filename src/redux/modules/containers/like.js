/**
 * Created by akistar on 16/2/20.
 */
import {handleActions, createAction} from 'redux-actions';

import * as LikePaintingActions from '../models/Like';
import * as NotificationActions from '../notification';

const LIKE_NOTIFIED = 'bumo/Like/LIKE_NOTIFIED';
const initialState = {
  likePaintingId: null,
  likeAmount: null,
  freeLikeSuccess: false,
  payLikeSuccess: false,
};

export default handleActions({
    [LikePaintingActions.PAY_LIKE_SUCCESS]: (state, action) => ({
      likePaintingId: action.result.id,
      likeAmount: action.last_amount,
      freeLikeSuccess: false,
      payLikeSuccess: true
    }),
    [LikePaintingActions.PAY_LIKE_FAIL]: (state, action) => ({
      likePaintingId: action.result.id,
      likeError: action.error,
      freeLikeSuccess: false,
      payLikeSuccess: false
    }),
    [NotificationActions.ADD_NOTIFICATION]: (state) => initialState,
    [LikePaintingActions.FREE_LIKE_SUCCESS]: (state, action) => ({
      likePaintingId: action.result.id,
      freeLikeSuccess: true,
      payLikeSuccess: false
    }),
    ['@@router/LOCATION_CHANGE']: ()=> initialState,
  }, initialState
);

