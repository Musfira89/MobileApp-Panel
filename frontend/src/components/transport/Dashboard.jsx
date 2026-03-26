import { signOut } from "firebase/auth";
import { addDoc, collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../firebase";

const Dashboard = () => {
  const [cars, setCars] = useState([]);
  const [category, setCategory] = useState("basic");
  const [carName, setCarName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "cars"), (snapshot) => {
      const carList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCars(carList);
    });

    return () => unsubscribe();
  }, []);

  const addCar = async () => {
    if (!carName) return alert("Car name is required");
    await addDoc(collection(db, "cars"), { name: carName, category, available: true });
    setCarName("");
    alert("Car Added Successfully");
  };

  const toggleAvailability = async (id, status) => {
    await updateDoc(doc(db, "cars", id), { available: !status });
    setCars((prev) => prev.map((car) => (car.id === id ? { ...car, available: !status } : car)));
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto bg-gray-50 shadow-lg rounded-lg p-6">
        <div className="flex justify-between items-center mb-6 border-b border-red-700 pb-4">
          <h2 className="text-3xl font-bold text-red-700">Welcome, Admin</h2>
          <button
            onClick={handleLogout}
            className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800 transition"
          >
            Logout
          </button>
        </div>

        <h3 className="text-2xl font-semibold text-red-700 mb-4">Add Car</h3>
        <div className="flex items-center gap-4 mb-6">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="p-3 border border-red-700 rounded-md focus:ring-2 focus:ring-red-400"
          >
            <option value="basic">Basic</option>
            <option value="premium">Premium</option>
          </select>
          <input
            type="text"
            placeholder="Car Name"
            value={carName}
            onChange={(e) => setCarName(e.target.value)}
            className="p-3 border border-red-700 rounded-md w-full focus:ring-2 focus:ring-red-400"
          />
          <button
            onClick={addCar}
            className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800 transition"
          >
            Add Car
          </button>
        </div>

        <h3 className="text-2xl font-semibold text-red-700 mb-4">Car List</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-red-700">
            <thead>
              <tr className="bg-red-100 text-red-700">
                <th className="border border-red-700 p-4">Car Name</th>
                <th className="border border-red-700 p-4">Category</th>
                <th className="border border-red-700 p-4">Availability</th>
                <th className="border border-red-700 p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car.id} className="text-center border border-red-700">
                  <td className="border border-red-700 p-4">{car.name}</td>
                  <td className="border border-red-700 p-4">{car.category}</td>
                  <td className="border border-red-700 p-4">
                    <span className={`px-2 py-1 rounded-md text-white ${car.available ? "bg-green-500" : "bg-red-500"}`}>
                      {car.available ? "Available" : "Booked"}
                    </span>
                  </td>
                  <td className="border border-red-700 p-4">
                    <button
                      onClick={() => toggleAvailability(car.id, car.available)}
                      className={`px-4 py-2 rounded-md text-white transition ${
                        car.available ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {car.available ? "Mark as Booked" : "Mark as Available"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;