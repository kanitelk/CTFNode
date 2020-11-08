import { combineReducers } from "redux";
import authReducer from "./authReducer";
import todosReducer from "./todosReducer";

export const rootReducer = combineReducers({ authReducer, todosReducer });

export type RootState = ReturnType<typeof rootReducer>;