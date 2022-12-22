import React from 'react';
import Market from '../components/Market';
import Trending from '../components/Trending';

const Home = () => {
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <Trending />
      <Market />
    </div>
  );
};

export default Home;
