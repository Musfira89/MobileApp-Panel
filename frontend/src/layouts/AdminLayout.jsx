import React from 'react';
import Sidebar from '../components/admin/Sidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar (fixed full height) */}
      <div className="h-full">
        <Sidebar />
      </div>

      {/* Right side (scrollable) */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
