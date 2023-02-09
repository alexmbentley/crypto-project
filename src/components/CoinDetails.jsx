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

  const { response, error } = ApiCaller(
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
          {!response && error !== '' && error.message === 'Network Error' ? (
            <p className="mt-5">
              {console.log(error)}
              Too many requests. I couldn't afford the APIs paid verion, sorry!{' '}
              <br />
              Wait 5 minutes and try again or change ip addresss.
            </p>
          ) : !response && error !== '' && error.response.status === 404 ? (
            <p className="mt-5">{console.log(error)}Coin doesn't exist!</p>
          ) : (
            <p className="my-5 text-xl font-bold">
              {console.log(error)}Loading...
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-2">
      <div className="flex items-center gap-2 my-4">
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
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-5 rounded border-black border mt-2">
        <div className="col-span-1 my-5 ">
          <div className="h-full">
            <div className="grid grid-cols-1 gap-5 lg:gap-2 sm:grid-cols-2 h-full p-5 lg:p-2 lg:border-b-transparent lg:border-r  ">
              <div className="flex text-center items-center  justify-center rounded-xl">
                {response.market_data.current_price.usd < 1 ? (
                  <p>
                    Current Price: <br />$
                    {response.market_data.current_price.usd.toFixed(10)}
                  </p>
                ) : (
                  <p>
                    Current Price: <br /> $
                    {response.market_data.current_price.usd.toFixed(2)}
                  </p>
                )}
              </div>
              <div className="flex text-center items-center  justify-center rounded-xl">
                <p>
                  Market Cap: <br />
                  {currency(response.market_data.market_cap.usd)}
                </p>
              </div>
              <div className="flex text-center items-center  justify-center rounded-xl">
                <p>
                  Fully Diluted Market Cap: <br />{' '}
                  {currency(response.market_data.fully_diluted_valuation.usd)}
                </p>
              </div>
              <div className="flex text-center items-center  justify-center rounded-xl">
                <p>
                  24 Hour Trading Volume: <br />{' '}
                  {currency(response.market_data.total_volume.usd)}
                </p>
              </div>
              <div className="flex text-center items-center  justify-center rounded-xl">
                <p>
                  Circulating Supply: <br />{' '}
                  {number(response.market_data.circulating_supply)}{' '}
                </p>
              </div>
              <div className="flex text-center items-center  justify-center rounded-xl">
                <p className="flex">
                  All time high: <br />${response.market_data.ath.usd}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2  border-t lg:border-none">
          <div className=" rounded">
            <div className="flex flex-col px-3 lg:px-1 lg:mr-2 gap-2">
              <p className="text-xl font-bold mt-5 ">About:</p>

              <p className="mt-2 mb-5 h-56 overflow-auto">
                {response.description.en.replace(/<\/?[^>]+>/gi, '')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinDetails;
