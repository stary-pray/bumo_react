import {combineReducers} from 'redux';
import multireducer from 'multireducer';
import {routeReducer} from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

import auth from './auth';
import counter from './counter';
import {reducer as form} from 'redux-form';
import me from './me';
import widgets from './widgets';
import models from './models/reducer';
import containers from './containers/reducer';

export default combineReducers({
  routing: routeReducer,
  models,
  containers,
  reduxAsyncConnect,
  auth,
  form,
  multireducer: multireducer({
    counter1: counter,
    counter2: counter,
    counter3: counter
  }),
  me,
  widgets
});
