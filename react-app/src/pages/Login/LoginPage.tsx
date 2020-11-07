import { Grid, makeStyles, Typography } from "@material-ui/core";
import * as React from "react";
import { LoginForm } from "../../components/Auth/LoginForm";

const useStyles = makeStyles({
  root: {
    height: "50vh",
  },
});

const LoginPage = () => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.root}
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item spacing={2}>
        <LoginForm />
      </Grid>
    </Grid>
  );
};

export { LoginPage };
