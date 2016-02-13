import 'babel/polyfill';
import React from 'react';
import {render} from 'react-dom';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import './containers/foundation.scss';

import getRoutes from './routes';

const client = new ApiClient();

const dest = document.getElementById('app');
const store = createStore(getRoutes, browserHistory, client);

const component = (
  <Router history={browserHistory}>
    {getRoutes(store)}
  </Router>
);

render(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  dest
);
