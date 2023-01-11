import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MarketCoins from '../components/MarketCoins';
import CoinData from '../hooks/CoinData';

const WatchList = () => {
  const { watchlist } = CoinData();
  const [watchData, setWatchData] = useState([]);
  const [loading, setLoading] = useState(true);

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

    fetchData();
  }, [watchlist]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="mt-8">
          <h1 className="text-xl font-bold mb-2">Loading...</h1>
        </div>
      </div>
    );
  } else {
    return (
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        {console.log(watchlist, watchData, '<<< watchlist and watchdata')}

        {watchData.length === watchlist.length ? (
          <div>
            {console.log(watchlist.length, watchData.length)}
            {watchData.map((coin) => (
              <MarketCoins key={coin.id} coin={coin} />
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
