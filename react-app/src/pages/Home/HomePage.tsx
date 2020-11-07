import { Grid, makeStyles, Typography } from "@material-ui/core";
import * as React from "react";

const useStyles = makeStyles({
  root: {
    height: "60vh",
  },
});

const HomePage = () => {
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
        <Typography variant="h4" component="h4">
          It's time to start CTF!
        </Typography>
      </Grid>
    </Grid>
  );
};

export { HomePage };
