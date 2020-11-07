import {
  Button,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
  Typography,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar/AppBar";
import MenuIcon from "@material-ui/icons/Menu";
import * as React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      cursor: "pointer",
      textDecoration: "none",
      color: "#fff",
      fontWeight: 600,
    },
  })
);

const Header: React.FC = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography component={Link} className={classes.title} to="/">
          CTFNode
        </Typography>
        <Button component={Link} to="/login" color="inherit">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export { Header };
