//@ts-nocheck
import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import DemoPage from "./components/DemoPage";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import PalettePage from "./components/PalettePage";
import TemplatesPage from "./components/TemplatesPage";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/palette">
          <PalettePage />
        </Route>
        <Route exact path="/demo">
          <DemoPage />
        </Route>
        <Route exact path="/templates">
          <TemplatesPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
