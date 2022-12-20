import { Link } from 'react-router-dom';

const TrendingCoins = ({ coin }) => {
  return (
    <Link to={`coin/${coin.id}`}>
      <div className="font-light mb-2 p-2 border-black border rounded hover:bg-gray-300">
        <div className="flex items-center gap-1">
          <span>{coin.score + 1}.</span>
          <img className="w-6" src={coin.small} alt={coin.name} />
          <p>{coin.name}</p>
          <span className="text-xs">({coin.symbol})</span>
        </div>
      </div>
    </Link>
  );
};

export default TrendingCoins;
