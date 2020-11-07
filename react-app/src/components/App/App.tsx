import "./App.scss";

import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { HomePage } from "../../pages/Home/HomePage";
import { Header } from "../Layout/Header/Header";

function App() {
  return (
    <div className="App" style={{height: '100%'}}>
      <Router>
        <Header />
        <Route path="/" exact component={HomePage} />
      </Router>
    </div>
  );
}

export default App;
