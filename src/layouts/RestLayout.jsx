import React from 'react';
import Sidebar from '../components/restaurant/Sidebar'; 
import { Outlet } from 'react-router-dom';

const RestLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="h-full">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
        {children || <Outlet />}
      </div>
    </div>
  );
};

export default RestLayout;
