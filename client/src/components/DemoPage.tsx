//@ts-nocheck
import React from "react";
import OptionsBar from "./OptionsBar";

function DemoPage({ colors, setColorMode, generatePalette }) {
  return (

    <div className="flex justify-center">
      <OptionsBar setColorMode={setColorMode} generatePalette={generatePalette}/>
      <h1 className="pt-20">Demo Page</h1>
    </div>
  );
}

export default DemoPage;
