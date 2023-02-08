import { FiTrendingDown, FiTrendingUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const WatchlistCoins = ({ coin }) => {
  return (
    <Link to={`/coin/${coin.id}`}>
      <div className="grid grid-cols-3 sm:grid-cols-4 font-light p-2  border-black border rounded mb-1 hover:bg-gray-300">
        <div className="flex items-center gap-1 w-full">
          <img className="w-7" src={coin.image} alt={coin.name} />
          <p className="truncate">{coin.name}</p>
          <span className="text-xs hidden sm:block">({coin.symbol})</span>
        </div>
        <div className="flex items-center gap-1 w-full">
          <p className="flex items-center sm:ml-0 ml-6">
            {coin.current_price < 1 ? (
              <p>
                Current Price: <br />${coin.current_price.toFixed(10)}
              </p>
            ) : (
              <p>
                Current Price: <br /> ${coin.current_price.toFixed(2)}
              </p>
            )}
          </p>
        </div>
        <div className="flex items-center gap-1 w-full">
          <span
            className={`flex items-center   ${
              coin.price_change_percentage_24h < 0
                ? 'text-red-600'
                : 'text-green-500'
            }`}
          >
            <p className="flex items-center sm:ml-0 ml-6">
              {coin.price_change_percentage_24h < 0 ? (
                <FiTrendingDown />
              ) : (
                <FiTrendingUp />
              )}
              &nbsp;&nbsp;
              {coin.price_change_percentage_24h.toFixed(2)}%
            </p>
          </span>
        </div>
        <div className="hidden sm:block">
          <p className="font-semibold">Market Cap</p>
          <span>
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0,
            }).format(coin.market_cap)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default WatchlistCoins;
