import {handleActions} from 'redux-actions';

import * as PaintingDetailActions from '../models/PaintingDetail';

export default handleActions({
  [PaintingDetailActions.LOAD_DETAIL]: (state) => ({
    ...state,
    loaded: false
  }),
  [PaintingDetailActions.LOAD_DETAIL_SUCCESS]: (state) => ({
    ...state,
    loaded: true
  })
}, {loaded: false});
