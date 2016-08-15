import {createStore as _createStore, applyMiddleware, compose} from "redux";
import createMiddleware from "./middleware/clientMiddleware";
import normailzeMiddleware from "./middleware/normailzeMiddleware";
import rootSaga from "./saga";
import reducer from "./modules/reducer.mobile";
import createSagaMiddleware, {END} from "redux-saga";
import {AsyncStorage} from "react-native";
window['BumoAsyncStorage'] = AsyncStorage;

export default function createStore(client, data) {
  // Sync dispatched route actions to the history
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [createMiddleware(client), normailzeMiddleware, sagaMiddleware];

  const finalCreateStore =
    compose(applyMiddleware(...middleware), global.reduxNativeDevTools ? global.reduxNativeDevTools(/*options*/) : nope => nope,)(_createStore);

  const store = finalCreateStore(reducer, data);
  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  store.runSaga(rootSaga);
  if (global.reduxNativeDevTools) {
    global.reduxNativeDevTools.updateStore(store);
  }
  return store;
}

