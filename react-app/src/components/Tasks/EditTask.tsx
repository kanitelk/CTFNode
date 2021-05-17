import { CircularProgress, Grid, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import TaskForm, { TaskFormInput } from "./TaskForm";
import { editTask, getTaskById } from "../../api/tasks";

const EditTask = () => {
  const router = useHistory();
  const { id } = useParams<{ id: string }>();

  const [task, setTask] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTaskById(id).then((data) => {
      setTask(data);
    });
  }, []);

  const onSave = async (task: TaskFormInput) => {
    setLoading(true);
    try {
      let res = await editTask(id, {
        title: task.title,
        content: task.content,
        score: task.score,
        flag: task.flag,
        visible: task.visible,
      });
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
        Edit task
      </Typography>
      {task ? (
        <Paper style={{ marginTop: "1rem" }}>
          <TaskForm task={task as TaskFormInput} onSubmit={onSave} />
        </Paper>
      ) : (
        <CircularProgress size={30} />
      )}
    </Grid>
  );
};

export default EditTask;
