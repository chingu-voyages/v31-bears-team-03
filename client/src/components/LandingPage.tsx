//@ts-nocheck
import React from "react";
import { Link } from "react-router-dom";

function Landing() {
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
        <Link to="/palette/5EFC8D-8ef9f3-8377D1-93BEDF-6D5A72">
          <button className="bg-blue-900 opacity-90 p-6 rounded-full text-white transition duration-300 hover:opacity-100">
            Generate Palette
          </button>
        </Link>
      </div>
      <div className="flex justify-center mt-20">
        <p>*animated gif of app in action here*</p>
      </div>
    </div>
  );
}

export default Landing;
