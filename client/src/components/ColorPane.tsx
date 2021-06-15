import React, { useState, useEffect } from 'react'
import './ColorPane.css'

const Button = () => {
  return <p>Delete</p>
}

interface ColorPaneProps {
  color: string
  length: number
}

const ColorPane = ({ color, length }: ColorPaneProps) => {
  const [light, setLight] = useState(false)
  useEffect(() => {
    checkColor({ color })
  }, [])

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

  return (
    <div
      className='ColorPane'
      style={{
        width: `${100 / length}vw`,
        background: `${color}`,
      }}
    >
      {light ? (
        <button onClick={() => {navigator.clipboard.writeText(color)}} style={{outline: "none", fontSize: '2em', color: 'white' }}>{color}</button>
      ) : (
        <button onClick={() => {navigator.clipboard.writeText(color)}} style={{outline: "none", fontSize: '2em', color: 'black' }}>{color}</button>
      )}
    </div>
  )
}

export default ColorPane
