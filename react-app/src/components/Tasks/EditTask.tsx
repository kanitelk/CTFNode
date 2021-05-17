import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { useHistory, useParams } from "react-router-dom";

const EditTask = () => {
  const router = useHistory();
  const { id } = useParams<{ id: string }>();

  // const task = useSelector((state: RootState) => state.tasks.currentTask);

  // useEffect(() => {
  //   dispatch(fetchTaskById(id));
  // }, [dispatch]);
  //
  // const onSave = async (task: TaskFormInput) => {
  //   setLoading(true);
  //   try {
  //     let res = await editTask(id, task);
  //     setLoading(false);
  //     router.push(`/tasks/${res._id}`);
  //   } catch (error) {
  //     console.log(error.responce?.data?.message);
  //     setLoading(false);
  //   }
  // };

  return (
    <Grid item style={{ maxWidth: "400px" }}>
      <Typography align="center" variant="h5">
        Edit task
      </Typography>
      {/*{!isLoadingTask ? (*/}
      {/*  <Paper style={{ marginTop: "1rem" }}>*/}
      {/*    <TaskForm task={task as TaskFormInput} onSubmit={onSave} />*/}
      {/*  </Paper>*/}
      {/*) : (*/}
      {/*  <CircularProgress size={30} />*/}
      {/*)}*/}
    </Grid>
  );
};

export default EditTask;
