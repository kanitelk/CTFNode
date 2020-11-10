import { FETCH_TASKS_ERROR, ITask, SET_TASKS, TasksActionTypes } from "./types";

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
