// import {fork, call, take, put} from 'redux-saga'

import {fork, take, put} from 'redux-saga';
const TRULY = true;

import * as authModule from '../modules/auth';
import * as meModule from '../modules/me';

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

function* logout() {
  yield take(authModule.LOGOUT);
  localStorage.removeItem('token');
  yield put({type: authModule.LOGOUT_SUCCESS});
}

function* getCaptcha() {
  while (TRULY) {
    const {result} = yield take(authModule.GET_CAPTCHA_SUCCESS);
    console.log('captcha key', result);
    // just do nothing, for example
  }
}

export default function* root() {
  yield fork(initialApp);
  yield fork(loginSuccess);
  yield fork(logout);
  yield fork(getCaptcha);
}
