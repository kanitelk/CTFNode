import { all } from "redux-saga/effects";
import { watchFetchTaskByIdSaga, watchFetchTasksSaga } from "./tasks/tasksSagas";

export default function* rootSaga() {
  yield all([watchFetchTasksSaga(), watchFetchTaskByIdSaga()]);
}
