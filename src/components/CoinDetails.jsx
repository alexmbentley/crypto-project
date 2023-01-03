import { useParams } from 'react-router-dom';
import ApiCaller from '../hooks/ApiCaller';

const CoinDetails = () => {
  const { id } = useParams();
  const { response } = ApiCaller(
    `coins/${id}?tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
  );
  const currency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format;
  const number = new Intl.NumberFormat().format;

  console.log(response, '<< response');

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
