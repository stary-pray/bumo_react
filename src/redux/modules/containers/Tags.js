import {handleActions} from 'redux-actions';

import * as TagsActions from '../models/Tags';


export default handleActions({
  [TagsActions.LOAD_TAGS_SUCCESS]: (state, action) => ({
    ...state,
    loaded: true,
    pageMeta: action.result,
    indexes: [...action.normalized.result]
  })

}, {
  loaded: false
});
