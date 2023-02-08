import ApiCaller from '../hooks/ApiCaller';
import MarketCoins from './MarketCoins';

const Market = () => {
  const { response, error } = ApiCaller(
    'coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
  );

  let counter = 0;

  if (!response && error) {
    return (
      <div className="mt-3">
        {console.log(error)}
        <h1 className="text-xl font-bold mb-2">
          Cryptocurrencies by Market Cap
        </h1>
        Too many requests. I couldn't afford the APIs paid verion, sorry! <br />
        Wait 5 minutes and try again or change ip addresss.
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h1 className="text-xl font-bold mt-3 mb-3">
        Cryptocurrencies by Market Cap
      </h1>
      <div className="grid grid-cols-3 sm:grid-cols-4 font-light p-2  border-black border rounded hover:bg-gray-300 scroll-container ">
        <div className="flex items-center gap-1 w-full">
          <div className="sm:block">
            <span>Coin:&nbsp;&nbsp;</span>
          </div>
        </div>
        <div className="flex items-center gap-1 w-full">
          <p className="flex items-center sm:ml-0 ml-6">Price:</p>
        </div>
        <div className="flex items-center gap-1 w-full">
          <span>
            <p className="flex items-center sm:ml-0 ml-6">24H Change:</p>
          </span>
        </div>
        <div className="hidden sm:block">
          <span>Market Cap:</span>
        </div>
      </div>
      {!response ? (
        <div className="mt-3">
          <p className="text-xl">Loading...</p>
        </div>
      ) : (
        response &&
        response.map((coin) => (
          <MarketCoins key={coin.id} counter={counter} coin={coin} />
        ))
      )}
    </div>
  );
};

export default Market;
