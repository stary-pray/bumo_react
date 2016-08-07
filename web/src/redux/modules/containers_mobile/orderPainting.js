
const CHANGE_ORDER = 'bumo/CHANGE_ORDER';

const initialState = {
  orderType: '热门'
};

export default function orderPainting(state = initialState, action) {
  switch (action.type) {
    case CHANGE_ORDER:
      return {...state, orderType: action.orderType};
    default:
      return state;

  }

}
export function changeOrder(orderType) {
  return {
    type:CHANGE_ORDER,
    orderType
  };
}
