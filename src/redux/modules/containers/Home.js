import {handleActions} from 'redux-actions';

import * as PaintingActions from '../models/painting';

export default handleActions({
  [PaintingActions.LOAD_SUCCESS]: (state, action) => ({
    ...state,
    loaded: true,
    pageMeta: action.result,
    indexes: action.normalized.result
  }),
}, {loaded: false});
