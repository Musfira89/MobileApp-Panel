import React, { useState } from 'react';
import { FaUsers, FaUtensils, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';
import { FiChevronDown } from 'react-icons/fi';

const DashboardCards = ({ stats }) => {
  const [selectedTime, setSelectedTime] = useState('This Week');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelect = (value) => {
    setSelectedTime(value);
    setIsDropdownOpen(false);
    // You can call your filtering logic here
  };

  const cards = [
    {
      title: 'Total Users',
      value: stats?.users || 0,
      trend: '+4.2%',
      note: 'Increased',
      trendColor: 'text-green-600',
      bg: 'bg-yellow-400',
      icon: <FaUsers className="text-white w-6 h-6" />,
    },
    {
      title: 'Restaurants',
      value: stats?.restaurants || 0,
      trend: '+2.5%',
      note: 'Increased',
      trendColor: 'text-green-600',
      bg: 'bg-pink-500',
      icon: <FaUtensils className="text-white w-6 h-6" />,
    },
    {
      title: 'Reservations',
      value: stats?.reservations || 0,
      trend: '-1.8%',
      note: 'Less bookings',
      trendColor: 'text-red-500',
      bg: 'bg-red-500',
      icon: <FaCalendarAlt className="text-white w-6 h-6" />,
    },
    {
      title: 'Earnings',
      value: `Rs. ${stats?.earnings || 0}`,
      trend: '+3.1%',
      note: 'Growth',
      trendColor: 'text-green-600',
      bg: 'bg-green-600',
      icon: <FaDollarSign className="text-white w-6 h-6" />,
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-500 text-sm font-medium tracking-wide">APP PERFORMANCE</p>

        {/* Dropdown */}
        <div className="relative inline-block text-left">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-sm border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 transition font-medium flex items-center gap-1"
          >
            {selectedTime} <FiChevronDown className="w-4 h-4" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white  ring-opacity-5 z-10">
              <div className="py-1 text-sm text-gray-700">
                {['Today', 'This Week', 'This Month'].map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSelect(option)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex flex-col justify-between h-full 
                       hover:shadow-lg cursor-pointer transition-all duration-200"
          >
            <div className="flex items-center gap-4">
              <div className={`${card.bg} p-4 rounded-full flex items-center justify-center`}>
                {card.icon}
              </div>
              <div>
                <p className="text-xs text-gray-500 font-semibold">{card.title}</p>
                <h3 className="text-2xl font-bold text-gray-800">{card.value}</h3>
              </div>
            </div>
            <p className={`text-sm mt-4 font-medium ${card.trendColor}`}>
              {card.trend}
              <span className="text-gray-500 text-xs ml-1 font-normal">{card.note}</span>
            </p>
          </div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="mt-8 text-center">
        <button className="bg-red-800 hover:bg-red-600 text-white text-sm px-6 py-2 rounded-full transition font-semibold">
          View Complete Report
        </button>
      </div>
    </div>
  );
};

export default DashboardCards;
