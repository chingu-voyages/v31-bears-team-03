//@ts-nocheck
import chroma from "chroma-js";
import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import DemoPage from "./components/DemoPage";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import PalettePage from "./components/PalettePage";
import TemplatesPage from "./components/TemplatesPage";

const colorsFromBackend = [
  { color: "#5EFC8D" },
  { color: "#8ef9f3" },
  { color: "#93BEDF" },
  { color: "#8377D1" },
  { color: "#6D5A72" },
  { color: "#83fedd" },
];

function App() {
  const [colors, setColors] = useState(colorsFromBackend);

  const generatePalette = () => {
    let first = chroma.random().hex();
    let second = chroma.random().hex();
    let palette = chroma
      .scale([first, second])
      .mode("lch")
      .colors(colors.length);
    let newArray = [];
    palette.map((color) => {
      newArray.push({ color: color });
    });

    setColors(newArray);
  };

  const addColor = () => {
    let rand = "#" + Math.floor(Math.random() * 16777215).toString(16);
    let newColor = {
      color: rand,
    };
    setColors((colors) => [...colors, newColor]);
  };

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/palette">
          <PalettePage
            colors={colors}
            setColors={setColors}
            generatePalette={generatePalette}
            addColor={addColor}
          />
        </Route>
        <Route exact path="/demo">
          <DemoPage colors={colors} />
        </Route>
        <Route exact path="/templates">
          <TemplatesPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
