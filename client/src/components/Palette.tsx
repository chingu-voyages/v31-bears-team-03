//@ts-nocheck
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Palette.css';

const colorsFromBackend = [
    {color: '5EFC8D'},
    {color: '8ef9f3'},
    {color: '93BEDF'},
    {color: '8377D1'},
    {color: '6D5A72'},
    {color: '83fedd'}
]

function Palette() {
    const [colors, setColors] = useState(colorsFromBackend)

    const onDragEnd = (result) => {
        if (!result.destination) return;
    
        const items = Array.from(colors);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setColors(items);
    }



  return (
    <div className="Palette">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="characters" direction="horizontal">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} style={{width: "100%", display: 'flex'}}>
                {colors.map(({id, color}, index) => {
                  return (
                    <Draggable key={color} draggableId={color} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <div className="ColorPane" style={{width:`${100/colors.length}vw`, background: `#${color}`}}>
                            {color}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
    </div>
  );
}

export default Palette;