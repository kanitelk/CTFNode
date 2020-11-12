import { Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";

import AddTask from "../../components/Tasks/AddTask";
import { TaskListItem } from "../../components/Tasks/TaskListItem";
import { Task } from "../../components/Tasks/TaskView";
import { UserRoleEnum } from "../../store/auth/types";
import { RootState } from "../../store/rootReducer";
import { FETCH_TASKS } from "../../store/tasks/types";

const useStyles = makeStyles({
  root: {},
  taskCard: {
    maxWidth: "400px",
  },
  heading: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "1rem",
  },
});

const TasksPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const isAdmin = useSelector(
    (state: RootState) => state.auth.user?.role === UserRoleEnum.admin
  );
  const router = useHistory();
  let match = useRouteMatch();

  useEffect(() => {
    dispatch({ type: FETCH_TASKS });
  }, [dispatch]);

  const taskList = (
    <>
      <div className={classes.heading}>
        <Typography variant="h5">Tasks</Typography>
        {isAdmin && (
          <IconButton
            onClick={() => router.push("/tasks/new")}
            color="primary"
            aria-label="Add new task"
          >
            <AddIcon />
          </IconButton>
        )}
      </div>
      <Grid
        className={classes.root}
        container
        spacing={3}
        direction="row"
        justify="center"
        alignItems="stretch"
      >
        {tasks.map((task) => (
          <Grid className={classes.taskCard} item xs={12} sm={6} key={task._id}>
            <TaskListItem task={task} />
          </Grid>
        ))}
      </Grid>
    </>
  );

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Switch>
        <Route exact path={`${match.path}`}>
          {taskList}
        </Route>
        <Route exact path={`${match.path}/new`}>
          <AddTask />
        </Route>
        <Route path={`${match.path}/:id/edit`}>
          <Typography variant="h5">Edit task</Typography>
        </Route>
        <Route path={`${match.path}/:id`}>
          <Task />
        </Route>
      </Switch>
    </Grid>
  );
};

export default TasksPage;
