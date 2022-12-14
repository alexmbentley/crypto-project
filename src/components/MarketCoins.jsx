import { FiTrendingDown, FiTrendingUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const MarketCoins = ({ coin, counter }) => {
  const { user } = UserAuth();

  return (
    <Link to={`/coin/${coin.id}`}>
      <div className="grid grid-cols-3 sm:grid-cols-4 font-light p-2  border-black border-b hover:bg-gray-300">
        <div className="flex items-center gap-1 w-full">
          <span>{coin.market_cap_rank}.&nbsp;&nbsp;</span>
          <img className="w-7" src={coin.image} alt={coin.name} />
          <p>{coin.name}</p>
          <span className="text-xs">({coin.symbol})</span>
        </div>
        <div className="flex items-center gap-1 w-full">
          <p>${coin.current_price.toFixed(2)}</p>
        </div>
        <span
          className={`flex items-center ${
            coin.price_change_percentage_24h < 0
              ? 'text-red-600'
              : 'text-green-500'
          }`}
        >
          {coin.price_change_percentage_24h < 0 ? (
            <FiTrendingDown />
          ) : (
            <FiTrendingUp />
          )}
          &nbsp;&nbsp;
          {coin.price_change_percentage_24h.toFixed(2)}%
        </span>
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
