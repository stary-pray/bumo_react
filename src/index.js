import React from 'react';
import {render} from 'react-dom';
import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import './containers/foundation.scss';

import getRoutes from './routes';

const client = new ApiClient();

const dest = document.getElementById('app');
const store = createStore(getRoutes, client);

const history = syncHistoryWithStore(browserHistory, store);

const component = (
  <Router history={history}>
    {getRoutes(store)}
  </Router>
);

render(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  dest
);
