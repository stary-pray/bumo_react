import {handleActions} from 'redux-actions';
import * as TagsActions from '../models/Tags';
import _ from 'lodash';

export const GoNextTagPage = 'bumo/painting/GoNextTagPage';


const initialState = {
  page: 1,
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
    [GoNextTagPage]: (state, action) =>({
      ...state,
      page: state.page + 1
    }),
    ['@@router/LOCATION_CHANGE']: ()=>(initialState)
  },
  initialState
);
