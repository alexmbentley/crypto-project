import React from 'react';
import { useParams } from 'react-router-dom';
import ApiCaller from '../hooks/ApiCaller';

const CoinInfo = () => {
  const { id } = useParams();
  const { response } = ApiCaller(
    `coins/${id}?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
  );

  if (!response) {
    return (
      <div className="mt-2">
        <div className="flex items-center gap-2">
          <p className="text-2xl font-bold">Loading...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="mt-3">
      <div className="flex items-center gap-2">
        <p className="text-xl font-bold mb=5">About:</p>
      </div>
      <div className="flex items-center gap-2">
        <p className="mt-2">{response.description.en}</p>
      </div>
    </div>
  );
};

export default CoinInfo;
