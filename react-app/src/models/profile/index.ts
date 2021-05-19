import { createGate } from "effector-react";
import { combine, createEffect, createStore } from "effector";
import { fetch_profile } from "../../api/users";

export const ProfileGate = createGate();

export const loadProfileFx = createEffect(fetch_profile);

export const profile$ = createStore<null | any>(null);

export const profileState$ = combine({
  profile: profile$,
  loading: loadProfileFx.pending,
});
