import { useParams } from 'react-router-dom';
import ApiCaller from '../hooks/ApiCaller';
import { UserAuth } from '../context/AuthContext';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { useEffect, useState } from 'react';
import CoinData from '../hooks/CoinData';

const CoinDetails = () => {
  const { watchlist, getList } = CoinData();
  const { id } = useParams();
  const { user } = UserAuth();
  const [coin, setCoin] = useState();
  const [inWatchlist, setInWatchList] = useState(false);

  const { response } = ApiCaller(
    `coins/${id}?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
  );

  const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format;
  const number = new Intl.NumberFormat().format;

  useEffect(() => {
    setCoin(response);
  }, [response]);

  useEffect(() => {
    if (watchlist.length !== 0 && coin) {
      setInWatchList(watchlist.some((item) => item.coin === coin.id));
    }
  }, [watchlist, coin]);

  const addToWatchlist = async () => {
    console.log('Adding', coin.id, 'to watchlist');
    await addDoc(collection(db, `watchlist/${user.email}/coin`), {
      coin: coin.id,
    });
    getList();
    setInWatchList(true);
  };

  const deleteFromWatchlist = async () => {
    console.log('Removing', coin.id, 'from watchlist');
    const watchlistDoc = watchlist.find((item) => item.coin === coin.id);
    await deleteDoc(doc(db, `watchlist/${user.email}/coin`, watchlistDoc.id));
    getList();
    setInWatchList(false);
  };

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
    <div className="mt-2">
      <div className="flex items-center gap-2">
        <img className="w-10" src={response.image.small} alt={response.id} />
        <h1 className="text-2xl font-bold">
          {response.id.charAt(0).toUpperCase() + id.slice(1)} (
          {response.symbol.toUpperCase()})
        </h1>
        {user && Object.keys(user).length !== 0 && !inWatchlist && (
          <button
            onClick={addToWatchlist}
            className="text-white bg-slate-400 hover:bg-gray-700 hover:text-white',
          'block px-3 py-2 rounded-md text-base font-medium"
          >
            Add to watchlist
          </button>
        )}
        {user && Object.keys(user).length !== 0 && inWatchlist && (
          <button
            onClick={deleteFromWatchlist}
            className="text-white bg-slate-400 hover:bg-gray-700 hover:text-white',
          'block px-3 py-2 rounded-md text-base font-medium"
          >
            Remove from watchlist
          </button>
        )}
      </div>

      <p>Market Cap: {currency(response.market_data.market_cap.usd)}</p>
      <p>
        Fully Diluted Market Cap:{' '}
        {currency(response.market_data.fully_diluted_valuation.usd)}
      </p>
      <p>
        24 Hour Trading Volume:{' '}
        {currency(response.market_data.total_volume.usd)}
      </p>
      <p>
        Circulating Supply: {number(response.market_data.circulating_supply)}{' '}
      </p>
    </div>
  );
};

export default CoinDetails;
