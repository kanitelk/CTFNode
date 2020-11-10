import { combineReducers } from "redux";
import auth from "./auth/authReducer";
import tasks from "./tasks/tasksReducer";

export const rootReducer = combineReducers({ auth, tasks });

export type RootState = ReturnType<typeof rootReducer>;
