import {handleActions, createAction} from "redux-actions";

const OPEN_NOTIFICATION_DROPDOWN = 'bumo/MainHeader/NotificationDropdown/open';
const CLOSE_NOTIFICATION_DROPDOWN = 'bumo/MainHeader/NotificationDropdown/close';

const initialState = {
  notificationDropdownOpened: false,
};

export default handleActions({
  [OPEN_NOTIFICATION_DROPDOWN]: (state)=>({
    ...state,
    notificationDropdownOpened: true,
  }),
  [CLOSE_NOTIFICATION_DROPDOWN]: (state)=>({
    ...state,
    notificationDropdownOpened: false,
  }),
}, initialState);

export const openNotificationDropdown = createAction(OPEN_NOTIFICATION_DROPDOWN);
export const closeNotificationDropdown = createAction(CLOSE_NOTIFICATION_DROPDOWN);
