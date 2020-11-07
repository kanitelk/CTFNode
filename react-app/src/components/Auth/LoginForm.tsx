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
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import AuthService from "../../services/AuthService";

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
  login: string;
  password: string;
};

function LoginForm() {
  const classes = useStyles();
  const { register, formState, handleSubmit } = useForm<LoginFormInput>({
    mode: "onChange",
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LoginFormInput) => {
    setLoading(true);
    try {
      let res = await AuthService.login_user(data);
      console.log(res);
    } catch (error) {
      console.log(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            inputRef={register({ required: true, minLength: 3 })}
            fullWidth
            id="login"
            label="Login"
            name="login"
            autoComplete="login"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            inputRef={register({ required: true, minLength: 4 })}
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!formState.isValid || loading}
          >
            {loading ? <CircularProgress size={20} /> : `Sign In`}
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

export { LoginForm };
