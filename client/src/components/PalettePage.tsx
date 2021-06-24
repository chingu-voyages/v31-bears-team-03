//@ts-nocheck
import React from 'react';
import Palette from './Palette';
import OptionsBar from './OptionsBar';

function PalettePage({
  colors,
  setColors,
  setColorMode,
  generatePalette,
  addColor,
  deleteColor,
}) {
  return (
    <div>
      <OptionsBar
        setColorMode={setColorMode}
        generatePalette={generatePalette}
        addColor={addColor}
        length={colors.length}
      />
      <Palette
        colors={colors}
        setColors={setColors}
        deleteColor={deleteColor}
      />
    </div>
  );
}

export default PalettePage;
