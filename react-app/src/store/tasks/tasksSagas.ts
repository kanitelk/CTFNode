import { call, put, takeLatest } from "redux-saga/effects";

import TaskService from "../../services/TaskService";
import {
  setTaskAction,
  setTaskFetchErrorAction,
  setTasksAction,
  setTasksFetchErrorAction,
} from "./tasksActions";
import { FETCH_TASK, FETCH_TASKS, TasksActionTypes } from "./types";

function* fetchTasks() {
  try {
    const data = yield call(TaskService.getTasks);
    yield put(setTasksAction(data));
  } catch (error) {
    yield put(
      setTasksFetchErrorAction(
        error.response?.data?.message || "Something went wrong"
      )
    );
  }
}

function* fetchTaskById(action: TasksActionTypes) {
  try {
    const data = yield call(TaskService.getTaskById, action.payload as string);
    yield put(setTaskAction(data))
  } catch (error) {
    yield put(
      setTaskFetchErrorAction(
        error.response?.data?.message || "Something went wrong"
      )
    );
  }
}

export function* watchFetchTaskByIdSaga() {
  yield takeLatest(FETCH_TASK, fetchTaskById)
} 

export function* watchFetchTasksSaga() {
  yield takeLatest(FETCH_TASKS, fetchTasks);
}
