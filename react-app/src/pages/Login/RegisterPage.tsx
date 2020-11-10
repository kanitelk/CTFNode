import { Grid, makeStyles } from "@material-ui/core";
import * as React from "react";

import { RegisterForm } from "../../components/Auth/RegisterForm";

const useStyles = makeStyles({
  root: {
    height: "50vh",
  },
});

const RegisterPage = () => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.root}
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item>
        <RegisterForm />
      </Grid>
    </Grid>
  );
};

export default RegisterPage;
