import {
  AuthActionTypes,
  LOGIN_USER,
  LOGOUT_USER,
  UserAuthData,
} from "./types";

export const loginUserAction = (authData: UserAuthData): AuthActionTypes => {
  return {
    type: LOGIN_USER,
    payload: authData,
  };
};

export const logoutUserAction = (): AuthActionTypes => ({ type: LOGOUT_USER });
