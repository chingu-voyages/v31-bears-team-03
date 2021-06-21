//@ts-nocheck
import React from 'react';
import { useHistory } from 'react-router-dom';
import colorService from '../services/colorService';
import { v4 as uuidv4 } from 'uuid';
import { TrashIcon } from './Icons';

const Card = ({ palette, setColors, mockUser }) => {
  const history = useHistory();

  const handleClickView = () => {
    const colorSlug = colorService.getColorSlug(palette.colors);
    palette.colors.forEach((el) => (el.id = uuidv4()));
    setColors(palette.colors);
    history.push(`palette/${colorSlug}`);
  };

  const handleClickDelete = () => {
    if (window.confirm('Are you sure you want to delete this palette?')) {
      // then delete from users liked palettes in db
    }
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

        <div className="flex justify-between px-2 py-1 border-gray-100">
          <div className="flex justify-between w-2/4">
            <div>{palette.likes} likes</div>
            <button onClick={handleClickView}>View</button>
          </div>
          {mockUser?.likedPalettes.includes(palette.id) ? (
            <button onClick={handleClickDelete}>
              <TrashIcon />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Card;
