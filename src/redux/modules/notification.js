import {handleActions, createAction} from 'redux-actions';

const ADD_NOTIFICATION = 'bumo/add_notification';
const ADD_NOTIFICATION_SUCCESS = 'bumo/add_notification_success';

export default handleActions({
  [ADD_NOTIFICATION]: (state, action) => (action.payload),
  [ADD_NOTIFICATION_SUCCESS]: (state, action) => (null)
}, null);

export const createNotification = createAction(ADD_NOTIFICATION);
export const createNotificationSuccess = createAction(ADD_NOTIFICATION_SUCCESS);
