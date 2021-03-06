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
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router";
import {
  sendFlagEvent,
  TaskDetailGate,
  taskDetailState$,
} from "../../../models/tasks/detail";
import { useStore } from "effector-react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(3),
      paddingTop: theme.spacing(1),
      margin: theme.spacing(1),
      minWidth: "200px",
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

  const { control, formState, handleSubmit } = useForm<FormFlagData>({
    mode: "onChange",
  });

  const { task, loading, sendFlagLoading, flagResult } = useStore(
    taskDetailState$
  );

  const onFlagSubmit = async (data: FormFlagData) => {
    sendFlagEvent({ taskId: id, flag: data.flag });
  };

  // const [result, setResult] = useState({ correct: false, score: 0, error: "" });

  let skeleton = Array.from(Array(7)).map((_, index) => (
    <Skeleton key={index} variant="text" />
  ));

  return (
    <Grid item xs={12} sm={8} style={{ maxWidth: "400px" }}>
      <TaskDetailGate id={id} />
      <Paper className={classes.paper}>
        {loading ? (
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
        {flagResult?.correct && (
          <Alert severity="success">Success! +{flagResult.score} points</Alert>
        )}
        {flagResult?.correct === false && (
          <Alert severity="error">{flagResult.error || "Wrong flag"}</Alert>
        )}
        {task && (
          <form className={classes.form} onSubmit={handleSubmit(onFlagSubmit)}>
            <Controller
              name="flag"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  placeholder="Your solve (flag)"
                  type="text"
                  margin="dense"
                />
              )}
            />
            <Button
              variant="contained"
              style={{ marginLeft: "7px" }}
              color="primary"
              disabled={!formState.isValid || sendFlagLoading}
              onClick={handleSubmit(onFlagSubmit)}
            >
              {sendFlagLoading ? (
                <CircularProgress color="secondary" size={25} />
              ) : (
                `Submit`
              )}
            </Button>
          </form>
        )}
      </Paper>
    </Grid>
  );
};

export { Task };
