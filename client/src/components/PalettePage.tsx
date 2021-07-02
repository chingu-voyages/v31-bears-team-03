//@ts-nocheck
import React from 'react';
import Palette from './Palette';
import OptionsBar from './OptionsBar';

function PalettePage({
  colors,
  colorMode,
  setColors,
  setColorMode,
  checkLockGenerate,
  addColor,
  deleteColor,
  toggleLock,
}) {
  return (
    <div>
      <OptionsBar
        colorMode={colorMode}
        setColorMode={setColorMode}
        checkLockGenerate={checkLockGenerate}
        addColor={addColor}
        length={colors.length}
        colors={colors}
      />
      <Palette
        colors={colors}
        setColors={setColors}
        deleteColor={deleteColor}
        toggleLock={toggleLock}
      />
    </div>
  );
}

export default PalettePage;
