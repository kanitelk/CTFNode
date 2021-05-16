import {
  Button,
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Switch,
  TextField,
} from "@material-ui/core";
import * as React from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export type TaskFormInput = {
  title: string;
  content: string;
  flag: string;
  visible: boolean;
  score: number;
};

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    paddingTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type Props = {
  task?: TaskFormInput;
  onSubmit(data: TaskFormInput): any;
  isLoading?: boolean;
};

const TaskForm = ({ task, onSubmit, isLoading = false }: Props) => {
  const classes = useStyles();

  const { control, formState, handleSubmit } = useForm<TaskFormInput>({
    mode: "onChange",
    defaultValues: task || {
      visible: true,
      score: 1,
    },
  });

  return (
    <Container>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              autoFocus
            />
          )}
        />
        <Controller
          name="content"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              autoFocus
            />
          )}
        />
        <Controller
          name="flag"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              autoFocus
            />
          )}
        />
        <Controller
          name="score"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              margin="normal"
              type="number"
              required
              fullWidth
              autoFocus
            />
          )}
        />
        <Controller
          name="visible"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormControlLabel
              control={
                <Switch
                  {...field}
                  // defaultChecked={task?.visible || true}
                  name="visible"
                />
              }
              name="visible"
              label="Visible"
            />
          )}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={!formState.isValid || isLoading}
        >
          {isLoading ? <CircularProgress size={20} /> : `Submit`}
        </Button>
      </form>
    </Container>
  );
};

export default TaskForm;
