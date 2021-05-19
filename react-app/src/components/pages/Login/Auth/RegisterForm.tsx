import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { useStore } from "effector-react";
import { authStore$, doRegister } from "../../../../models/auth";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export type RegisterFormInput = {
  login: string;
  email: string;
  password: string;
};

function RegisterForm() {
  const classes = useStyles();

  const router = useHistory();
  const auth = useStore(authStore$);

  const { control, formState, handleSubmit } = useForm<RegisterFormInput>({
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterFormInput) => {
    doRegister(data);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="login"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                placeholder="Login"
                margin="normal"
                required
                fullWidth
                autoFocus
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                placeholder="E-Mail"
                margin="normal"
                required
                fullWidth
                autoFocus
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                margin="normal"
                placeholder="Password"
                required
                fullWidth
                autoFocus
                type="password"
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!formState.isValid}
          >
            {false ? <CircularProgress size={20} /> : `Sign Up`}
          </Button>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            OR
            <Grid item>
              <Button
                component={Link}
                to="/login"
                fullWidth
                variant="contained"
                color="default"
                style={{ marginTop: "1rem" }}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export { RegisterForm };
