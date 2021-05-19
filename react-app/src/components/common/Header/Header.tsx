import {
  Button,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Toolbar,
  Tooltip,
  Typography,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar/AppBar";
import MenuIcon from "@material-ui/icons/Menu";
import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useStore } from "effector-react";
import { authStore$, doLogout } from "../../../models/auth";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      cursor: "pointer",
      textDecoration: "none",
      color: "#fff",
      fontWeight: 600,
      fontSize: "1.25rem",
      flexGrow: 1,
    },
    menu: {
      flexGrow: 1,
      marginLeft: theme.spacing(2),
      marginTop: "3px",
    },
  })
);

const Header = ({ toggle }: { toggle: Function }) => {
  const classes = useStyles();
  const router = useHistory();

  const auth = useStore(authStore$);

  const logoutHandler = () => {
    doLogout();
    router.push("/");
  };

  return (
    <AppBar className={classes.appBar} position="fixed">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={() => toggle()}
        >
          <MenuIcon />
        </IconButton>
        <Typography component={Link} className={classes.title} to="/">
          CTFNode
        </Typography>
        {auth.isAuth ? (
          <>
            <Tooltip title="Profile">
              <Button component={Link} to="/profile" color="inherit">
                {auth.user?.login}
              </Button>
            </Tooltip>
            <Tooltip title="Logout">
              <ExitToAppIcon onClick={logoutHandler} />
            </Tooltip>
          </>
        ) : (
          <Button component={Link} to="/login" color="inherit">
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export { Header };
