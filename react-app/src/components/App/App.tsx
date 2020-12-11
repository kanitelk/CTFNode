import "./App.scss";

import React, { Suspense, useEffect, useState } from "react";
// @ts-ignore
import { BrowserRouter as Router, Route } from "react-router-dom";

import { HomePage } from "../../pages/Home/HomePage";
import { Header } from "../Layout/Header/Header";
import Sidebar from "../Layout/Sidebar/Sidebar";
import {
  CircularProgress,
  createStyles,
  CssBaseline,
  makeStyles,
  Theme,
  withWidth,
} from "@material-ui/core";
import { RootState } from "../../store/rootReducer";
import { useSelector } from "react-redux";
import { ProtectedRoute } from "../../utils/ProtectedRoute";
import { UserRoleEnum } from "../../store/auth/types";

const LoginPage = React.lazy(() => import("../../pages/Login/LoginPage"));
const RegisterPage = React.lazy(() => import("../../pages/Login/RegisterPage"));
const TasksPage = React.lazy(() => import("../../pages/Task/TasksPage"));

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      marginTop: "4rem",
    },
  })
);

function App({ width }: { width: string }) {
  const classes = useStyles();
  const auth = useSelector((state: RootState) => state.auth);

  const [sidebar, setSidebar] = useState(auth.isAuth);

  const toggle = () => {
    if (auth.isAuth) {
      setSidebar(!sidebar);
    }
  };

  useEffect(() => {
    console.log(width);

    if (auth.isAuth && width === "xs") {
      setSidebar(false);
    } else {
      setSidebar(true);
    }
  }, [width, auth.isAuth]);

  return (
    <div className="App" style={{ height: "100%", display: "flex" }}>
      <CssBaseline />
      <Router>
        <Header toggle={toggle} />
        {sidebar && <Sidebar />}
        <Suspense fallback={<CircularProgress />}>
          <main className={classes.content}>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/register" exact component={RegisterPage} />
            <ProtectedRoute
              path="/tasks"
              role={UserRoleEnum.user}
              exact
              component={TasksPage}
            />
          </main>
        </Suspense>
      </Router>
    </div>
  );
}

export default withWidth()(App);
