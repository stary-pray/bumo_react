import commonSaga from "./saga.common";
import {fork} from "redux-saga/effects";

export default function* root() {
  yield [
    fork(commonSaga),
  ];
}
