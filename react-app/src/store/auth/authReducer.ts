import { check_auth_token, clear_token } from "./auth_utils";
import {
  AuthActionTypes,
  LOGIN_USER,
  LOGOUT_USER,
  UserAuthData,
} from "./types";

const initialState: AuthState = {
  user: check_auth_token(),
  isAuth: Boolean(check_auth_token()),
  token: localStorage.getItem('token') || null
};

export interface AuthState {
  isAuth: boolean;
  user: UserAuthData | null,
  token: string | null
}

const authReducer = (
  state: AuthState = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case LOGIN_USER:
      let decoded_user = check_auth_token(action.payload) || null;
      return {
        ...state,
        isAuth: decoded_user ? true : false,
        user: decoded_user,
        token: action.payload
      };
    case LOGOUT_USER: {
      clear_token();
      return {
        ...state,
        isAuth: false,
        user: null,
        token: null
      };
    }
    default:
      return state;
  }
};

export default authReducer;
