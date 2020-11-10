import { FETCH_TASK, FETCH_TASKS, FETCH_TASKS_ERROR, ITask, SET_TASK, SET_TASKS, TasksActionTypes } from "./types";

const initialState = {
  tasks: [],
  isLoadingTasks: false,
  isLoadingTask: false,
  currentTask: null,
  error: null,
};

export interface TasksState {
  tasks: ITask[];
  isLoadingTasks: boolean;
  currentTask: ITask | null;
  isLoadingTask: boolean;
  error: string | null;
}

const tasksReducer = (
  state: TasksState = initialState,
  action: TasksActionTypes
): TasksState => {
  switch (action.type) {
    case FETCH_TASKS:
      return {
        ...state,
        isLoadingTasks: true,
        error: null
      };
    case SET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        isLoadingTasks: false,
      };
    case FETCH_TASKS_ERROR:
      return {
        ...state, tasks: [], error: action.payload as string
      }
    case FETCH_TASK:
      return {
        ...state,
        isLoadingTask: true,
        error: null,
      };
    case SET_TASK:
      return {
        ...state,
        isLoadingTask: false,
        currentTask: action.payload,
      }
    default:
      return state;
  }
};

export default tasksReducer;
