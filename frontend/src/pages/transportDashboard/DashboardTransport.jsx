// Dashboard.js
import { useState } from "react";
import ManageBookings from "../../components/transport/ManageBookings";
import Sidebar from "../../components/transport/Sidebar";
import Vehicles from "../../components/transport/Vehicles";

const DashboardTransport = () => {
  const [page, setPage] = useState("vehicles");

  return (
    <div className="flex">
      {/* Sidebar with fixed positioning */}
      <div className="w-64 h-screen fixed top-0 left-0 bg-red-700 text-white">
        <Sidebar setPage={setPage} />
      </div>

      {/* Main content with margin to account for the fixed sidebar */}
      <div className="flex-1 ml-64 p-6">
        {page === "vehicles" ? <Vehicles /> : <ManageBookings />}
      </div>
    </div>
  );
};

export default DashboardTransport;