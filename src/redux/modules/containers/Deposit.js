import {handleActions} from 'redux-actions';
import _ from "lodash";

import * as DepositActions from '../models/Deposit';

export const GoDepositNextPage = 'bumo/user/GoDepositNextPage';
export const GoDepositLastPage = 'bumo/user/GoDepositLastPage';


const initialState = {
  pageMeta: {
    current: 0,
    next: 1,
  },
  indexes: [],
  loaded: false,
  loading: false
};

export default handleActions({
  [DepositActions.GET_CHARGE]: (state, action) => ({
    ...state,
    loading: true
  }),
  [DepositActions.GET_CHARGE_SUCCESS]: (state, action) => ({
    ...state,
    loaded: true,
    loading: false,
    pageMeta: action.result,
    indexes: _.uniq([...state.indexes, ...action.normalized.result])
  }),
  [GoDepositNextPage]: (state, action) =>({
    ...state,
    page: state.page + 1,
  }),
  [GoDepositLastPage]: (state, action) =>({
    ...state,
    page: state.page - 2,
  }),
  ['@@router/LOCATION_CHANGE']:()=>(initialState)
},
  initialState);

export function goDepositLastPage(page) {
  return {
    type: GoDepositLastPage,
    page
  };
}
