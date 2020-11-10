import { all } from "redux-saga/effects";
import { watchFetchTasksSaga } from "./tasks/tasksSagas";

export default function* rootSaga() {
  yield all([watchFetchTasksSaga()]);
}
