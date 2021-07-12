//@ts-nocheck
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import CardList from './CardList';
import exploreService from '../services/exploreService';
import { useAuth } from '../context/AuthContext';

function ExplorePage({ setColors }) {
  const [data, setData] = useState(null);
  const [displayData, setDisplayData] = useState(null);
  const [showAll, setShowAll] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    getData();
  }, []);

  const sortedData = displayData?.sort((a, b) => (a.likes < b.likes ? 1 : -1));

  const handleClickAllPalettes = () => {
    setDisplayData(data);
    setShowAll(true);
  };

  const handleClickMyPalettes = () => {
    const filteredData = [...displayData].filter((el) => {
      return user.likedPalettes.includes(el.colorPaletteID);
    });
    setDisplayData(filteredData);
    setShowAll(false);
  };

  const getData = async () => {
    try {
      const response = await exploreService.getPalettes();
      setData(response.data);
      let _data = response.data;
      if (!showAll) {
        _data = response.data.filter((el) => {
          return user.likedPalettes.includes(el.colorPaletteID);
        });
      }
      setDisplayData(_data);
    } catch (error) {
      console.log('error', error);
    }
  };

  console.log('displayData', displayData);
  if (!displayData) return null;

  const userHasPalettes = (user) => {
    return user?.likedPalettes?.length;
  };

  return (
    <div className="flex justify-center">
      <div className="mt-4 max-w-6xl">
        <h1 className="text-3xl sm:text-4xl m-10">
          {' '}
          {showAll ? 'All Palettes' : 'My Palettes'}
        </h1>
        <div>
          {showAll === false ? (
            <button
              onClick={handleClickAllPalettes}
              className="bg-blue-900 opacity-90 p-2 rounded-full text-white transition duration-300 hover:opacity-100"
            >
              All Palettes
            </button>
          ) : null}

          {userHasPalettes(user) && showAll === true ? (
            <button
              onClick={handleClickMyPalettes}
              className="bg-blue-900 opacity-90 p-2 rounded-full text-white transition duration-300 hover:opacity-100"
            >
              My Palettes
            </button>
          ) : null}
        </div>
        <CardList
          data={sortedData}
          getData={getData}
          setColors={setColors}
          user={user}
        />
      </div>
    </div>
  );
}

export default ExplorePage;
