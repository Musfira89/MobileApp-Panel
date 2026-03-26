// Sidebar.js

const Sidebar = ({ setPage }) => {
  return (
    <div className="w-64 h-screen bg-[#7B1E1E] text-white p-5">
      <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
      <ul>
        <li className="mb-4 cursor-pointer" onClick={() => setPage("vehicles")}>
          Vehicles
        </li>
        <li className="mb-4 cursor-pointer" onClick={() => setPage("manageBookings")}>
          Manage Bookings
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
