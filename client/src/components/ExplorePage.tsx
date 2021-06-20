//@ts-nocheck
import React from 'react';
import CardList from './CardList';

function ExplorePage({setColors}) {
  return (
    <div className="mt-4">
      <h1>All Palettes</h1>
      <CardList setColors={setColors} />
    </div>
  );
}

export default ExplorePage;
