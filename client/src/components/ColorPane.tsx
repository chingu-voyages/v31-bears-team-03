//@ts-nocheck
import React, { useState, useEffect } from 'react'
import './ColorPane.css'
import chroma from 'chroma-js'
import Hue from './Hue'

interface ColorPaneProps {
  color: string
  length: number
}

const ColorPane = ({ color, length }: ColorPaneProps) => {
  const [light, setLight] = useState(false)
  const [showHue, setShowHue] = useState(false)
  const [newColor, setNewColor] = useState(color)

  color = newColor;

  useEffect(() => {
    checkColor({ color })
  }, [newColor])

  const checkColor = ({ color }: any) => {
    let format = color.substring(1)
    let rgb = parseInt(format, 16)
    let r = (rgb >> 16) & 0xff
    let g = (rgb >> 8) & 0xff
    let b = (rgb >> 0) & 0xff

    let luma = (0.299 * r + 0.587 * g + 0.114 * b) / 225
    if (luma < 0.5) {
      return setLight(true)
    } else {
      return setLight(false)
    }
  }
  let scaleArr = []

  for (let i = 2; i > 0.1; i -= 0.2) {
    scaleArr.push(
      chroma(`${color.substring(1)}`)
        .darken(i)
        .hex()
    )
  }

  for (let i = 0.1; i < 2; i += 0.2) {
    scaleArr.push(
      chroma(`${color.substring(1)}`)
        .brighten(i)
        .hex()
    )
  }

  const setNewColorButton = (color) => {
    setNewColor(color)
  }

  const setShowHueButton = () => {
    setShowHue(false)
  }
  return (
    <div>
      {showHue ? (
        <button onClick={() => setShowHue(false)}>hide hues</button>
      ) : (
        <button onClick={() => setShowHue(true)}>show hues</button>
      )}
      {showHue ? (
        <div>
          {scaleArr.map((a, i) => {
            return <Hue color={scaleArr[i]} length={length} setNewColorButton={setNewColorButton} setShowHueButton={setShowHueButton} key={i}/>
          })}
        </div>
      ) : (
        <div
          className='ColorPane'
          style={{
            width: `${100 / length}vw`,
            background: `${color}`,
          }}
        >
          {light ? (
            <p style={{ fontSize: '2em', color: 'white' }}>{color}</p>
          ) : (
            <p style={{ fontSize: '2em', color: 'black' }}>{color}</p>
          )}
        </div>
        
      )}
    </div>
  )
}

export default ColorPane
