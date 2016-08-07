import {createStore as _createStore, applyMiddleware, compose} from "redux";
import createMiddleware from "./middleware/clientMiddleware";
import normailzeMiddleware from "./middleware/normailzeMiddleware";
import rootSaga from "./saga";
import reducer from "./modules/reducer.mobile";
import createSagaMiddleware, {END} from "redux-saga";
import createLogger from "redux-logger";
import {AsyncStorage} from "react-native";
window['BumoAsyncStorage'] = AsyncStorage;
console.info('BumoAsyncStorage');

export default function createStore(client, data) {
  // Sync dispatched route actions to the history
  const sagaMiddleware = createSagaMiddleware();
  const logger = createLogger();
  const middleware = [createMiddleware(client), normailzeMiddleware, sagaMiddleware, logger];

  const finalCreateStore =
    compose(applyMiddleware(...middleware), window.devToolsExtension ? window.devToolsExtension() : f => f)(_createStore);

  const store = finalCreateStore(reducer, data);
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  store.runSaga(rootSaga);
  return store;
}

