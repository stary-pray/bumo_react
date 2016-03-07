import {handleActions} from 'redux-actions';

import * as TagDetailActions from '../models/TagDetail';

export default handleActions({
  [TagDetailActions.LOAD_TAG_DETAIL]: (state) => ({
    loaded: false
  }),
  [TagDetailActions.LOAD_TAG_DETAIL_SUCCESS]: (state,action) => ({
    loaded: true,
    tagId: action.normalized.result
  })
}, {loaded: false});
