import { Badge } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { VisibilityOff } from "@material-ui/icons";
import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "effector-react";
import { authStore$ } from "../../../models/auth";

const useStyles = makeStyles({
  root: {
    minWidth: 300,
  },
  title: {
    marginRight: "25px",
  },
  score: {
    position: "absolute",
    right: "10px",
    top: "17px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "30px",
    height: "30px",
    background: "#f1f1f1",
    borderRadius: "50%",
    cursor: "default",
    overflow: "hidden",
    fontWeight: 600,
  },
});

const TaskListItem = ({ task }: any) => {
  const classes = useStyles();
  const auth = useStore(authStore$);

  return (
    <Badge color="error" max={999} badgeContent={task.score}>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography
            className={classes.title}
            noWrap
            variant="h5"
            component="h2"
          >
            {task.title}{" "}
            {auth.isAdmin && !task.visible && (
              <VisibilityOff style={{ marginLeft: "5px", marginTop: "5px" }} />
            )}
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
          {auth.isAdmin && (
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
    </Badge>
  );
};

export { TaskListItem };
