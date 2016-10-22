// import {fork, call, take, put} from 'redux-saga'
import {fork, take, put, select, call} from "redux-saga/effects";
import * as authModule from "../modules/auth";
import * as meModule from "../modules/me";
import * as userPaintingModule from "../modules/containers/UserPainting";
import * as depositModule from "../modules/containers/Deposit";
import * as getChargeModule from "../modules/models/Deposit";
import * as PaintingUploadModule from "../modules/PaintingUpload";
import * as MainHeaderModule from "../modules/containers/MainHeader";
import * as LikeActionModule from "../modules/containers/LikeAction";
import * as PaintingDetailModule from "../modules/models/PaintingDetail";
import {createNotification} from "../../redux/modules/notification";
import {checkTokenValid} from "../../utils/common";
import {setItem, removeItem} from "../../helpers/storage";

let browserHistory = {push: ()=> ''};

const TRULY = true;

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

function* loadMeOrLogout() {
  const {valid, needRefresh} = yield call(checkTokenValid);
  if (valid) {
    return yield put(meModule.load());
  } else if (needRefresh) {
    return yield put(authModule.logout());
  }
}

function* initialApp() {
  yield take(authModule.INITIAL_APP);
  yield call(loadMeOrLogout);
}

function* loginSuccess() {
  while (TRULY) {
    const {result} = yield take(authModule.LOGIN_SUCCESS);
    yield setItem('token', result.token);
    yield call(loadMeOrLogout);
  }
}

function* loginFail() {
  while (TRULY) {
    const {error} = yield take(authModule.LOGIN_FAIL);
    if (error && error.err === 'not_user') {
      const {email_verified} = yield select(state => state.auth.auth0);
      if (email_verified) {
        yield put(authModule.register());
      }
    }
  }
}

function* paintingUploadSuccess() {
  while (TRULY) {
    const {result} =yield take(PaintingUploadModule.UPLOAD_SUCCESS);
    browserHistory.push('/p/' + result.id);
  }
}

function* updateAvatarOrBanner() {
  while (TRULY) {
    yield take([meModule.UPLOAD_AVATAR_SUCCESS, meModule.UPLOAD_BANNER_SUCCESS]);
    yield put(MainHeaderModule.modalClose());
    const userId = yield select(state => state.me.id);
    yield put(userPaintingModule.loadProfileDetail(userId));
    yield call(loadMeOrLogout);
  }
}

function* updateMe() {
  while (TRULY) {
    const {result} = yield take([meModule.INITIAL_UPDATE_ME, LikeActionModule.FREE_LIKE_SUCCESS, LikeActionModule.PAY_LIKE_SUCCESS]);
    yield call(loadMeOrLogout);
  }
}

function* intialUpdateMe() {
  while (TRULY) {
    const {result} = yield take(meModule.UPDATE_SUCCESS);
    yield put(meModule.initialUpdateMe());

  }
}

function* updateMeEveryQuarterHour() {
  while (TRULY) {
    yield delay(15 * 60 * 1000);
    yield call(loadMeOrLogout);
  }
}

function* registerSuccess() {
  while (TRULY) {
    const {result} = yield take(authModule.REGISTER_SUCCESS);
    yield setItem('token', result.token);
    yield call(loadMeOrLogout);
    yield put(MainHeaderModule.modalClose());
  }
}

function* logout() {
  while (TRULY) {
    yield take(authModule.LOGOUT);
    yield removeItem('token');
    yield put({type: authModule.LOGOUT_SUCCESS});
  }
}

function* logoutSuccess() {
  while (TRULY) {
    yield take(authModule.LOGOUT_SUCCESS);
    browserHistory.push('');
    setTimeout(() => location.reload(), 10);
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


function* loadPaintingChecking() {
  while (TRULY) {
    const {result} = yield take(PaintingDetailModule.LOAD_DETAIL_SUCCESS);
    if (result.status !== 2) {
      yield put(createNotification({
        message: '画作正在审核中,审核完毕会出现在首页上',
        level: 'warning'
      }));
    }
  }
}


export default function* root() {
  yield [
    fork(loginSuccess),
    fork(loginFail),
    fork(logout),
    fork(logoutSuccess),
    fork(registerSuccess),
    fork(updateMe),
    fork(updateMeEveryQuarterHour),
    fork(depositNextPageLoaded),
    fork(depositLastPageLoaded),
    fork(paintingUploadSuccess),
    fork(updateAvatarOrBanner),
    fork(initialApp),
    fork(intialUpdateMe),
    fork(loadPaintingChecking),
  ];
}
