import { Grid, Paper, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import TaskForm, { TaskFormInput } from "./TaskForm";
import { addTask } from "../../../api/tasks";

const AddTask = () => {
  const [loading, setLoading] = useState(false);
  const router = useHistory();

  const onAdd = async (task: TaskFormInput) => {
    setLoading(true);
    try {
      let res = await addTask(task);
      setLoading(false);
      router.push(`/tasks/${res._id}`);
    } catch (error) {
      console.log(error.responce?.data?.message);
      setLoading(false);
    }
  };

  return (
    <Grid item style={{ maxWidth: "400px" }}>
      <Typography align="center" variant="h5">
        New task
      </Typography>
      <Paper style={{ marginTop: "1rem" }}>
        <TaskForm isLoading={loading} onSubmit={onAdd} />
      </Paper>
    </Grid>
  );
};

export default AddTask;
