import {combineReducers} from 'redux';
import {routeReducer} from 'react-router-redux';

import auth from './auth';
import {reducer as form} from 'redux-form';
import me from './me';
import notification from './notification';
import widgets from './widgets';
import models from './models/reducer';
import containers from './containers/reducer';

export default combineReducers({
  routing: routeReducer,
  models,
  containers,
  auth,
  form,
  me,
  widgets,
  notification
});
