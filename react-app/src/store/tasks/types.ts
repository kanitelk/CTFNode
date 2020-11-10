export const FETCH_TASKS = "TASKS/FETCH_TASKS";
export const SET_TASKS = "TASKS/SET_TASKS";
export const FETCH_TASKS_ERROR = "/TASJSFETCH_TASKS_ERROR";

export const FETCH_TASK = "TASKS/FETCH_TASK";
export const FETCH_TASK_ERROR = "TASKS/FETCH_TASK_ERROR";
export const SET_TASK = "TASKS/SET_TASK";

export const CREATE_TASK = "TASKS/CREATE_TASK";
export const CREATE_TASK_SUCCESS = "TASKS/CREATE_TASK_SUCCESS";
export const CREATE_TASK_ERROR = "TASKS/CREATE_TASK_ERROR";

export const EDIT_TASK = "TASKS/EDIT_TASK";
export const EDIT_TASK_SUCCESS = "TASKS/EDIT_TASK_SUCCESS";
export const EDIT_TASK_ERROR = "TASKS/EDIT_TASK_ERROR";

export interface ITask {
  _id: string;
  title: string;
  content?: string;
  visible?: boolean;
  categories?: string;
  images?: string[];
  files?: string[];
  flag?: string;
  answer?: string;
  score: number;
}

interface fetchTasksAction {
  type: typeof FETCH_TASKS;
}

interface setTasksAction {
  type: typeof SET_TASKS;
  payload: ITask[];
}

interface fetchTasksErrorAction {
  type: typeof FETCH_TASKS_ERROR,
  payload: string
}

export type TasksActionTypes = fetchTasksAction | setTasksAction | fetchTasksErrorAction;
