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
    paddingTop: theme.spacing(1)
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

  const { register, formState, handleSubmit } = useForm<TaskFormInput>({
    mode: "onChange",
    defaultValues: task || {
      visible: true,
      score: 1
    },
  });

  return (
    <Container>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          inputRef={register({ required: true, minLength: 3 })}
          fullWidth
          id="title"
          label="Title"
          name="title"
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          multiline
          rows={3}
          inputRef={register({ required: true, minLength: 4 })}
          fullWidth
          name="content"
          label="Content"
          id="content"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          inputRef={register({ required: true, minLength: 1 })}
          fullWidth
          name="flag"
          label="Flag"
          id="flag"
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          inputRef={register({ required: true, minLength: 1 })}
          fullWidth
          type="number"
          name="score"
          label="Score"
          id="score"
        />
        <FormControlLabel
          control={<Switch checked={task?.visible || true} inputRef={register} name="visible" />}
          name="visible"
          label="Visible"
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
