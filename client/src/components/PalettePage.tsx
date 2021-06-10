//@ts-nocheck
import React from "react";
import Palette from "./Palette";

function PalettePage({ colors, setColors, generatePalette, addColor }) {
  return (
    <div>
      {console.log(colors)}
      <button onClick={generatePalette}>Generate</button>
      <button onClick={addColor}>Add</button>
      <Palette colors={colors} setColors={setColors} />
    </div>
  );
}

export default PalettePage;
