import ApiCaller from '../hooks/ApiCaller';
import MarketCoins from './MarketCoins';

const Market = () => {
  const { response } = ApiCaller(
    'coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
  );

  let counter = 0;
  return (
    <div className="mt-6">
      <h1 className="text-xl font-bold">Cryptocurrencies by Market Cap</h1>
      {response &&
        response.map((coin) => (
          <MarketCoins key={coin.id} counter={counter} coin={coin} />
        ))}
    </div>
  );
};

export default Market;
