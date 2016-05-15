// import {fork, call, take, put} from 'redux-saga'
import {fork, take, put, select} from "redux-saga/effects";
import {browserHistory} from "react-router";
import * as authModule from "../modules/auth";
import * as meModule from "../modules/me";
import * as meUpdateModule from "../modules/containers/MeUpdate";
import * as userPaintingModule from "../modules/containers/UserPainting";
import * as depositModule from "../modules/containers/Deposit";
import * as getChargeModule from "../modules/models/Deposit";
import * as PaintingUploadModule from "../modules/paintingUpload";
import * as MainHeaderModule from "../modules/containers/MainHeader";
import * as LikeActionModule from "../modules/containers/LikeAction";
import {checkTokenValid} from "../../utils/common";
const TRULY = true;

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function loadMeOrLogout(){
  const {valid, needRefresh} = checkTokenValid();
  if(valid){
    return put(meModule.load());
  } else if(needRefresh){
    return put(authModule.logout());
  }
}

function* initialApp() {
  yield take(authModule.INITIAL_APP);
  yield loadMeOrLogout();
}

function* loginSuccess() {
  while (TRULY) {
    const {result} = yield take(authModule.LOGIN_SUCCESS);
    localStorage.setItem('token', result.token);
    yield loadMeOrLogout();
    yield put(MainHeaderModule.modalClose());
  }
}

function* paintingUploadSuccess() {
  while (TRULY) {
    const {result} =yield take(PaintingUploadModule.UPLOAD_SUCCESS);
    browserHistory.push('/painting/' + result.id);
  }
}

function* updateAvatarOrBanner() {
  while (TRULY) {
    yield take([meUpdateModule.UPLOAD_AVATAR_SUCCESS, meUpdateModule.UPLOAD_BANNER_SUCCESS]);
    yield put(MainHeaderModule.modalClose());
    const userId = yield select(state => state.me.id);
    yield put(userPaintingModule.loadProfileDetail(userId));
    yield loadMeOrLogout();
  }
}

function* updateMe() {
  while (TRULY) {
    const {result} = yield take([meUpdateModule.UPDATE_SUCCESS, LikeActionModule.FREE_LIKE_SUCCESS, LikeActionModule.PAY_LIKE_SUCCESS]);
    yield loadMeOrLogout();
  }
}

function* updateMeEveryQuarterHour() {
  while (TRULY) {
    yield delay(15 * 60 * 1000);
    yield loadMeOrLogout();
  }
}

function* registerSuccess() {
  while (TRULY) {
    const {result} = yield take(authModule.REGISTER_SUCCESS);
    localStorage.setItem('token', result.token);
    yield loadMeOrLogout();
    yield put(MainHeaderModule.modalClose());
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
    setTimeout(()=> location.reload(), 10);
  }
}

function* depositNextPageLoaded() {
  while (TRULY) {
    yield take(getChargeModule.GET_CHARGE_SUCCESS);
    // yield delay(2000);
    yield put({type: depositModule.GoDepositNextPage});
  }
}

function* depositLastPageLoaded() {
  while (TRULY) {
    const action = yield take(depositModule.GoDepositLastPage);
    // yield delay(2000);
    yield put(getChargeModule.getCharge(action.page - 2));
  }
}

function* getCaptcha() {
  while (TRULY) {
    const {result} = yield take([authModule.LOGIN_FAIL, authModule.REGISTER_FAIL]);
    yield put(authModule.getCaptcha());
  }
}

export default function* root() {
  yield [
    fork(loginSuccess),
    fork(logout),
    fork(logoutSuccess),
    fork(getCaptcha),
    fork(registerSuccess),
    fork(updateMe),
    fork(updateMeEveryQuarterHour),
    fork(depositNextPageLoaded),
    fork(depositLastPageLoaded),
    fork(paintingUploadSuccess),
    fork(updateAvatarOrBanner),
    fork(initialApp),
  ];
}
