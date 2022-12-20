import React from 'react';
import Market from '../components/Market';
import Trending from '../components/Trending';

const Home = () => {
  return (
    <div className="container mx-auto">
      <Trending />
      <Market />
    </div>
  );
};

export default Home;
