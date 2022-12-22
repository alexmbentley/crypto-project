import { useParams } from 'react-router-dom';
import ApiCaller from '../hooks/ApiCaller';
import React from 'react';
import moment from 'moment';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const Chart = () => {
  const { id } = useParams();

  const { response } = ApiCaller(
    `coins/${id}/market_chart?vs_currency=usd&days=7`
  );

  if (!response) {
    return <div>Loading...</div>;
  }
  const chartData = response.prices.map((e) => ({
    x: e[0],
    y: e[1].toFixed(2),
  }));
  console.log(chartData.length, 'chart data');
  const labels = chartData.map((e) => moment(e.x).format('MMMDD'));
  const data = {
    labels: labels,
    datasets: [
      {
        fill: true,
        label: id.charAt(0).toUpperCase() + id.slice(1),
        data: chartData.map((e) => e.y),
        backgroundColor: 'rgba(0, 255, 255, 0.6)',
      },
    ],
  };
  const options = {
    scales: {
      y: {},
      x: {
        ticks: {
          maxTicksLimit: labels.length / 24.2857143,
        },
      },
    },
    responsive: true,
  };

  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
};

export default Chart;
