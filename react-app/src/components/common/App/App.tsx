import "./App.scss";

import React, { Suspense, useEffect, useState } from "react";
// @ts-ignore
import { BrowserRouter as Router, Route } from "react-router-dom";

import { HomePage } from "../../pages/Home/HomePage";
import { Header } from "../Header/Header";
import Sidebar from "../Sidebar/Sidebar";
import {
  CircularProgress,
  createStyles,
  CssBaseline,
  makeStyles,
  Theme,
  withWidth,
} from "@material-ui/core";
import { ProtectedRoute } from "../ProtectedRoute";
import { useGate, useStore } from "effector-react";
import { AppGate, isAuth$ } from "../../../models/auth";
import { UserRole } from "../../../types";

const LoginPage = React.lazy(() => import("../../pages/Login/LoginPage"));
const RegisterPage = React.lazy(() => import("../../pages/Login/RegisterPage"));
const TasksPage = React.lazy(() => import("../../pages/Task"));

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
  const auth = useStore(isAuth$);

  useGate(AppGate);

  const [sidebar, setSidebar] = useState(auth);

  const toggle = () => {
    if (auth) {
      setSidebar(!sidebar);
    }
  };

  useEffect(() => {
    console.log(width);

    if (auth && width === "xs") {
      setSidebar(false);
    } else {
      setSidebar(true);
    }
  }, [width, auth]);

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
              role={UserRole.USER}
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
