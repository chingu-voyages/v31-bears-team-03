//@ts-nocheck
import chroma from "chroma-js";
import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import DemoPage from "./components/DemoPage";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import PalettePage from "./components/PalettePage";
import TemplatesPage from "./components/TemplatesPage";

import colorService from "./services/colorService";

interface IState {
  colors: {
    color: string  
  }[]
}

const colorsFromBackend = [
  { color: "#5EFC8D" },
  { color: "#8ef9f3" },
  { color: "#93BEDF" },
  { color: "#8377D1" },
  { color: "#6D5A72" },
];


function App() {
  const [colors, setColors] = useState<IState["colors"]>(colorsFromBackend);
  const [colorMode, setColorMode] = useState<string>('monochrome')

  useEffect(() => {
    generatePalette()
  },[colorMode])

  const generatePalette = async () => {
    let first = chroma.random().hex().substring(1)
    let response = colorService.getPalette(first, colorMode, colors.length)
    let returnedArray = (await response).data.colors
    let newArray = []
    for(let i = 0; i<returnedArray.length; i++){
      newArray.push({color: returnedArray[i].hex.value})
    }
    setColors(newArray)
    console.log(newArray)

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
            setColorMode={setColorMode}
            addColor={addColor}
            generatePalette={generatePalette}
          />
        </Route>
        <Route exact path="/demo">
          <DemoPage colors={colors} setColorMode={setColorMode} generatePalette={generatePalette}/>
        </Route>
        <Route exact path="/templates">
          <TemplatesPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
