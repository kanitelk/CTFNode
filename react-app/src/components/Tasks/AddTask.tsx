import { Grid, Paper, Typography } from "@material-ui/core";
import * as React from "react";
import TaskForm, { TaskFormInput } from "./TaskForm";

const AddTask = () => {
  const onAdd = (task: TaskFormInput) => {
    console.log(task);
  };

  return (
    <Grid item style={{maxWidth: '400px'}}>
      <Typography align="center" variant="h5">
        New task
      </Typography>
      <Paper style={{marginTop: '1rem'}}>
        <TaskForm onSubmit={onAdd} />
      </Paper>
    </Grid>
  );
};

export default AddTask;
