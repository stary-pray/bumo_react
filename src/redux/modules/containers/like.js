/**
 * Created by akistar on 16/2/20.
 */
import {handleActions} from 'redux-actions';

import * as LikePaintingActions from '../models/Like';


export default handleActions({
    [LikePaintingActions.PAY_LIKE_SUCCESS]: (state, action) => ({
      like_amount: action.last_amount,
      like_success: true
    }),
    [LikePaintingActions.PAY_LIKE_FAIL]: (state, action) => ({
      like_error: action.error,
      like_success: false
    }),
  ['@@router/LOCATION_CHANGE']:()=>({
    like_amount: ''
  })
  },
  {like_amount: ''});

