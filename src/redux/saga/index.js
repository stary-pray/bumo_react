// import {fork, call, take, put} from 'redux-saga'

import {fork, take, put, select} from "redux-saga/effects";
import {browserHistory} from "react-router";
import * as authModule from "../modules/auth";
import * as meModule from "../modules/me";
import * as meUpdateModule from "../modules/containers/MeUpdate";
import * as PaintingModule from "../modules/models/Painting";
import * as homeModule from "../modules/containers/Home";
import * as userPaintingModule from "../modules/containers/UserPainting";
import * as tagPaintingModule from "../modules/models/TagDetail";
import * as tagModule from "../modules/models/Tags";
import * as tagsModule from "../modules/containers/Tags";
import * as tagPaintingTypeModule from "../modules/containers/TagTypeDetail";
import * as tagPaintingDetailModule from "../modules/containers/TagPaintingDetail";
import * as depositModule from "../modules/containers/Deposit";
import * as getChargeModule from "../modules/models/Deposit";
import * as PaintingUploadModule from "../modules/paintingUpload";
import * as MainHeaderModule from "../modules/containers/MainHeader";

const TRULY = true;

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function* initialApp() {
  yield take(authModule.INITIAL_APP);
  yield put(meModule.load());
}

function* loginSuccess() {
  while (TRULY) {
    const {result} = yield take(authModule.LOGIN_SUCCESS);
    localStorage.setItem('token', result.token);
    yield put(meModule.load());
    yield put(MainHeaderModule.modalClose());
  }
}

function* paintingUploadSuccess() {
  while (TRULY) {
    const {result} =yield take(PaintingUploadModule.UPLOAD_SUCCESS);
    console.log('kk',result);
    browserHistory.push('/painting/'+result.id);
  }
}

function* updateAvatarOrBanner() {
  while (TRULY) {
    yield take([meUpdateModule.UPLOAD_AVATAR_SUCCESS, meUpdateModule.UPLOAD_BANNER_SUCCESS]);
    yield put(MainHeaderModule.modalClose());
    const userId = yield select(state => state.me.id);
    console.log('userId' ,userId );
    yield put(userPaintingModule.loadProfileDetail(userId));
    yield put(meModule.load());
  }
}

function* updateMe() {
  while (TRULY) {
    const {result} = yield take( meUpdateModule.UPDATE_SUCCESS);
    yield put(meModule.load());
  }
}

function* registerSuccess() {
  while (TRULY) {
    const {result} = yield take(authModule.REGISTER_SUCCESS);
    localStorage.setItem('token', result.token);
    yield put(meModule.load());
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

function* homePageLoaded() {
  while (TRULY) {
    yield take(PaintingModule.LOAD_SUCCESS);
   // yield delay(2000);
    yield put({type: homeModule.GoNextPage});
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
    yield put(getChargeModule.getCharge(action.page-2));
  }
}

function* hotPageLoaded() {
  while (TRULY) {
    yield take(PaintingModule.LOAD_HOT_SUCCESS);
    // yield delay(2000);
    yield put({type: homeModule.GoNextPageHot});
  }
}
function* tagTypePageLoaded() {
  while (TRULY) {
    yield take(tagPaintingModule.LOAD_TAG_TYPE_DETAIL_SUCCESS);
    // yield delay(2000);
    yield put({type: tagPaintingTypeModule.GoNextTagTypePage});
  }
}

function* tagsPageLoaded() {
  while (TRULY) {
    yield take(tagModule.LOAD_TAGS_SUCCESS);
    // yield delay(2000);
    yield put({type: tagsModule.GoNextTagPage});
  }
}

function* tagPaintingPageLoaded() {
  while (TRULY) {
    yield take([tagPaintingModule.LOAD_TAG_PAINTING_DETAIL_SUCCESS,
      tagPaintingModule.LOAD_TAG_PAINTING_HOT_DETAIL_SUCCESS]);
    // yield delay(2000);
    yield put({type: tagPaintingDetailModule.GoNextTagDetailPage});
  }
}

function* userPaintingPageLoaded() {
  while (TRULY) {
    yield take([userPaintingModule.LOAD_USER_PAINTING_SUCCESS,userPaintingModule.LOAD_USER_PAINTING_HOT_SUCCESS]);
    // yield delay(2000);
    yield put({type: userPaintingModule.GoNextUserPage});
  }
}

function* getCaptcha() {
  while (TRULY) {
    const {result} = yield take([authModule.LOGIN_FAIL, authModule.REGISTER_FAIL]);
    yield put(authModule.getCaptcha());
  }
}



/*function* loadHotUserPaintings(){
  while (TRULY) {
    const action = yield take(userModule.LOAD_USER_SUCCESS);
    yield (action.normalized.result.map( profileId =>
      put(userModule.loadUserPaintingHot(profileId))
    ))
  }
}*/

export default function* root() {
  yield fork(initialApp);
  yield fork(loginSuccess);
  yield fork(logout);
  yield fork(logoutSuccess);
  yield fork(getCaptcha);
  yield fork(registerSuccess);
  //yield fork(homePageLoaded);
  yield fork(updateMe);
  //yield fork(hotPageLoaded);
 // yield fork(userPaintingPageLoaded);
  //yield fork(tagTypePageLoaded);
 // yield fork(loadHotUserPaintings);
  yield fork(depositNextPageLoaded);
  yield fork(depositLastPageLoaded);
  yield fork(paintingUploadSuccess);
  yield fork(updateAvatarOrBanner);
 // yield fork(tagPaintingPageLoaded);
  //yield fork(tagsPageLoaded);
}
