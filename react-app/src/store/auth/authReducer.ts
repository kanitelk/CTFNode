import { AuthActionTypes, LOGIN_USER, LOGOUT_USER, UserAuthData } from "./types";

const initialState = {
  isAuth: false,
  user: null,
};

export interface AuthState {
  isAuth: boolean;
  user: UserAuthData | null;
}

const authReducer = (
  state: AuthState = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isAuth: true,
        user: action.payload,
      };
    case LOGOUT_USER: {
      return {
        ...state,
        isAuth: false,
        user: null
      }
    }
    default:
      return state;
  }
};

export default authReducer;
