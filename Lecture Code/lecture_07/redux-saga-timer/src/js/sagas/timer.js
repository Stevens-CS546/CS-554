import { race, call, put, takeEvery, take } from "redux-saga/effects";
import { delay } from "redux-saga";
import { setSecondsLeft } from "../actions/timer";

// WATCHERS
const timerSagas = [takeEvery("BEGIN_COUNTDOWN", beginCountdown)];

// export all watcher sagas as an array to be composed in the top level
// root saga
export default timerSagas;

function* beginCountdown(action) {
  const { seconds } = action;

  for (let secondsLeft = seconds; secondsLeft >= 0; secondsLeft--) {
    yield put(setSecondsLeft(secondsLeft));

    if (secondsLeft > 0) {
      const { beginNewCountdown } = yield race({
        timeout: call(delay, 1000),
        beginNewCountdown: take("BEGIN_COUNTDOWN")
      });

      if (beginNewCountdown) {
        /// Break out early
        return;
      }
    }
  }
}
