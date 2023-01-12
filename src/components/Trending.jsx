import ApiCaller from '../hooks/ApiCaller';
import TrendingCoins from './TrendingCoins';

const Trending = () => {
  const { response } = ApiCaller('search/trending');

  return (
    <div className="mt-3">
      <h1 className="text-xl font-bold mb-2">Trending</h1>
      {response &&
        response.coins.map((coin) => (
          <TrendingCoins key={coin.item.coin_id} coin={coin.item} />
        ))}
    </div>
  );
};

export default Trending;
