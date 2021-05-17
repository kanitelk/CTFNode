import { forward } from "effector";
import {
  loadTaskFx,
  sendFlagEvent,
  sendFlagFx,
  sendFlagResult$,
  task$,
  TaskDetailGate,
} from "./index";

forward({
  from: TaskDetailGate.open.map(({ id }) => id),
  to: loadTaskFx,
});

forward({
  from: sendFlagEvent,
  to: sendFlagFx,
});

task$.on(loadTaskFx.doneData, (_, data) => data).reset(TaskDetailGate.close);

sendFlagResult$
  .on(sendFlagFx.doneData, (_, data) => ({
    correct: data.correct,
    score: data.score,
    error: null,
  }))
  .on(sendFlagFx.failData, (_, data) => ({
    correct: false,
    score: 0,
    error: data.message,
  }))
  .reset(TaskDetailGate.close);
