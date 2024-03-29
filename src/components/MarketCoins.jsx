import { FiTrendingDown, FiTrendingUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const MarketCoins = ({ coin }) => {
  return (
    <Link to={`/coin/${coin.id}`}>
      <div className="grid grid-cols-3 sm:grid-cols-4 font-light p-2  border-black border-b hover:bg-gray-300 scroll-container ">
        <div className="flex items-center gap-1 w-full">
          <div className="hidden sm:block">
            <span>{coin.market_cap_rank}.&nbsp;&nbsp;</span>
          </div>
          <img className="w-7" src={coin.image} alt={coin.name} />
          <p>{coin.name}</p>
          <div className="hidden md:block">
            <span className="text-xs">({coin.symbol})</span>
          </div>
        </div>
        <div className="flex items-center gap-1 w-full">
          <p className="flex items-center sm:ml-0 ml-6">
            ${coin.current_price.toFixed(2)}
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

export default MarketCoins;
