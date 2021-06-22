//@ts-nocheck
import React from 'react'

const OptionsBar = ({setColorMode, generatePalette, addColor, length}) => {
    const displayAdd = () => {
      if(length < 10){
        return <button style={{marginRight: "2%"}} onClick ={addColor}>Add Colors </button>
      } else {
        //
        return <p>Max</p>
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
      <button style={{marginRight: "2%"}} onClick ={generatePalette}>Generate Palette </button>
      {displayAdd()}
      {console.log(length)}
    </div>)
}

export default OptionsBar;