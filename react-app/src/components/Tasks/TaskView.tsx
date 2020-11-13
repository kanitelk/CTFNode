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
import Alert from "@material-ui/lab/Alert/Alert";
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
      margin: theme.spacing(1),
    },
    form: {
      display: "flex",
      flexFlow: "row nowrap",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      marginTop: theme.spacing(1),
    },
    title: {},
    score: {
      marginBottom: theme.spacing(1),
    },
    content: {
      marginBottom: theme.spacing(1),
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
    setSubmitting(true);
    setResult({ ...result, error: "" });
    try {
      let res = await TaskService.sendFlag(id, data.flag);
      setResult({...result, correct: res.correct, score: res.score})
      setSubmitting(false);
    } catch (error) {
      setResult({ ...result, error: error.response?.data?.error });
    } finally {
      setSubmitting(false);
    }
  };

  const [result, setResult] = useState({ correct: false, score: 0, error: "" });

  let skeleton = Array.from(Array(7)).map((i, ind) => (
    <Skeleton key={ind} variant="text" />
  ));

  return (
    <Grid item xs={12} sm={8} style={{ maxWidth: "400px" }}>
      <Paper className={classes.paper}>
        {isLoading ? (
          <>{skeleton}</>
        ) : (
          <>
            <Typography className={classes.title} variant="h6">
              {task?.title}
            </Typography>
            <Typography className={classes.score} variant="subtitle2">
              Score: {task?.score}
            </Typography>
            <Typography className={classes.content} variant="body2">
              {task?.content}
            </Typography>
          </>
        )}
        <Divider style={{ marginBottom: "1rem" }} />
        {result.correct && (
          <Alert severity="success">Success! +{result.score} points</Alert>
        )}
        {formState.isSubmitted &&
          (result.error || !isLoading) &&
          !result.correct && (
            <Alert severity="error">{result.error || "Wrong flag"}</Alert>
          )}
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
            disabled={!formState.isValid || isLoading}
            onClick={handleSubmit(onFlagSubmit)}
          >
            {isSubmiting ? (
              <CircularProgress color="secondary" size={25} />
            ) : (
              `Submit`
            )}
          </Button>
        </form>
      </Paper>
    </Grid>
  );
};

export { Task };
