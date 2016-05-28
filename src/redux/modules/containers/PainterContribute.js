import {handleActions} from "redux-actions";
import * as PainterContributeActions from "../models/PainterContribute";
import _ from "lodash";


const initialState = {
  pageMeta: {
    current: 0,
    next: 1
  },
  indexes: [],
  loaded: false,
  loading: false
};


export default handleActions({
    [PainterContributeActions.LOAD_PAINTER_CONTRIBUTE]: (state, action) => ({
      ...state,
      loading: true
    }),
    [PainterContributeActions.LOAD_PAINTER_CONTRIBUTE_SUCCESS]: (state, action) => ({
      ...state,
      loading: false,
      loaded: true,
      pageMeta: action.result,
      indexes: _.uniq([...state.indexes,...action.normalized.result])
    }),
    ['@@router/LOCATION_CHANGE']: ()=>(initialState)
  },
  initialState
);
