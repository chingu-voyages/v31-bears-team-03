//@ts-nocheck
import React from "react";
import Palette from "./Palette";

function PalettePage({ colors, setColors}) {
  return (
    <div>
      {console.log(colors)}
      <Palette colors={colors} setColors={setColors} />
    </div>
  );
}

export default PalettePage;
