import "./App.scss";

import React from "react";
// @ts-ignore
import { BrowserRouter as Router, Route } from "react-router-dom";

import { HomePage } from "../../pages/Home/HomePage";
import { Header } from "../Layout/Header/Header";
import { LoginPage } from "../../pages/Login/LoginPage";
import { RegisterPage } from "../../pages/Login/RegisterPage";

function App() {
  return (
    <div className="App" style={{ height: "100%" }}>
      <Router>
        <Header />
        <Route path="/" exact component={HomePage} />
        <Route path="/login" exact component={LoginPage} />
        <Route path="/register" exact component={RegisterPage} />
      </Router>
    </div>
  );
}

export default App;
