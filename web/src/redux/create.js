import {applyMiddleware, compose, createStore as _createStore} from "redux";
import createMiddleware from "./middleware/clientMiddleware";
import normailzeMiddleware from "./middleware/normailzeMiddleware";
import rootSaga from "./saga/index.web";
import reducer from "./modules/reducer";
import createSagaMiddleware, {END} from "redux-saga";

export default function createStore(client, data) {
  // Sync dispatched route actions to the history
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [createMiddleware(client), normailzeMiddleware, sagaMiddleware];

  const finalCreateStore = compose(applyMiddleware(...middleware), window.devToolsExtension ? window.devToolsExtension() : f => f)(_createStore);

  const store = finalCreateStore(reducer, data);
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  store.runSaga(rootSaga);
  return store;
}

