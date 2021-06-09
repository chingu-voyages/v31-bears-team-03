//@ts-nocheck
import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./Palette.css";
import ColorPane from './ColorPane'

function Palette({colors, setColors}) {

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(colors);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setColors(items);
  };

  const displayDraggablePanels = () => {
    return (
      colors.map(({ id, color }, index) => {
        return (
          <Draggable key={color} draggableId={color} index={index}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
              >
                  <div {...provided.dragHandleProps}>&lt;- -&gt;</div>
                  <ColorPane color={color} length={colors.length}/>
              </div>
            )}
          </Draggable>
        );
      })
    )
  }

  return (
    <div className="Palette">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="characters" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ width: "100%", display: "flex" }}
            >
              {displayDraggablePanels()}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Palette;
