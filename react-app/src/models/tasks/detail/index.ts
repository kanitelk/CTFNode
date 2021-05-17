import { createGate } from "effector-react";
import { combine, createEffect, createEvent, createStore } from "effector";
import { getTaskById, sendFlag } from "../../../api/tasks";

export const TaskDetailGate = createGate<{ id: string }>();

export const loadTaskFx = createEffect(getTaskById);
export const sendFlagFx = createEffect(sendFlag);

export const sendFlagEvent = createEvent<{ taskId: string; flag: string }>();

export const task$ = createStore<any | null>(null);

export const taskDetailState$ = combine({
  task: task$,
  loading: loadTaskFx.pending,
  sendFlagLoading: sendFlagFx.pending,
});
