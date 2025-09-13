import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const UserGrowthChart = () => {
  const newUsers = 45;
  const returningUsers = 105;
  const totalUsers = newUsers + returningUsers;
  const newUserPercentage = ((newUsers / totalUsers) * 100).toFixed(0);

  const data = {
    labels: ['New Users', 'Returning Users'],
    datasets: [
      {
        label: 'User Growth',
        data: [newUsers, returningUsers],
        backgroundColor: ['#DC2626', '#FCA5A5'],
        borderColor: ['#fff', '#fff'],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: '70%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          generateLabels: (chart) => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => {
                const bgColor = data.datasets[0].backgroundColor[i];
                return {
                  text: label,
                  fillStyle: bgColor,
                  strokeStyle: bgColor,
                  lineWidth: 1,
                  index: i,
                };
              });
            }
            return [];
          },
          font: {
            size: 14,
            weight: '500',
            family: 'Arial',
          },
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.label || '';
            const value = tooltipItem.raw;
            return `${value} ${label.toLowerCase()} this week`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">User Growth (This Week)</h2>
      </div>

      {/* Doughnut Chart */}
      <div className="relative w-full max-w-xs mx-auto">
        <Doughnut data={data} options={options} />

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-xl font-bold text-red-600">{newUserPercentage}%</p>
          <p className="text-sm text-gray-500">New Users</p>
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-6 text-center">
        <button className="bg-red-800 hover:bg-red-600 text-white text-sm px-6 py-2 rounded-full transition">
          View Complete Report
        </button>
      </div>
    </div>
  );
};

export default UserGrowthChart;
