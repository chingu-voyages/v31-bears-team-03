//@ts-nocheck
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import CardList from './CardList';
import exploreService from '../services/exploreService';

// const mockUser = undefined;
const mockUser = {
  likedPalettes: [2, 4],
};

function ExplorePage({ setColors }) {
  const [data, setData] = useState(null);
  const [listAll, setListAll] = useState(true);

  // fetch all palettes from server
  // const mockList = [
  //   {
  //     id: 1,
  //     likes: 20,
  //     colors: [
  //       { color: '#0A212B' },
  //       { color: '#144155' },
  //       { color: '#1D617F' },
  //       { color: '#676767' },
  //       { color: '#818181' },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     likes: 50,
  //     colors: [
  //       { color: '#C87687' },
  //       { color: '#CB8079' },
  //       { color: '#CD9B7C' },
  //       { color: '#CFB67E' },
  //       { color: '#D1D181' },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     likes: 10,
  //     colors: [
  //       { color: '#868598' },
  //       { color: '#89889D' },
  //       { color: '#A28C8B' },
  //       { color: '#A78F8E' },
  //       { color: '#91AC92' },
  //       { color: '#94B195' },
  //       { color: '#97B698' },
  //       { color: '#9ABB9C' },
  //     ],
  //   },
  //   {
  //     id: 4,
  //     likes: 2,
  //     colors: [
  //       { color: '#181025' },
  //       { color: '#3D2862' },
  //       { color: '#707070' },
  //     ],
  //   },
  // ];

  //const list = data.sort((a, b) => (a.likes < b.likes ? 1 : -1));

  const handleClickAllPalettes = () => {
    setData(list);
    setListAll(true);
  };

  const handleClickMyPalettes = () => {
    const filteredData = data.filter((el) =>
      mockUser.likedPalettes.includes(el.id)
    );
    setData(filteredData);
    setListAll(false);
  };

  const getData = async () => {
    let response =  await exploreService.getPalettes()
    setData(response.data)
  }


  useEffect(() => {
    getData();
  }, []);

  if (!data) return null;

  return (
    <div className="flex justify-center">
      <div className="mt-4 max-w-6xl">
        <h1 className="text-3xl sm:text-4xl m-10">
          {' '}
          {listAll ? 'All Palettes' : 'My Palettes'}
        </h1>
        <div>
          {listAll === false ? (
            <button
              onClick={handleClickAllPalettes}
              className="bg-blue-900 opacity-90 p-2 rounded-full text-white transition duration-300 hover:opacity-100"
            >
              All Palettes
            </button>
          ) : null}

          {mockUser && listAll === true ? (
            <button
              onClick={handleClickMyPalettes}
              className="bg-blue-900 opacity-90 p-2 rounded-full text-white transition duration-300 hover:opacity-100"
            >
              My Palettes
            </button>
          ) : null}
        </div>
        <CardList data={data} setColors={setColors} mockUser={mockUser} />
      </div>
    </div>
  );
}

export default ExplorePage;
