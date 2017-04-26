import commonSaga from "./saga.common";
import webSaga from "./saga.web";
import {fork} from "redux-saga/effects";

export default function* root() {
  yield [
    fork(commonSaga),
    fork(webSaga),
  ];
}
