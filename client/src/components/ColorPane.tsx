//@ts-nocheck
import React, { useState, useEffect } from 'react';
import './ColorPane.css';
import chroma from 'chroma-js';
import Hue from './Hue';

interface ColorPaneProps {
  id: string;
  color: string;
  length: number;
  colors: {
    id: string;
    color: string;
    lock: boolean;
  }[];
  setColors: ([]) => void;
  deleteColor: () => void;
  toggleLock: () => void;
  dragHandleProps: any;
}

const ColorPane = ({
  id,
  color,
  length,
  lock,
  colors,
  setColors,
  deleteColor,
  toggleLock,
  dragHandleProps,
}: ColorPaneProps) => {
  const [light, setLight] = useState(false);
  const [showHue, setShowHue] = useState(false);
  const [newColor, setNewColor] = useState(color);
  const [oldColor, setOldColor] = useState(color);

  color = newColor;

  const getNewColors = (colors, newColor) => {
    return colors.map((el) =>
      el.color === oldColor
        ? { id: el.id, color: newColor }
        : { id: el.id, color: el.color }
    );
  };

  useEffect(() => {
    checkColor({ color });
    const newColors = getNewColors(colors, newColor);
    setColors(newColors);
  }, [newColor]);

  const checkColor = ({ color }: any) => {
    let format = color.substring(1);
    let rgb = parseInt(format, 16);
    let r = (rgb >> 16) & 0xff;
    let g = (rgb >> 8) & 0xff;
    let b = (rgb >> 0) & 0xff;

    let luma = (0.299 * r + 0.587 * g + 0.114 * b) / 225;
    if (luma < 0.5) {
      return setLight(true);
    } else {
      return setLight(false);
    }
  };
  let scaleArr = [];

  for (let i = 1.8; i > 0.2; i -= 0.2) {
    scaleArr.push(
      chroma(`${color.substring(1)}`)
        .darken(i)
        .hex()
        .toUpperCase()
    );
  }

  scaleArr.push(color);

  for (let i = 0.1; i < 2; i += 0.2) {
    scaleArr.push(
      chroma(`${color.substring(1)}`)
        .brighten(i)
        .hex()
        .toUpperCase()
    );
  }

  const setNewColorButton = (color) => {
    setOldColor(newColor);
    setNewColor(color);
  };

  const setShowHueButton = () => {
    setShowHue(false);
  };

  const renderButtons = (light) => {
    return (
      <div className="flex flex-col h-full ">
        <button
          onClick={() => {
            navigator.clipboard.writeText(color);
          }}
          style={{
            outline: 'none',
            fontSize: '2em',
            color: light ? 'white' : 'black',
          }}
        >
          {color}
        </button>
        <div className="m-auto">
          <div>
            <div
              {...dragHandleProps}
              className={`${light ? 'text-white' : 'text-black'}`}
            >
              &lt;- -&gt;
            </div>
          </div>
          <div className={`${light ? 'text-white' : 'text-black'}`}>
            <button onClick={() => toggleLock(id)}>Lock</button>
          </div>
          <div className={`${light ? 'text-white' : 'text-black'}`}>
            <button onClick={() => deleteColor(id)}>Delete</button>
          </div>
          <div className={`${light ? 'text-white' : 'text-black'}`}>
            <button onClick={() => setShowHue(true)}>show hues</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div
        className="h-full "
        style={{
          width: `${100 / length}vw`,
          background: `${color}`,
          height: '100vh',
        }}
      >
        {showHue ? (
          <div>
            {scaleArr.map((a, i) => {
              return (
                <Hue
                  color={scaleArr[i]}
                  curColor={newColor}
                  length={length}
                  setNewColorButton={setNewColorButton}
                  setShowHueButton={setShowHueButton}
                  key={i}
                />
              );
            })}
          </div>
        ) : (
          renderButtons(light)
        )}
      </div>
    </div>
  );
};
export default ColorPane;
