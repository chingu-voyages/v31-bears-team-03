//@ts-nocheck
import React from "react";
import Palette from "./Palette";
import OptionsBar from "./OptionsBar"

function PalettePage({ colors, setColors, setColorMode, generatePalette, addColor}) {
  return (
    <div>
      <OptionsBar setColorMode={setColorMode} generatePalette={generatePalette} addColor={addColor}/>
      <Palette colors={colors} setColors={setColors} />
    </div>
  );
}

export default PalettePage;
