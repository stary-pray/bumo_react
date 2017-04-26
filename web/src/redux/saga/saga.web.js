import {browserHistory} from "react-router";
import {fork, take} from "redux-saga/effects";
import * as authModule from "../modules/auth";
import * as PaintingUploadModule from "../modules/PaintingUpload";
import * as ChargeWindowModule from "../modules/containers/ChargeWindow";
import * as DepositCreateModule from "../modules/containers/CreateCharge";

const TRULY = true;

function* depositCreate() {
  while (TRULY) {
    const {result} =yield take(DepositCreateModule.OPEN_CHARGE);
    browserHistory.push('/me/depositList');
  }
}

function* chargeClose() {
  while (TRULY) {
    const {result} =yield take(ChargeWindowModule.CLOSE_PAY_CHARGE);
    browserHistory.push('/me/depositList');
  }
}

function* paintingUploadSuccess() {
  while (TRULY) {
    const {result} =yield take(PaintingUploadModule.UPLOAD_SUCCESS);
    browserHistory.push('/p/' + result.id);
  }
}

function* logoutSuccess() {
  while (TRULY) {
    yield take(authModule.LOGOUT_SUCCESS);
    browserHistory.push('');
    setTimeout(() => location.reload(), 1500);
  }
}
export default function* root() {
  yield [
    fork(logoutSuccess),
    fork(paintingUploadSuccess),
    fork(chargeClose),
    fork(depositCreate),
  ];
}
