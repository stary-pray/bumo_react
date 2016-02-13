import {createStore as _createStore, applyMiddleware, compose} from 'redux';
import createMiddleware from './middleware/clientMiddleware';
import normailzeMiddleware from './middleware/normailzeMiddleware';
import {syncHistory} from 'react-router-redux';
import sagaMiddleware from 'redux-saga';
import rootSaga from './saga';

export default function createStore(getRoutes, history, client, data) {
  // Sync dispatched route actions to the history
  const reduxRouterMiddleware = syncHistory(history);

  const middleware = [createMiddleware(client), normailzeMiddleware, sagaMiddleware(rootSaga), reduxRouterMiddleware];

  const finalCreateStore = compose(applyMiddleware(...middleware), window.devToolsExtension ? window.devToolsExtension() : f => f)(_createStore);

  const reducer = require('./modules/reducer');
  const store = finalCreateStore(reducer, data);

  reduxRouterMiddleware.listenForReplays(store);

  return store;
}
