import { forward } from "effector";
import { loadTasksFx, TaskListGate, tasks$ } from "./index";

forward({
  from: TaskListGate.open,
  to: loadTasksFx,
});

tasks$.on(loadTasksFx.doneData, (_, data) => data).reset(TaskListGate.close);
