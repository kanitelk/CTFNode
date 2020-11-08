const initialState = {
  isAuth: false,
  user: null,
};

export interface AuthState {
  isAuth: boolean;
  user: any | null;
}

const authReducer = (state: AuthState = initialState, action: any) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuth: true,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
