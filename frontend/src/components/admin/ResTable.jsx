import React, { useEffect, useState } from "react";

const RecentReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        const res = await fetch("http://localhost:5000/api/reservations");
        const json = await res.json();

        if (!json.success) {
          throw new Error("API Error");
        }

        const sorted = json.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setReservations(sorted);
      } catch (err) {
        console.error("Error loading reservations:", err);
        setError("Failed to load reservations");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mt-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-600 font-semibold tracking-wide">RECENT RESERVATIONS</p>
        <button className="text-sm border border-gray-300 rounded px-3 py-1 hover:bg-gray-100 transition">
          View All
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-[#7B1E1E] text-white sticky top-0 z-10">
            <tr>
              {['#ID', 'Name', 'Restaurant', 'Guests', 'Date', 'Time', 'Amount (PKR)', 'Commission (10%)'].map((heading, i) => (
                <th
                  key={i}
                  className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {reservations.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500">
                  No reservations available.
                </td>
              </tr>
            ) : (
              reservations.map((res, idx) => (
                <tr
                  key={idx}
                  className={`transition-all hover:bg-red-50 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                >
                  <td className="px-6 py-4 font-medium">{res.id}</td>
                  <td className="px-6 py-4 font-semibold">{res.name}</td>
                  <td className="px-6 py-4">{res.restaurant}</td>
                  <td className="px-6 py-4">{res.guests}</td>
                  <td className="px-6 py-4">{formatDate(res.date)}</td>
                  <td className="px-6 py-4">{res.time}</td>
                  <td className="px-6 py-4 font-semibold text-gray-800">
                    PKR {res.amount.toFixed(0)}
                  </td>
                  <td className="px-6 py-4 font-semibold text-green-600">
                    PKR {res.commission.toFixed(0)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentReservations;
