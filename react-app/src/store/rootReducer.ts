import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import todosReducer from "./tasks/tasksReducer";

export const rootReducer = combineReducers({ authReducer, todosReducer });

export type RootState = ReturnType<typeof rootReducer>;