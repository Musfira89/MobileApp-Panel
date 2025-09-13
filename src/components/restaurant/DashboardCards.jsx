import React from 'react';
import { FaUsers, FaUtensils, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';

const DashboardCards = ({ stats }) => {
  const cards = [
    {
      title: 'Total Users',
      value: stats?.users || 0,
      trend: '+4.2%',
      note: 'Increased',
      trendColor: 'text-green-600',
      bg: 'bg-yellow-400',
      icon: <FaUsers className="text-white w-4 h-4" />,
    },
    {
      title: 'Restaurants',
      value: stats?.restaurants || 0,
      trend: '+2.5%',
      note: 'Increased',
      trendColor: 'text-green-600',
      bg: 'bg-pink-500',
      icon: <FaUtensils className="text-white w-4 h-4" />,
    },
    {
      title: 'Reservations',
      value: stats?.reservations || 0,
      trend: '-1.8%',
      note: 'Less bookings',
      trendColor: 'text-red-500',
      bg: 'bg-red-500',
      icon: <FaCalendarAlt className="text-white w-4 h-4" />,
    },
    {
      title: 'Earnings',
      value: `Rs. ${stats?.earnings || 0}`,
      trend: '+3.1%',
      note: 'Growth',
      trendColor: 'text-green-600',
      bg: 'bg-green-600',
      icon: <FaDollarSign className="text-white w-4 h-4" />,
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
      <p className="text-gray-500 text-sm">APP PERFORMANCE</p>
        <button className="text-sm border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 transition">
          View All
        </button>
      </div>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col justify-between h-full"
          >
            <div className="flex items-center gap-3">
              <div className={`${card.bg} p-2 rounded-full`}>
                {card.icon}
              </div>
              <div>
                <p className="text-xs text-gray-500">{card.title}</p>
                <h3 className="text-2xl font-bold text-gray-800">{card.value}</h3>
              </div>
            </div>
            <p className={`text-sm mt-4 ${card.trendColor}`}>
              {card.trend} <span className="text-gray-500 text-xs ml-1">{card.note}</span>
            </p>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="mt-8 text-center">
        <button className="bg-red-800 hover:bg-red-600 text-white text-sm px-6 py-2 rounded-full transition">
          View Complete Report
        </button>
      </div>
    </div>
  );
};

export default DashboardCards;
