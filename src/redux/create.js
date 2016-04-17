import {createStore as _createStore, applyMiddleware, compose} from 'redux';
import createMiddleware from './middleware/clientMiddleware';
import normailzeMiddleware from './middleware/normailzeMiddleware';
import sagaMiddleware from 'redux-saga';
import rootSaga from './saga';
import reducer from './modules/reducer';

export default function createStore(getRoutes, client, data) {
  // Sync dispatched route actions to the history
  const middleware = [createMiddleware(client), normailzeMiddleware, sagaMiddleware(rootSaga)];

  const finalCreateStore = compose(applyMiddleware(...middleware), window.devToolsExtension ? window.devToolsExtension() : f => f)(_createStore);

  return finalCreateStore(reducer, data);
}
