//@ts-nocheck
import React from 'react';

const Card = ({ palette }) => {
  console.log('palette', palette);
  return (
    <div className="transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
      <div className="flex flex-col justify-between bg-white shadow-md rounded-sm w-64 h-32 ">
        <div className="flex flex-row justify-between h-full">
          {palette.colors.map((color, i) => {
            return (
              <div
                key={i}
                className="h-full w-full"
                style={{ backgroundColor: `${color.color}`, height: '100%' }}
              >
              </div>
            );
          })}
        </div>

        <div className="flex flex-row px-2 border-gray-100">
          <div>{palette.likes} likes</div>
          <div className="ml-auto">trash</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
