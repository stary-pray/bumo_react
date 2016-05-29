/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from "react";
import {AppRegistry} from "react-native";
import {Provider} from "react-redux";
import ApiClient from "./src/helpers/ApiClient";
import createStore from "./src/redux/create.mobile";
import App from "./src/components_mobile/App.mobile";

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
