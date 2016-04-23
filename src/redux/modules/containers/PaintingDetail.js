import {handleActions} from "redux-actions";
import * as userPaintingActions from "./UserPainting";
import * as PaintingDetailActions from "../models/PaintingDetail";

export default handleActions({
  [PaintingDetailActions.LOAD_DETAIL]: (state) => ({
    ...state,
    loaded: false
  }),
  [PaintingDetailActions.LOAD_DETAIL_SUCCESS]: (state, action) => ({
    ...state,
    loaded: true
  }),
  [userPaintingActions.LOAD_USER_PAINTING_SUCCESS]: (state, action)=> ({
    ...state,
    pageMeta: action.result,
    indexes: [...state.indexes,...action.normalized.result],
  }),
  ['@@router/LOCATION_CHANGE']: (state) => ({
    ...state,
    loaded: false
  })
}, {
  indexes: [],
  loaded: false
});
