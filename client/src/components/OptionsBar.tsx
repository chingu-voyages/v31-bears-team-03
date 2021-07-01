//@ts-nocheck
import React from 'react'
import exploreService from '../services/exploreService'

const OptionsBar = ({colors ,setColorMode, checkLockGenerate, addColor, length}) => {

    const saveColor = () => {
      exploreService.addPalette(colors);
    }

    const displayAdd = () => {
      if(length < 10){
        return <button style={{marginRight: "2%"}} onClick ={addColor}>Add Colors </button>
      } else {
        return <p>Max colors</p>
      }
    }
    return(<div>
      <button style={{marginRight: "2%"}} onClick={() => setColorMode('analogic')}>Analogic </button>
      <button style={{marginRight: "2%"}} onClick={() => setColorMode('analogic-complement')}>Analogic Complement </button>
      <button style={{marginRight: "2%"}} onClick={() => setColorMode('triad')}>Triadic </button>
      <button style={{marginRight: "2%"}} onClick={() => setColorMode('quad')}>Quadratic </button>
      <button style={{marginRight: "2%"}} onClick={() => setColorMode('complement')}>Complement </button>
      <button style={{marginRight: "2%"}} onClick={() => setColorMode('monochrome')}>Monochrome </button>
      <button style={{marginRight: "2%"}} onClick={() => setColorMode('monochrome-dark')}>Monochrome Dark </button>
      <button style={{marginRight: "2%"}} onClick={() => setColorMode('monochrome-light')}>Monochrome Light </button>
      <button style={{marginRight: "2%"}} onClick ={checkLockGenerate}>Generate Palette </button>
      {displayAdd()}
      <button style={{marginRight: "2%"}} onClick ={saveColor}>Save Color</button>
    </div>)
}

export default OptionsBar;