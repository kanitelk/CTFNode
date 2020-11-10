import {
  FETCH_TASK,
  FETCH_TASK_ERROR,
  FETCH_TASKS_ERROR,
  ITask,
  SET_TASKS,
  TasksActionTypes,
  SET_TASK,
} from "./types";

export const setTasksAction = (tasks: ITask[]): TasksActionTypes => {
  return {
    type: SET_TASKS,
    payload: tasks,
  };
};

export const setTasksFetchErrorAction = (error: string): TasksActionTypes => {
  return {
    type: FETCH_TASKS_ERROR,
    payload: error,
  };
};

export const setTaskFetchErrorAction = (error: string): TasksActionTypes => {
  return {
    type: FETCH_TASK_ERROR,
    payload: error,
  };
};

export const fetchTaskById = (id: string): TasksActionTypes => {
  return {
    type: FETCH_TASK,
    payload: id,
  };
};

export const setTaskAction = (task: ITask): TasksActionTypes => {
  return {
    type: SET_TASK,
    payload: task,
  };
};
