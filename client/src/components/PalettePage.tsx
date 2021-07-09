//@ts-nocheck
import React, {useState, useEffect} from 'react';
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
}) 

{
  const [width, setWidth] = useState<number>(window.innerWidth)

  function handleWindowSizeChange(){
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    }
  }, [])
  let isMobile: boolean = (width <= 768);
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
        isMobile={isMobile}
      />
    </div>
  );
}

export default PalettePage;
