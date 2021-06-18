import React, { useState, useEffect } from 'react'

const Hue = ({ color, length, setNewColorButton, setShowHueButton }: any) => {
  const [light, setLight] = useState(false)
  const [hover, setHovered] = useState(false)

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

  const isHovered = () => {
    setHovered(true)
  }

  const notHovered = () => {
    setHovered(false)
  }

  return (
    <button
      className='colorCode'
      onMouseEnter={isHovered}
      onMouseLeave={notHovered}
      onClick={() => {
        setNewColorButton(color)
        setShowHueButton(false)
      }}
      style={{
        backgroundColor: `${color}`,
        height: `${100 / 20}vh`,
        width: `${100 / length}vw`,
      }}
    >
      {light ? (
        <p style={{ fontSize: '1.5em', color: 'white' }}>
          {hover ? `${color}` : ''}
        </p>
      ) : (
        <p style={{ fontSize: '1.5em', color: 'black' }}>
          {hover ? `${color}` : ''}
        </p>
      )}
    </button>
  )
}

export default Hue
