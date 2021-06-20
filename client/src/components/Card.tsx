//@ts-nocheck
import React from 'react';
import { useHistory } from 'react-router-dom';
import colorService from '../services/colorService';
import { v4 as uuidv4 } from 'uuid';

const Card = ({ palette, setColors }) => {
  const history = useHistory();

  const handleClickView = () => {
    const colorSlug = colorService.getColorSlug(palette.colors);
    palette.colors.forEach((el) => (el.id = uuidv4()));
    setColors(palette.colors);
    history.push(`palette/${colorSlug}`);
  };

  return (
    <div className="transition duration-300 ease-in-out transform hover:shadow-xl">
      <div className="flex flex-col justify-between bg-white shadow-md rounded-sm w-64 h-32 ">
        <div className="flex flex-row justify-between h-full">
          {palette.colors.map((color, i) => {
            return (
              <div
                key={i}
                className="h-full w-full"
                style={{ backgroundColor: `${color.color}`, height: '100%' }}
              ></div>
            );
          })}
        </div>

        <div className="flex justify-between px-2 border-gray-100">
          <div className="flex justify-between w-2/4">
            <div>{palette.likes} likes</div>
            <button onClick={handleClickView}>View</button>
          </div>
          <div className="">trash</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
