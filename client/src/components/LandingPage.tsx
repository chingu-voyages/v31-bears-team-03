//@ts-nocheck
import React from "react";
import { useHistory } from "react-router-dom";
import colorService from "../services/colorService";

function Landing({ setColors, colorMode }) {
  const history = useHistory();

  const handleClickGenerate = async () => {
    const colorsArr = await colorService.generatePalette(colorMode);
    const colorSlug = colorService.getColorSlug(colorsArr);
    setColors(colorsArr);
    history.push(`palette/${colorSlug}`);
  };

  return (
    <div className="mt-20">
      <div className="flex justify-center">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl">
          Welcome to UNNAMED APP!
        </h1>
      </div>
      <div className="flex justify-center mt-20">
        <p>*Description of app here*</p>
      </div>
      <div className="flex justify-center mt-40 text-xl">
        <button
          onClick={handleClickGenerate}
          className="bg-blue-900 opacity-90 p-6 rounded-full text-white transition duration-300 hover:opacity-100"
        >
          Generate Palette
        </button>
      </div>
      <div className="flex justify-center mt-20">
        <p>*animated gif of app in action here*</p>
      </div>
    </div>
  );
}

export default Landing;
