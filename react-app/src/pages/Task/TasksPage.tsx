import { Grid, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useParams } from "react-router-dom";
import { Task } from "../../components/Tasks/Task";
import { TaskListItem } from "../../components/Tasks/TaskListItem";

import { RootState } from "../../store/rootReducer";
import { FETCH_TASKS } from "../../store/tasks/types";

const useStyles = makeStyles({
  root: {},
  taskCard: {
    maxWidth: "400px",
  },
});

const TasksPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  useEffect(() => {
    dispatch({ type: FETCH_TASKS });
  }, [dispatch]);

  return (
    <Grid
      className={classes.root}
      container
      spacing={3}
      direction="row"
      justify="center"
      alignItems="stretch"
    >
      <Switch>
        <Route exact path="/tasks">
          {tasks.map((task) => (
            <Grid
              className={classes.taskCard}
              item
              xs={12}
              sm={6}
              key={task._id}
            >
              <TaskListItem task={task} />
            </Grid>
          ))}
        </Route>
        <Route path="/tasks/:id/edit">
          <h1>Edit task</h1>
        </Route>
        <Route path="/tasks/:id">
          <Task />
        </Route>
      </Switch>
    </Grid>
  );
};

// state.map((task) => {
//   let { title, content } = task;
//   if (content?.length! > 40) content = content?.substring(0, 40) + "...";
//   if (title.length > 40) title = title.substring(0, 40) + "...";
//   return { ...task, title, content };
// });

export default TasksPage;
