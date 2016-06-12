import {handleActions} from "redux-actions";
import * as TagsActions from "../models/Tags";
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
    [TagsActions.LOAD_TAGS]: (state, action) => ({
      ...state,
      loading: true
    }),
    [TagsActions.LOAD_TAGS_SUCCESS]: (state, action) => ({
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
