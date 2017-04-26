import React from "react";
//import {Navigation} from "react-native-navigation";
import {Provider} from "react-redux";
import ApiClient from "../helpers/ApiClient";
import createStore from "../redux/create.mobile.js";
//import {registerScreens} from "./screens";
import Explore from "./Explore.stack";

window['isNative'] = !!window['localStorage'];
console.disableYellowBox = true;

const client = new ApiClient();

const store = createStore(client);

class App extends React.Component {
  render(){
    return <Provider store={store}>
      <Explore />
    </Provider>
  }
}

export default App;

//registerScreens(store, Provider);
// notice that this is just a simple class, it's not a React component

/*
Navigation.startTabBasedApp({
  tabs: [
    {
      label: '发现',
      screen: 'bumo.FindPainting',
      title: '发现',
      //icon: iconsMap['explore'],
      navigatorStyle: {
        navBarHidden: true,
      },
    },
    {
      label: '画家',
      screen: 'bumo.User',
      title: '画家',
      //icon: iconsMap['palette--active'],
      navigatorStyle: {
        navBarHidden: true,

      },
    },
    {
      label: '标签',
      screen: 'bumo.TagType',
      title: '标签',
      //icon: iconsMap['local-offer'],
      navigatorStyle: {
        navBarHidden: true,
      },
    },
    {
      label: '我',
      screen: 'bumo.Me',
      title: '我',
      //icon: iconsMap['person'],
      navigatorStyle: {
        navBarHidden: true,
      },
    }
  ],
  title: 'Redux Example',
  tabs
    tabBarSelectedButtonColor: '#05AD97',
  }
})

export default class App {
  constructor() {
    // since react-redux only works on components, we need to subscribe this class manually
    store.subscribe(this.onStoreUpdate.bind(this));

    this.startApp();
  }


  onStoreUpdate() {
  }

  startApp(root) {
}



*/
