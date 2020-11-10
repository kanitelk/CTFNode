import { Grid, makeStyles } from "@material-ui/core";
import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

import { TaskList } from "../../components/Tasks/TaskList";
import { FETCH_TASKS } from "../../store/tasks/types";

const useStyles = makeStyles({
  root: {},
});

const TasksPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: FETCH_TASKS });
  }, [dispatch]);

  return (
    <Grid
      className={classes.root}
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <TaskList />
    </Grid>
  );
};

export { TasksPage };
