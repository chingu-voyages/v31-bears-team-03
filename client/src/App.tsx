import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import './App.css';
import chroma from 'chroma-js';
import { v4 as uuidv4 } from 'uuid';
import DemoPage from './components/DemoPage';
import LandingPage from './components/LandingPage';
import Navbar from './components/Navbar';
import PalettePage from './components/PalettePage';
import ExplorePage from './components/ExplorePage';
import colorService from './services/colorService';

interface IState {
  colors: {
    id: string;
    color: string;
    lock: boolean;
  }[];
}

function App() {
  const [colors, setColors] = useState<IState['colors']>([]);
  const [colorMode, setColorMode] = useState<string>('monochrome');

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const getInitialColors = async () => {
      const colorSlug = location.pathname.split('/')?.[2];
      const initialColors = colorSlug
        ? colorService.getColorsArrFromSlug(colorSlug)
        : await colorService.generatePalette('monochrome');
      setColors(initialColors);
    };
    getInitialColors();
  }, []);

  useEffect(() => {
    generatePalette(chroma.random().hex().substring(1));
  }, [colorMode]);

  useEffect(() => {
    const colorSlug = colorService.getColorSlug(colors);
    if (location.pathname.startsWith(`/palette`)) {
      history.replace(`/palette/${colorSlug}`);
    } else if (location.pathname.startsWith(`/demo`)) {
      history.replace(`/demo/${colorSlug}`);
    }
  }, [colors]);

  const checkLockGenerate = async () => {
    let checkLock = colors.find((color) => color.lock === true);
    {
      console.log(typeof checkLock, ' type of checkLock');
    }
    if (typeof checkLock === 'undefined') {
      {
        console.log('Checklock is undefined');
      }
      let random = chroma.random().hex().substring(1);
      generatePalette(random);
    } else {
      {
        console.log(checkLock);
      }
      generateLockedPalette(checkLock?.color.substring(1));
    }
  };

  const generateLockedPalette = async (input: any) => {
    let response = colorService.getPalette(input, colorMode, colors.length);
    let returnedArray = (await response).data.colors;
    let newArray = [];
    for (let i = 0; i < returnedArray.length; i++) {
      if (colors[i].lock === true) {
        newArray.push({
          id: colors[i].id,
          color: colors[i].color,
          lock: colors[i].lock,
        });
      } else {
        newArray.push({
          id: uuidv4(),
          color: returnedArray[i].hex.value,
          lock: false,
        });
      }
    }
    if (colors.length === 0) return;
    console.log(newArray, ' Generated from Locked Palette');
    setColors(newArray);
  };
  const generatePalette = async (input: any) => {
    let response = colorService.getPalette(input, colorMode, colors.length);
    let returnedArray = (await response).data.colors;
    let newArray = [];
    for (let i = 0; i < returnedArray.length; i++) {
      newArray.push({
        id: uuidv4(),
        color: returnedArray[i].hex.value,
        lock: false,
      });
    }
    //newArray.sort(() => Math.random() - 0.5);
    if (colors.length === 0) return;
    console.log(newArray, 'Generated from Unlocked Palette');
    setColors(newArray);
  };

  const addColor = async () => {
    let first =
      colors[Math.floor(Math.random() * colors.length)].color.substring(1);
    let response = colorService.getPalette(first, colorMode, 15);
    let returnedArray = (await response).data.colors;
    console.log(colors.length);

    let newColor = {
      id: uuidv4(),
      color: returnedArray[Math.floor(Math.random() * 9)].hex.value,
      lock: false,
    };

    setColors((colors) => [...colors, newColor]);
  };

  const deleteColor = (id: string) => {
    const newPalette = colors.filter((item) => item.id !== id);
    setColors(newPalette);
  };

  const toggleLock = (id: string) => {
    const colorLock = colors.find((item) => item.id === id);
    //@ts-ignore
    const changedColor = {
      id: colorLock?.id,
      color: colorLock?.color,
      lock: !colorLock?.lock,
    };
    //@ts-ignore
    let index = colors.findIndex((color) => color.id === colorLock.id);
    console.log(index, ' + index');
    //@ts-ignore
    colors.splice(index, 1, changedColor);
    console.log(colors, ' + colors');
    setColors(colors);
  };

  if (colors.length === 0) {
    return null;
  }

  return (
    <div className="App">
      <Navbar colors={colors} />
      <Switch>
        <Route exact path="/">
          <LandingPage setColors={setColors} colorMode={colorMode} />
        </Route>
        <Route exact path={`/palette/:colorSlug`}>
          <PalettePage
            colors={colors}
            setColors={setColors}
            setColorMode={setColorMode}
            addColor={addColor}
            checkLockGenerate={checkLockGenerate}
            deleteColor={deleteColor}
            toggleLock={toggleLock}
          />
        </Route>
        <Route exact path={`/demo/:colorSlug}`}>
          <DemoPage
            colors={colors}
            setColorMode={setColorMode}
            generatePalette={generatePalette}
          />
        </Route>
        <Route exact path="/explore">
          <ExplorePage setColors={setColors} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
