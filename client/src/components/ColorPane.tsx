//@ts-nocheck
import React from 'react'

const ColorPane = (props) =>{
    return (
        <div className ="ColorPane" style={{
            width: `${100 / props.length}vw`,
            background: `#${props.color}`,
          }}>
            {console.log(props.color, props.length)}
        </div>
    )
}

export default ColorPane