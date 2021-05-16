import { combine, createEffect, createStore } from "effector";
import { createGate } from "effector-react";
import { ITaskListItem } from "../../../types/tasks";
import { getTasks } from "../../../api/tasks";

export const TaskListGate = createGate();

export const loadTasksFx = createEffect(getTasks);

export const tasks$ = createStore<ITaskListItem[] | null>(null);

export const tasksListState$ = combine({
  data: tasks$,
  loading: loadTasksFx.pending,
});
