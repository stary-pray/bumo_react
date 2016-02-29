import {handleActions} from 'redux-actions';

import * as PaintingActions from '../models/Painting';

export const GoNextPageHot = 'bumo/HotPainting/GoNextPageHot';

export default handleActions({
  [PaintingActions.LOAD_HOT_SUCCESS]: (state, action) => ({
    ...state,
    loaded: true,
    pageMeta: action.result,
    indexes: [...state.indexes, ...action.normalized.result]
  }),
  [GoNextPageHot]: (state, action) =>({
    ...state,
    page: state.page + 1,
  })
}, {
  page: 1,
  indexes: [],
  loaded: false
});
