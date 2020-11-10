import * as React from "react";
import { TaskListItem } from "./TaskListItem";

const TaskList = () => {
  const list = ["a", "b", "c"].map((item) => (
    <TaskListItem key={item} task={item} />
  ));
  return <>{list}</>;
};

export { TaskList };
