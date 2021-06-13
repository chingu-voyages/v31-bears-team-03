//@ts-nocheck
import chroma from "chroma-js";
import React, { useState, useEffect } from "react";
import {
  Switch,
  Route,
  useHistory,
  useParams,
  useLocation,
} from "react-router-dom";
import "./App.css";
import DemoPage from "./components/DemoPage";
import LandingPage from "./components/LandingPage";
import Navbar from "./components/Navbar";
import PalettePage from "./components/PalettePage";
import TemplatesPage from "./components/TemplatesPage";

import colorService from "./services/colorService";

interface IState {
  colors: {
    color: string;
  }[];
}

const colorsFromBackend = [
  { color: "#5EFC8D" },
  { color: "#8ef9f3" },
  { color: "#93BEDF" },
  { color: "#8377D1" },
  { color: "#6D5A72" },
];

function App() {
  let history = useHistory();
  const location = useLocation();
  console.log("location", location);

  const [colors, setColors] = useState<IState["colors"]>([]);
  const [colorMode, setColorMode] = useState<string>(null);

  const hasColorSlug = true;

  const getColorSlug = (colors) => {
    const colorSlug = location.pathname.split("/")[2];
    if (colorSlug.length) {
      if (colors.length) {
        return colors
          .map((el) => el.color)
          .join("")
          .replaceAll("#", "-")
          .slice(1);
      }
      return colorSlug;
    } else {
      return "5EFC8D-7F270E-AE3512-DD4216-ED6139";
    }
  };

  const colorObjFromSlug = (colorSlug) => {
    const colors = [];
    colorSlug.split("-").forEach((el) => colors.push({ color: "#" + el }));
    return colors;
  };

  const currentColors = (colors) => {
    if (hasColorSlug) {
      const slug = getColorSlug(colors);
      colors = colorObjFromSlug(slug);
    } else {
      colors = colorsFromBackend;
    }
    return colors;
  };

  useEffect(() => {
    setColors(currentColors(colors));
  }, []);

  useEffect(() => {
    generatePalette();
  }, [colorMode]);

  const generatePalette = async () => {
    let first = chroma.random().hex().substring(1);
    let response = colorService.getPalette(first, colorMode, colors.length);
    let returnedArray = (await response).data.colors;
    let newArray = [];
    for (let i = 0; i < returnedArray.length; i++) {
      newArray.push({ color: returnedArray[i].hex.value });
    }
    setColors(newArray);
    console.log("newArray", newArray);
  };

  const addColor = () => {
    let rand = "#" + Math.floor(Math.random() * 16777215).toString(16);
    let newColor = {
      color: rand,
    };
    setColors((colors) => [...colors, newColor]);
  };

  useEffect(() => {
    const colorSlug = getColorSlug(colors);
    history.push(`/palette/${colorSlug}`);
  }, [colors]);

  if (colors.length === 0) {
    return null;
  }

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route exact path={`/palette/:${getColorSlug(colors)}`}>
          <PalettePage
            colors={colors}
            setColors={setColors}
            setColorMode={setColorMode}
            addColor={addColor}
            generatePalette={generatePalette}
          />
        </Route>
        <Route exact path={`/demo/:${getColorSlug(colors)}`}>
          <DemoPage
            colors={colors}
            setColorMode={setColorMode}
            generatePalette={generatePalette}
          />
        </Route>
        <Route exact path="/templates">
          <TemplatesPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
