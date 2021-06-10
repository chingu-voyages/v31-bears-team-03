//@ts-nocheck
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage";
import PalettePage from "./components/PalettePage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/palette">
          <PalettePage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
