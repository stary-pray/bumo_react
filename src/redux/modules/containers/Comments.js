import {handleActions} from "redux-actions";
import * as CommentActions from "../models/Comments";
import * as PaintingDetailActions from "../models/PaintingDetail";
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

[CommentActions.ADD_PAINTING_COMMENTS_SUCCESS]: (state, action) => ({
    ...state,
    indexes: _.uniq([action.normalized.result,...state.indexes])
  }),
    [CommentActions.DELETE_PAINTING_COMMENTS_SUCCESS]: (state, action) => (

    {
      ...state,
      indexes: _.without(state.indexes, action.result.id),

    }),
    [CommentActions.LOAD_PAINTING_COMMENTS]: (state, action) => ({
      ...state,
      loading: true
    }),
    [CommentActions.LOAD_PAINTING_COMMENTS_SUCCESS]: (state, action) => ({
      ...state,
      loading: false,
      loaded: true,
      pageMeta: action.result,
      indexes: _.uniq([...state.indexes,...action.normalized.result])
    }),
    [PaintingDetailActions.LOAD_DETAIL]: ()=>(initialState),
    ['@@router/LOCATION_CHANGE']: ()=>(initialState)
  },
  initialState
);
