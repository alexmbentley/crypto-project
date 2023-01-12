import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CoinData from '../hooks/CoinData';
import WatchlistCoins from '../components/WatchlistCoins';

const WatchList = () => {
  const { watchlist } = CoinData();
  const [watchData, setWatchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  axios.defaults.baseURL = 'https://api.coingecko.com/api/v3/';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const apiCalls = watchlist.map((data) => {
          return axios.get(
            `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${data.coin}&order=market_cap_desc&per_page=100&page=1&sparkline=false`
          );
        });

        const responses = await Promise.all(apiCalls);
        setWatchData(responses.map((response) => response.data[0]));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (watchlist.length === 0) {
      setTimeout(() => {
        setShowMessage(true);
      }, 1000);
    }

    fetchData();
  }, [watchlist]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="mt-8">
          <h1 className="text-xl font-bold m-2">Loading...</h1>
        </div>
      </div>
    );
  } else {
    return (
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold mt-3 mb-3">Watchlist</h2>
        {watchlist.length === 0 && showMessage && (
          <p className="text-2xl font-bold absoloute text-center">
            No coins in watchlist
          </p>
        )}
        {watchData.length === watchlist.length ? (
          <div>
            {watchData.map((coin) => (
              <WatchlistCoins key={coin.id} coin={coin} />
            ))}
          </div>
        ) : (
          <div>
            <p>not rendered yet</p>
          </div>
        )}
      </div>
    );
  }
};

export default WatchList;
