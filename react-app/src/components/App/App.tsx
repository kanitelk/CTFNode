import "./App.scss";

import React from "react";
// @ts-ignore
import { BrowserRouter as Router, Route } from "react-router-dom";

import { HomePage } from "../../pages/Home/HomePage";
import { Header } from "../Layout/Header/Header";
import { LoginPage } from "../../pages/Login/LoginPage";
import { RegisterPage } from "../../pages/Login/RegisterPage";
import { Sidebar } from "../Layout/Sidebar/Sidebar";
import {
  createStyles,
  CssBaseline,
  makeStyles,
  Theme,
} from "@material-ui/core";
import { RootState } from "../../store/rootReducer";
import { useSelector } from "react-redux";
import { ProtectedRoute } from "../../utils/ProtectedRoute";
import { UserRoleEnum } from "../../store/auth/types";
import { TasksPage } from "../../pages/Task/TasksPage";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

function App() {
  const classes = useStyles();
  const auth = useSelector((state: RootState) => state.authReducer);

  return (
    <div className="App" style={{ height: "100%", display: "flex" }}>
      <CssBaseline />
      <Router>
        <Header />
        {auth.isAuth && <Sidebar />}
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
      </Router>
    </div>
  );
}

export default App;
