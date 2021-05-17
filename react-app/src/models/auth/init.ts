import { forward } from "effector";
import {
  AppGate,
  authInitFx,
  doLogin,
  doLogout,
  doRegister,
  loginFx,
  logoutFx,
  registerFx,
  sessionUser$,
} from "./index";
import jwt_decode from "jwt-decode";
import { SessionUser } from "../../types";
import { TokenStorage } from "../../core/tokenStorage";

sessionUser$
  .on(authInitFx.doneData, (state, data) => data)
  .on(loginFx.doneData, (state, data) => {
    const user = jwt_decode(data.access_token);
    TokenStorage.token = data.access_token;
    return user as SessionUser;
  })
  .reset(logoutFx.finally);

forward({
  from: doLogin,
  to: loginFx,
});

forward({
  from: doRegister,
  to: registerFx,
});

forward({
  from: doLogout,
  to: logoutFx,
});

forward({
  from: AppGate.open,
  to: authInitFx,
});

loginFx.done.watch(() => {
  document.location.assign("/");
});

registerFx.done.watch(() => {
  document.location.assign("/login");
});
