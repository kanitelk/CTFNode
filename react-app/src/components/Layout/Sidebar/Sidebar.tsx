import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import DashboardIcon from "@material-ui/icons/Dashboard";
import GroupIcon from "@material-ui/icons/Group";
import FlagIcon from "@material-ui/icons/Flag";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import withWidth from "@material-ui/core/withWidth";
import { useStore } from "effector-react";
import { isAuth$ } from "../../../models/auth";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: "auto",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

const Sidebar = (props: { width: string }) => {
  const classes = useStyles();
  const isAuth = useStore(isAuth$);
  const [open, setOpen] = useState(() => isAuth);

  useEffect(() => {
    if (isAuth) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [isAuth]);

  return (
    <>
      {open ? (
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <List>
              <ListItem button component={Link} to="/tasks">
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary={"Tasks"} />
              </ListItem>
              <ListItem button component={Link} to="/teams">
                <ListItemIcon>
                  <FlagIcon />
                </ListItemIcon>
                <ListItemText primary={"Teams"} />
              </ListItem>
              <ListItem button component={Link} to="/users">
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary={"Users"} />
              </ListItem>
            </List>
            <Divider />
          </div>
        </Drawer>
      ) : (
        <></>
      )}
    </>
  );
};

export default withWidth()(Sidebar);
