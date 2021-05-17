import { forward } from "effector";
import {
  loadTaskFx,
  sendFlagEvent,
  sendFlagFx,
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
