import React from 'react';
import Chart from '../components/Chart';
import CoinDetails from '../components/CoinDetails';
import CoinInfo from '../components/CoinInfo';

const CryptoStats = () => {
  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <CoinDetails />
      <Chart />
      <CoinInfo />
    </div>
  );
};

export default CryptoStats;
