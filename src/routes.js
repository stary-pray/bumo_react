import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import App from 'containers/App/App';
import Home from 'containers/Home/Home';
import PaintingDetail from 'containers/PaintingDetail/PaintingDetail';
import UserPainting from 'containers/UserPainting/UserPainting';
import Login from 'containers/Login/Login';
import NotFound from 'containers/NotFound/NotFound';
import Me from 'containers/Me/Me';

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

      <Route path="me" component={Me}/>

      <Route path="painting/:paintingId" component={PaintingDetail}/>

      <Route path="p/:ownerId" component={UserPainting}/>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404}/>
    </Route>
  );
}
