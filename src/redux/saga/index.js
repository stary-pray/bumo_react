// import {fork, call, take, put} from 'redux-saga'

import {fork, take, put} from 'redux-saga';
import { browserHistory } from 'react-router';

const TRULY = true;

import * as authModule from '../modules/auth';
import * as meModule from '../modules/me';
import * as likeModule from '../modules/models/Like';
import * as paintingDetailModule from '../modules/models/PaintingDetail';
import * as PaintingModule from '../modules/models/Painting';
import * as homeModule from '../modules/containers/Home';
import * as hotModule from '../modules/containers/HotPainting';



//const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function* initialApp() {
  yield take(authModule.INITIAL_APP);
  yield put(meModule.load());
}

function* loginSuccess() {
  while (TRULY) {
    const {result} = yield take(authModule.LOGIN_SUCCESS);
    localStorage.setItem('token', result.token);
    yield put(meModule.load());
  }
}


function* updateMe() {
  while (TRULY) {
    const {result} = yield take(meModule.UPLOAD_AVATAR_SUCCESS);
    yield put(meModule.load());
  }
}

function* registerSuccess() {
  while (TRULY) {
    const {result} = yield take(authModule.REGISTER_SUCCESS);
    localStorage.setItem('token', result.token);
    yield put(meModule.load());
    browserHistory.push('/me');
  }
}

function* logout() {
  while (TRULY) {
    yield take(authModule.LOGOUT);
    localStorage.removeItem('token');
    yield put({type: authModule.LOGOUT_SUCCESS});
  }
}

function* logoutSuccess() {
  while (TRULY) {
    yield take(authModule.LOGOUT_SUCCESS);
    browserHistory.push('');
  }
}

function* homePageLoaded() {
  while (TRULY) {
    yield take(PaintingModule.LOAD_SUCCESS);
   // yield delay(2000);
    yield put({type: homeModule.GoNextPage});
  }
}

function* hotPageLoaded() {
  while (TRULY) {
    yield take(PaintingModule.LOAD_HOT_SUCCESS);
    // yield delay(2000);
    yield put({type: hotModule.GoNextPageHot});
  }
}

function* getCaptcha() {
  while (TRULY) {
    const {result} = yield take([authModule.LOGIN_FAIL, authModule.REGISTER_FAIL]);
    yield put(authModule.getCaptcha());
  }
}

function* likeSuccess(action) {
  while (TRULY) {
    const paintingId = yield take(likeModule.LIKE_SUCCESS, action.result.id);
    yield put(paintingDetailModule.load(paintingId));
  }
}

export default function* root() {
  yield fork(initialApp);
  yield fork(loginSuccess);
  yield fork(logout);
  yield fork(logoutSuccess);
  yield fork(getCaptcha);
  yield fork(registerSuccess);
  yield fork(homePageLoaded);
  yield fork(updateMe);
  yield fork(hotPageLoaded);
  //yield fork(likeSuccess);
}
