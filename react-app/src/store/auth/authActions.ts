import { AuthActionTypes, LOGIN_USER, LOGOUT_USER } from "./types";

export const loginUserAction = (token: string): AuthActionTypes => {
  return {
    type: LOGIN_USER,
    payload: token,
  };
};

export const logoutUserAction = (): AuthActionTypes => ({ type: LOGOUT_USER });
