import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './Palette.css';
import ColorPane from './ColorPane';

interface PaletteProps {
  colors: {
    id: string;
    color: string;
  }[];
  setColors: ([]) => void;
  deleteColor: () => void;
}

const Palette = ({ colors, setColors, deleteColor }: PaletteProps) => {
  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(colors);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setColors(items);
  };

  const displayDraggablePanels = () => {
    //@ts-ignore
    return colors.map(({ id, color }, index) => {
      return (
        <Draggable key={id} draggableId={id} index={index}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.draggableProps}>
              <div {...provided.dragHandleProps}>&lt;- -&gt;</div>
              <ColorPane
                id={id}
                color={color}
                colors={colors}
                setColors={setColors}
                length={colors.length}
                deleteColor={deleteColor}
              />
            </div>
          )}
        </Draggable>
      );
    });
  };

  return (
    <div className="Palette">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="characters" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={{ width: '100%', display: 'flex' }}
            >
              {displayDraggablePanels()}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Palette;
