import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState({});
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Real-time listener for bookings
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "rides"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log("Real-time bookings fetched:", data); // Debugging statement
      setBookings(data);
      setIsLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  // Real-time listener for cars
  useEffect(() => {
    const unsubscribeCars = onSnapshot(collection(db, "cars"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      console.log("Real-time cars fetched:", data); // Debugging statement
      setCars(data);
    });

    return () => unsubscribeCars(); // Cleanup listener
  }, []);

  const handleConfirmBooking = async (booking) => {
    const selectedCarData = selectedCar[booking.id];

    if (!selectedCarData) {
      alert("Please select a car for this booking.");
      return;
    }

    try {
      // Update the booking in Firestore
      const rideRef = doc(db, "rides", booking.id);
      await updateDoc(rideRef, {
        vehicle: selectedCarData.carName,
        carNumber: selectedCarData.carNumber,
        driverName: selectedCarData.driverName,
        driverContact: selectedCarData.driverContact,
        status: "Booked", // Change status to "Booked"
      });

      console.log("Booking confirmed:", booking);

      // Send email to the user
      const response = await fetch("http://localhost:3000/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: booking.email,
          name: booking.firstName,
          pickup: booking.pickupLocation,
          destination: booking.destinationLocation,
          date: booking.selectedDate,
          time: booking.selectedTime,
          vehicle: selectedCarData.carName,
          carNumber: selectedCarData.carNumber,
          driverName: selectedCarData.driverName,
          driverContact: selectedCarData.driverContact,
        }),
      });

      console.log("Sending email to:", booking.email);

      if (response.ok) {
        alert("Ride confirmed and email sent to the user!");
      } else {
        console.error("Failed to send email:", await response.text());
      }
    } catch (error) {
      console.error("Error confirming booking:", error);
      alert("Failed to confirm booking or send email.");
    }
  };

  const handleCancelBooking = async (booking) => {
    try {
      const rideRef = doc(db, "rides", booking.id);
      await updateDoc(rideRef, {
        status: "Cancelled",
      });

      console.log("Booking cancelled:", booking);
    } catch (error) {
      console.error("Error cancelling booking:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <h1 className="text-3xl font-bold text-red-700 mb-6">Manage Bookings</h1>

        {/* Search */}
        <div className="bg-white p-4 rounded-xl shadow mb-6 border border-gray-100">
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full p-3 border rounded-lg focus:outline-none focus:border-red-700"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Loader */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-red-700 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-red-700 text-white">
                <tr>
                  <th className="p-3">#</th>
                  <th className="p-3">User</th>
                  <th className="p-3">Pickup</th>
                  <th className="p-3">Destination</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Ride</th>
                  <th className="p-3">Car</th>
                  <th className="p-3">Driver</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {bookings.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="text-center p-6 text-gray-500">
                      No bookings found
                    </td>
                  </tr>
                ) : (
                  bookings
                    .filter((b) =>
                      b.firstName?.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((booking, index) => (
                      <tr key={booking.id} className="border-b hover:bg-gray-50">
                        <td className="p-3 text-center">{index + 1}</td>

                        <td className="p-3 font-medium">
                          {booking.firstName || "N/A"}
                        </td>

                        <td className="p-3">{booking.pickupLocation}</td>
                        <td className="p-3">{booking.destinationLocation}</td>

                        <td className="p-3 text-xs">
                          {booking.selectedDate
                            ? new Date(booking.selectedDate).toLocaleString()
                            : "N/A"}
                        </td>

                        <td className="p-3 text-center capitalize">
                          {booking.rideType}
                        </td>

                        {/* Car Selection */}
                        <td className="p-3 text-center">
                          {booking.vehicle ? (
                            `${booking.vehicle} (${booking.carNumber})`
                          ) : (
                            <select
                              className="p-2 border rounded-md"
                              onChange={(e) => {
                                const selectedCarId = e.target.value;
                                const selectedCarData = cars.find(
                                  (car) => car.id === selectedCarId
                                );

                                if (selectedCarData) {
                                  setSelectedCar((prev) => ({
                                    ...prev,
                                    [booking.id]: {
                                      carId: selectedCarId,
                                      carName: selectedCarData.name,
                                      carNumber: selectedCarData.numberPlate,
                                      driverName: selectedCarData.driver.name,
                                      driverContact: selectedCarData.driver.contact,
                                    },
                                  }));
                                }
                              }}
                            >
                              <option value="">Select Car</option>
                              {cars
                                .filter(
                                  (car) =>
                                    car.category.toLowerCase() ===
                                    booking.rideType.toLowerCase()
                                )
                                .map((car) => (
                                  <option key={car.id} value={car.id}>
                                    {car.name}
                                  </option>
                                ))}
                            </select>
                          )}
                        </td>

                        {/* Driver */}
                        <td className="p-3 text-xs text-center">
                          {selectedCar[booking.id]?.driverName || "Not Assigned"}
                          <br />
                          {selectedCar[booking.id]?.driverContact || ""}
                        </td>

                        {/* Status */}
                        <td className="p-3 text-center">
                          <span
                            className={`px-3 py-1 rounded-full text-xs text-white ${
                              booking.status === "Booked"
                                ? "bg-green-500"
                                : booking.status === "Cancelled"
                                ? "bg-gray-500"
                                : "bg-yellow-500"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="p-3 text-center">
                          {booking.status === "pending" && (
                            <button
                              onClick={() => handleConfirmBooking(booking)}
                              className="bg-red-700 text-white px-3 py-1 rounded-md mr-2 hover:bg-red-800"
                            >
                              Confirm
                            </button>
                          )}

                          <button
                            onClick={() => handleCancelBooking(booking)}
                            className="text-gray-500"
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageBookings;