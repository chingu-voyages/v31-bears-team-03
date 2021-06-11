//@ts-nocheck
import chroma, { hex } from "chroma-js";
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

  const monochrome = async () => {
    setColorMode('monochrome')
  }

  const analogic = () => {
    setColorMode('analogic')
  }

  const triad = () => {
    setColorMode('triad')
  }

  const monochromeDark = () => {
    setColorMode('monochrome-dark')
  }

  const monochromeLight = () => {
    setColorMode('monochrome-light')
  }

  const complement = () => {
    setColorMode('complement')
  }

  const analogicComplement = () => {
    setColorMode('analogic-complement')
  }

  const quad = () => {
    setColorMode('quad')
  }

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
      <button style={{marginRight: "2%"}} onClick={analogic}>Analogic </button>
      <button style={{marginRight: "2%"}} onClick={analogicComplement}>Analogic Complement </button>
      <button style={{marginRight: "2%"}} onClick={monochrome}>Monochrome </button>
      <button style={{marginRight: "2%"}} onClick={triad}>Triadic </button>
      <button style={{marginRight: "2%"}} onClick={quad}>Quadratic </button>
      <button style={{marginRight: "2%"}} onClick={complement}>Complement </button>
      <button style={{marginRight: "2%"}}onClick={monochromeDark}>Monochrome Dark </button>
      <button style={{marginRight: "2%"}} onClick={monochromeLight}>Monochrome Light </button>
      <button style={{marginRight: "2%"}} onClick={generatePalette}>generatePalette </button>
      <button style={{marginRight: "2%"}} onClick ={addColor}>Add Colors </button>
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path="/palette">
          <PalettePage
            colors={colors}
            setColors={setColors}
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
