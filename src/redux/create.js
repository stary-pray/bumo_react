import {createStore as _createStore, applyMiddleware, compose} from "redux";
import createMiddleware from "./middleware/clientMiddleware";
import normailzeMiddleware from "./middleware/normailzeMiddleware";
import rootSaga from "./saga";
import reducer from "./modules/reducer";
import createSagaMiddleware from "redux-saga";

export default function createStore(getRoutes, client, data) {
  // Sync dispatched route actions to the history
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [createMiddleware(client), normailzeMiddleware, sagaMiddleware];

  const finalCreateStore = compose(applyMiddleware(...middleware), window.devToolsExtension ? window.devToolsExtension() : f => f)(_createStore);

  const store = finalCreateStore(reducer, data);

  sagaMiddleware.run(rootSaga);
  
  return store;
}

