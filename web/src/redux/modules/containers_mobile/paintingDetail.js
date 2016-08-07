import {handleActions} from "redux-actions";
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
  ['@@router/LOCATION_CHANGE']: (state) => ({
    ...state,
    loaded: false
  })
}, {
  loaded: false
});
