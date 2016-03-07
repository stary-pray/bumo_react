import React from 'react';
import {IndexRoute, Route} from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import App from 'containers/App/App';
import Home from 'containers/Home/Home';
import PaintingDetail from 'containers/PaintingDetail/PaintingDetail';
import UserPainting from 'containers/UserPainting/UserPainting';
import UserPaintingHot from 'containers/UserPainting/UserPaintingHot';
import HotPainting from 'containers/Home/HotPainting';
import Login from 'containers/Login/Login';
import NotFound from 'containers/NotFound/NotFound';
import Me from 'containers/Me/Me';
import Register from 'containers/Register/Register';
import EditMe from 'containers/Me/EditMe';
import Tags from 'containers/Tags/Tags';
import PaintingUpload from 'containers/PaintingUpload/PaintingUpload';
import User from 'containers/User/User';
import TagDetail from 'containers/TagDetail/TagDetail';

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

      <Route path="/hot" component={HotPainting}/>

      <Route path="/tags" component={Tags}/>

      <Route path="p/:ownerId" component={UserPainting}/>

      <Route path="p/hot/:ownerId" component={UserPaintingHot}/>

      <Route path="me/paintingUpload" component={PaintingUpload}/>

      <Route path="user" component={User}/>

      <Route path="/tags/:tagName" component={TagDetail}/>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404}/>
    </Route>
  );
}
