import ApiCaller from '../hooks/ApiCaller';
import TrendingCoins from './TrendingCoins';

const Trending = () => {
  const { response, error } = ApiCaller('search/trending');

  if (!response && error) {
    return (
      <div className="mt-3">
        {console.log(error)}
        <h1 className="text-xl font-bold mb-2">Trending</h1>
        Too many requests. I couldn't afford the APIs paid verion, sorry! <br />
        Wait 5 minutes and try again or change ip addresss.
      </div>
    );
  }

  return (
    <div className="mt-3">
      <h1 className="text-xl font-bold mb-2">Trending</h1>
      {!response ? (
        <div className="mt-3">
          <p className="text-xl">Loading...</p>
        </div>
      ) : (
        response &&
        response.coins.map((coin) => (
          <TrendingCoins key={coin.item.coin_id} coin={coin.item} />
        ))
      )}
    </div>
  );
};

export default Trending;
