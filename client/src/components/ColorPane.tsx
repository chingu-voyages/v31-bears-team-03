
import React from 'react'
import './ColorPane.css'

const Button = () => {
    return(
        <p>Delete</p>
    )
}

interface ColorPaneProps {
    color: string,
    length: number
}

const ColorPane = ({color, length}:ColorPaneProps) => {
    return (
        <div className ="ColorPane" style={{
            width: `${100 / length}vw`,
            background: `${color}`,
          }}>
              <Button/>
        </div>
    )
}

export default ColorPane