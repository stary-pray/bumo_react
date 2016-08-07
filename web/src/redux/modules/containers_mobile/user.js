import {handleActions} from "redux-actions";
import _ from "lodash";
import * as UserActions from "../models/User";


const initialState = {
  pageMeta: {
    current: 0,
    next: 1,
  },
  indexes: [],
  loaded: false,
  loading: false,
};

export default handleActions({
  [UserActions.LOAD_USER]: (state, action) => ({
    ...state,
    loading: true
  }),
  [UserActions.LOAD_USER_SUCCESS]: (state, action) => ({
    ...state,
    loaded: true,
    loading: false,
    pageMeta: action.result,
    indexes: _.uniq([...state.indexes, ...action.normalized.result])
  })
}, initialState);
