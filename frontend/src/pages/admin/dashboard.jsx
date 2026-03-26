import React from "react";
import DashboardCards from "../../components/admin/DashboardCards";
import RecentReservations from "../../components/admin/ResTable";
import UserGrowthChart from "../../components/admin/UserGrowthChart";
import AdminEarningsChart from "../../components/admin/AdminEarningsChart";

const Dashboard = () => {
  // Dummy stats (to be fetched later)
  const stats = {
    users: 150,
    restaurants: 25,
    reservations: 320,
    earnings: 2450,
  };

  return (
    <div className="px-2 sm:px-4 md:px-2 lg:px-2 py-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>

      {/* Metric Cards */}
      <div className="my-10">
        <DashboardCards stats={stats} />
      </div>

      {/* Two-column section: User growth + Admin earnings */}
      <div className="flex flex-col lg:flex-row gap-10 my-10">
        {/* Left: User Growth Graph */}
        <div className="w-full lg:w-[35%]">
          <UserGrowthChart />
        </div>

        {/* Right: Admin Earnings Bar Chart */}
        <div className="w-full lg:w-[65%]">
          <AdminEarningsChart />
        </div>
      </div>

      {/* Recent Reservations Table */}
      <div className="my-12">
        <RecentReservations />
      </div>
    </div>
  );
};

export default Dashboard;
