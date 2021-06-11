
import React from 'react'
import './ColorPane.css'

const Button = () => {
    return(
        <p>Delete</p>
    )
}

interface Props {
    color: string,
    length: number
}

const ColorPane: React.FC<Props> = ({color, length}) => {
    return (
        <div className ="ColorPane" style={{
            width: `${100 / length}vw`,
            background: `${color}`,
          }}>
              <Button/>
            {console.log(color, length)}
        </div>
    )
}

export default ColorPane