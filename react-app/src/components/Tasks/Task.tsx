import { createStyles, Grid, makeStyles, Paper, Theme } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState } from "../../store/rootReducer";

const useStyles = makeStyles((theme: Theme) => createStyles({
  paper: {
    padding: theme.spacing(3)
  }
}));

const Task = () => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const state = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch()

  return (
    <Grid item xs={12} sm={6}>
      <Paper className={classes.paper}>
        
      </Paper>
    </Grid>
  );
};

export { Task };
