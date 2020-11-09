export const LOGIN_USER = "AUTH/LOGIN_USER";
export const LOGOUT_USER = "AUTH/LOGOUT_USER";

export enum UserRoleEnum {
  user = 'user',
  admin = 'admin',
}

export type UserAuthData = {
  _id: string,
  login: string;
  role: UserRoleEnum;
};

interface LoginUserAction {
  type: typeof LOGIN_USER;
  payload: string;
}

interface LogoutUserAction {
  type: typeof LOGOUT_USER
}

export type AuthActionTypes = LoginUserAction | LogoutUserAction