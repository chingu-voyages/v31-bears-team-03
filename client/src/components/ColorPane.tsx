//@ts-nocheck
import React from 'react'
import './ColorPane.css'

const Button = () => {
    return(
        <p>Delete</p>
    )
}


const ColorPane = (props) =>{
    return (
        <div className ="ColorPane" style={{
            width: `${100 / props.length}vw`,
            background: `${props.color}`,
          }}>
              <Button/>
            {console.log(props.color, props.length)}
        </div>
    )
}

export default ColorPane