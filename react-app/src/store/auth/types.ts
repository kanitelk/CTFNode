export const LOGIN_USER = "AUTH/LOGIN_USER";
export const LOGOUT_USER = "AUTH/LOGOUT_USER";

export enum UserRoleEnum {
  user,
  admin,
}

export type UserAuthData = {
  login: string;
  role: UserRoleEnum;
  token: string;
};

interface LoginUserAction {
  type: typeof LOGIN_USER;
  payload: UserAuthData;
}

interface LogoutUserAction {
  type: typeof LOGOUT_USER
}

export type AuthActionTypes = LoginUserAction | LogoutUserAction