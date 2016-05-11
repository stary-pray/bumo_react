import React from "react";
import {IndexRoute, Route} from "react-router";
import {isLoaded as isAuthLoaded, load as loadAuth} from "./redux/modules/auth";
import App from "./containers/App/App";
import Home from "./containers/Home/Home";
import PaintingDetail from "./containers/PaintingDetail/PaintingDetail";
import UserPainting from "./containers/UserPainting/UserPainting";
import Login from "./containers/Login/Login";
import NotFound from "./containers/NotFound/NotFound";
import Me from "./containers/Me/Me";
import Register from "./containers/Register/Register";
import EditMe from "./containers/Me/EditMe";
import PaintingUpload from "./containers/PaintingUpload/PaintingUpload";
import User from "./containers/User/User";
import TagDetail from "./containers/TagDetail/TagDetail";
import CreateCharge from "./containers/Deposit/CreateCharge";
import DepositList from "./containers/Deposit/DepositList";
import TagType from "./containers/TagDetail/TagType";


export default function Router(store) {
  const requireLogin = (nextState, replaceState, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
        // oops, not logged in, so can't be here!
        replaceState(null, '/');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>

      { /* Routes requiring login */ }
      <Route onEnter={requireLogin}/>

      { /* Routes */ }
      <Route path="login" component={Login}/>

      <Route path="register" component={Register}/>

      <Route path="me" component={Me}/>

      <Route path="me/edit" component={EditMe}/>

      <Route path="painting/:paintingId" component={PaintingDetail}/>

      <Route path="/latest" component={Home}/>

      <Route path="p/:ownerId/:sub" component={UserPainting}/>

      <Route path="p/:ownerId" component={UserPainting}/>

      <Route path="me/paintingUpload" component={PaintingUpload}/>

      <Route path="user" component={User}/>

      <Route path="/tag(/:tagType)" component={TagType}>
        <Route path=":tagName(/:sub)" component={TagDetail}/>
      </Route>

      <Route path="me/depositList" component={DepositList}/>

      <Route path="me/createCharge" component={CreateCharge}/>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404}/>
    </Route>
  );
}
