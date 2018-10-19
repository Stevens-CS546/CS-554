import { all } from "redux-saga/effects";
import timerSagas from "./timer";

export default function* rootSaga() {
  yield all([...timerSagas]);
}
