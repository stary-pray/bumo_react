import {handleActions} from 'redux-actions';

import * as DepositActions from '../models/Deposit';

export const GoDepositNextPage = 'bumo/user/GoDepositNextPage';
export const GoDepositLastPage = 'bumo/user/GoDepositLastPage';


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
    indexes: [...action.normalized.result]
  }),
  [GoDepositNextPage]: (state, action) =>({
    ...state,
    page: state.page + 1,
  }),
  [GoDepositLastPage]: (state, action) =>({
    ...state,
    page: state.page - 2,
  }),
  ['@@router/UPDATE_LOCATION']:()=>({
      page: 1,
      indexes: [],
      loaded: false,
      loading: false
    })
},
{
  page: 1,
  indexes: [],
  loaded: false,
  loading: false
});

export function goDepositLastPage(page) {
  return {
    type: GoDepositLastPage,
    page
  };
}
