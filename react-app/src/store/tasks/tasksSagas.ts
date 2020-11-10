import { call, put, takeLatest } from "redux-saga/effects";

import TaskService from "../../services/TaskService";
import { setTasksAction, setTasksFetchErrorAction } from "./tasksActions";
import { FETCH_TASKS } from "./types";

function* fetchTasks() {
  try {
    const data = yield call(TaskService.getTasks);
    yield put(setTasksAction(data));
  } catch (error) {
    yield put(setTasksFetchErrorAction(error.response?.data?.message || 'Something went wrong'));
  }
}

export function* watchFetchTasksSaga() {
  yield takeLatest(FETCH_TASKS, fetchTasks);
}
