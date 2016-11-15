import React from "react";
import {render} from "react-dom";
import createStore from "./redux/create";
import ApiClient from "./helpers/ApiClient";
import {Provider} from "react-redux";
import {Router, browserHistory} from "react-router";
import {syncHistoryWithStore} from "react-router-redux";
import "./containers/foundation.scss";
import getRoutes from "./routes";
import ReactGA from "react-ga";
import {isUnsupported} from "./utils/browser.js";

const isSupport = !isUnsupported;

const client = new ApiClient();

const dest = document.getElementById('app');
const store = createStore(client);

console.disableYellowBox = true;

const history = syncHistoryWithStore(browserHistory, store);

ReactGA.initialize('UA-32474933-4');

function logPageView() {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

const component = (
  <Router history={history} onUpdate={logPageView}>
    {getRoutes(store)}
  </Router>
);

render(
  <Provider store={store} key="provider">
    {component}
  </Provider>,
  dest
);
