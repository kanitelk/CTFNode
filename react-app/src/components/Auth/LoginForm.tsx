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
import { useStore } from "effector-react";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { authStore$, doLogin } from "../../models/auth";

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

export type LoginFormInput = {
  username: string;
  password: string;
};

function LoginForm() {
  const classes = useStyles();

  const auth = useStore(authStore$);

  const router = useHistory();
  const { control, formState, handleSubmit } = useForm<LoginFormInput>({
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormInput) => {
    doLogin(data);
    // router.push("/");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="username"
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
            name="password"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                type="password"
                margin="normal"
                required
                fullWidth
                autoFocus
              />
            )}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            // @ts-ignore
            disabled={!formState.isValid || auth.loginPending}
          >
            {auth.loginPending ? <CircularProgress size={20} /> : `Sign In`}
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
                to="/register"
                fullWidth
                variant="contained"
                color="default"
                style={{ marginTop: "1rem" }}
              >
                Create Account
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

export default LoginForm;
