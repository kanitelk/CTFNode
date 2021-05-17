import {
  CircularProgress,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React from "react";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";

import AddTask from "../../components/Tasks/AddTask";
import EditTask from "../../components/Tasks/EditTask";
import { TaskListItem } from "../../components/Tasks/TaskListItem";
import { Task } from "../../components/Tasks/TaskView";
import { useStore } from "effector-react";
import { authStore$ } from "../../models/auth";
import { TaskListGate, tasksListState$ } from "../../models/tasks/list";

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
  const auth = useStore(authStore$);
  const state = useStore(tasksListState$);

  const router = useHistory();
  const match = useRouteMatch();

  const taskList = (
    <>
      <div className={classes.heading}>
        <Typography variant="h5">Tasks</Typography>
        {auth.isAdmin && (
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
        alignItems="center"
      >
        {state.loading ? (
          <CircularProgress size={100} />
        ) : (
          state.data?.map((task) => (
            <Grid
              className={classes.taskCard}
              item
              xs={12}
              sm={6}
              key={task._id}
            >
              <TaskListItem task={task} />
            </Grid>
          ))
        )}
      </Grid>
    </>
  );

  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Switch>
        <Route exact path={`${match.path}`}>
          <TaskListGate />
          {taskList}
        </Route>
        <Route exact path={`${match.path}/new`}>
          <AddTask />
        </Route>
        <Route path={`${match.path}/:id/edit`}>
          <EditTask />
        </Route>
        <Route path={`${match.path}/:id`}>
          <Task />
        </Route>
      </Switch>
    </Grid>
  );
};

export default TasksPage;
