import {
  Button,
  CircularProgress,
  createStyles,
  Divider,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton/Skeleton";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import TaskService from "../../services/TaskService";
import { RootState } from "../../store/rootReducer";
import { fetchTaskById } from "../../store/tasks/tasksActions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(3),
      paddingTop: theme.spacing(1),
    },
    form: {
      display: "flex",
      flexFlow: "row nowrap",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      marginTop: theme.spacing(1),
    },
    title: {
      margin: theme.spacing(1),
    },
    content: {
      margin: theme.spacing(1),
    },
  })
);

interface FormFlagData {
  flag: string;
}

const Task = () => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const isLoading = useSelector(
    (state: RootState) => state.tasks.isLoadingTask
  );
  const task = useSelector((state: RootState) => state.tasks.currentTask);
  const dispatch = useDispatch();
  const [isSubmiting, setSubmitting] = useState(false);

  const { register, formState, handleSubmit } = useForm<FormFlagData>({
    mode: "onChange",
  });

  useEffect(() => {
    dispatch(fetchTaskById(id));
  }, [id]);

  const onFlagSubmit = async (data: FormFlagData) => {
    console.log(data);
    
    setSubmitting(true);
    try {
      let res = await TaskService.sendFlag(id, data.flag);
      setSubmitting(false);
    } catch (error) {
      console.log(error.response?.data?.message);
    } finally {
      setSubmitting(false);
    }
  };

  let skeleton = Array.from(Array(10)).map((i, ind) => (
    <Skeleton key={ind} variant="text" />
  ));

  return (
    <Grid item xs={12} sm={8}>
      <Paper className={classes.paper}>
        {isLoading ? (
          <>{skeleton}</>
        ) : (
          <>
            <Typography className={classes.title} variant="h6">
              {task?.title}
            </Typography>
            <Typography className={classes.content} variant="body2">
              {task?.content}
            </Typography>
          </>
        )}
        <Divider />
        <form className={classes.form} onSubmit={handleSubmit(onFlagSubmit)}>
          <TextField
            variant="outlined"
            margin="dense"
            required
            inputRef={register({ required: true, minLength: 1 })}
            id="flag"
            label="Flag"
            name="flag"
          />
          <Button
            variant="contained"
            style={{ marginLeft: "7px" }}
            color="primary"
            disabled={!formState.isValid}
          >
            {isSubmiting ? <CircularProgress color="secondary" size={15} /> : `Submit`}
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export { Task };
