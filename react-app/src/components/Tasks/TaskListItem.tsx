import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { ITask } from "../../store/tasks/types";
import { RootState } from "../../store/rootReducer";
import { UserRoleEnum } from "../../store/auth/types";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

type Props = {
  task: ITask;
};

const TaskListItem = ({ task }: Props) => {
  const classes = useStyles();
  const isAdmin = useSelector(
    (state: RootState) => state.auth.user?.role === UserRoleEnum.admin
  );

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography noWrap variant="h5" component="h2">
          {task.title}
        </Typography>
        <Typography noWrap variant="body2" component="p">
          {task.content}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          component={Link}
          to={`/tasks/${task._id}`}
          variant="contained"
          color="primary"
          size="small"
        >
          OPEN
        </Button>
        {isAdmin && (
          <Button
            component={Link}
            to={`/tasks/${task._id}/edit`}
            variant="contained"
            size="small"
          >
            EDIT
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export { TaskListItem };
