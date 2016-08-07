import {handleActions} from "redux-actions";
import * as CommentActions from "../models/Comments";
import * as PaintingDetailActions from "../models/PaintingDetail";
import _ from "lodash";

const INITIAL_COMMENTS = 'bumo/INITIAL_COMMENTS';

const initialState = {
  pageMeta: {
    current: 0,
    next: 1
  },
  indexes: [],
  loaded: false,
  loading: false,
  addError: false,
  addSuccess:false
};


export default handleActions({
    [CommentActions.ADD_PAINTING_COMMENTS]: (state, action) => ({
      ...state,
      addSuccess:false,
      addError: false,
    }),

    [CommentActions.ADD_PAINTING_COMMENTS_SUCCESS]: (state, action) => ({
      ...state,
      addSuccess:true,
      addError: false,
      indexes: _.uniq([action.normalized.result, ...state.indexes])
    }),
    [CommentActions.ADD_PAINTING_COMMENTS_FAIL]: (state, action) => ({
      ...state,
      addSuccess:false,
      addError: action.error
    }),
    [CommentActions.DELETE_PAINTING_COMMENTS_SUCCESS]: (state, action) => (

    {
      ...state,
      addSuccess:false,
      addError: false,
      indexes: _.without(state.indexes, action.result.id),
    }),
    [CommentActions.LOAD_PAINTING_COMMENTS]: (state, action) => ({
      ...state,
      addSuccess:false,
      addError: false,
      loading: true
    }),
    [CommentActions.LOAD_PAINTING_COMMENTS_SUCCESS]: (state, action) => ({
      ...state,
      addSuccess:false,
      addError: false,
      loading: false,
      loaded: true,
      pageMeta: action.result,
      indexes: _.uniq([...state.indexes, ...action.normalized.result])
    }),
    [PaintingDetailActions.LOAD_DETAIL]: ()=>(initialState),
    [INITIAL_COMMENTS]: ()=>(initialState)
  },
  initialState
);
