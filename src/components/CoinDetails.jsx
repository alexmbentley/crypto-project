import { useParams } from 'react-router-dom';
import ApiCaller from '../hooks/ApiCaller';
import { UserAuth } from '../context/AuthContext';
import { addDoc, collection, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useEffect, useState } from 'react';

const CoinDetails = () => {
  const { id } = useParams();
  const { user } = UserAuth();
  const [coin, setCoin] = useState();

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

  const addToWatchlist = async () => {
    console.log('adding', coin.id, 'to watchlist');
    await addDoc(collection(db, `watchlist/${user.uid}/coin`), {
      coin: coin.id,
    });
  };

  if (!response) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-2">
      <div className="flex items-center gap-2">
        <img className="w-10" src={response.image.small} alt={response.id} />
        <h1 className="text-2xl font-bold">
          {response.id.charAt(0).toUpperCase() + id.slice(1)} (
          {response.symbol.toUpperCase()})
        </h1>
        {user && (
          <button
            onClick={addToWatchlist}
            className="text-white bg-slate-400 hover:bg-gray-700 hover:text-white',
          'block px-3 py-2 rounded-md text-base font-medium"
          >
            Add to watchlist
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
