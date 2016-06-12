/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from "react";
import {AppRegistry} from "react-native";
import {Provider} from "react-redux";
import ApiClient from "./web/src/helpers/ApiClient";
import createStore from "./web/src/redux/create.mobile.js";
import App from "./web/src/components_mobile/App.mobile.js";

const client = new ApiClient();
const store = createStore(client);

class BumoReactNative extends Component {
  render() {
    return (
      <Provider store={store} key="provider">
        <App />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('BumoReactNative', () => BumoReactNative);
