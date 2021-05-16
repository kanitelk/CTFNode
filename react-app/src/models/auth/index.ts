import { combine, createEffect, createEvent, createStore } from "effector";
import { createGate } from "effector-react";
import jwt_decode from "jwt-decode";
import { TokenStorage } from "../../core/tokenStorage";
import { SessionUser, UserRole } from "../../types";
import { login_user, register_new_user } from "../../api/auth";

export const AppGate = createGate();

export const loginFx = createEffect(login_user);
export const registerFx = createEffect(register_new_user);

export const logoutFx = createEffect();
logoutFx.use(TokenStorage.removeToken);

export const authInitFx = createEffect(() => {
  const current_time = Date.now() / 1000;
  const data = jwt_decode(TokenStorage.token as string) as SessionUser & {
    exp: number;
  };
  if (data.exp < current_time) {
    throw "Auth token expired, please, login.";
  }
  return data;
});

export const doLogin = createEvent<{ username: string; password: string }>();
export const doRegister = createEvent<{
  login: string;
  email: string;
  password: string;
}>();
export const doLogout = createEvent();

export const sessionUser$ = createStore<SessionUser | null>(null);
export const isAuth$ = sessionUser$.map((user) => !!user);
const isAdmin$ = sessionUser$.map((user) => user?.role === UserRole.ADMIN);

export const authStore$ = combine({
  user: sessionUser$,
  isAuth: isAuth$,
  isAdmin: isAdmin$,
  loginPending: loginFx.pending,
  registerPending: registerFx.pending,
});
