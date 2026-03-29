import { addDoc, collection, deleteDoc, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../../firebase";

const Vehicles = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    const [carName, setCarName] = useState("");
    const [category, setCategory] = useState("basic");
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [price, setPrice] = useState("");
    const [numberPlate, setNumberPlate] = useState("");
    const [driverName, setDriverName] = useState("");
    const [driverContact, setDriverContact] = useState("");
    const [driverLicense, setDriverLicense] = useState("");
    const [editingCar, setEditingCar] = useState(null);

    useEffect(() => {
        if (!db) return;

        let unsubscribe;

        try {
            unsubscribe = onSnapshot(
                collection(db, "cars"),
                (snapshot) => {
                    const data = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));
                    setCars(data);
                    setLoading(false);
                },
                (error) => {
                    console.error("Firestore listener error:", error);
                }
            );
        } catch (err) {
            console.error("Snapshot setup failed:", err);
        }

        return () => {
            if (unsubscribe) unsubscribe();
        };
    }, []);

    const addCar = async () => {
        if (!carName || !brand || !model || !year || !price || !numberPlate || !driverName || !driverContact || !driverLicense)
            return alert("All fields are required!");

        await addDoc(collection(db, "cars"), {
            name: carName,
            category,
            brand,
            model,
            year,
            price,
            numberPlate,
            driver: {
                name: driverName,
                contact: driverContact,
                license: driverLicense,
            },
            status: "Available",
        });

        resetForm();
    };

    const editCar = (car) => {
        setEditingCar(car.id);
        setCarName(car.name);
        setCategory(car.category);
        setBrand(car.brand);
        setModel(car.model);
        setYear(car.year);
        setPrice(car.price);
        setNumberPlate(car.numberPlate);
        setDriverName(car.driver?.name || "");
        setDriverContact(car.driver.contact);
        setDriverLicense(car.driver.license);
    };

    const updateCar = async () => {
        if (!editingCar) return;

        const carRef = doc(db, "cars", editingCar);
        await updateDoc(carRef, {
            name: carName,
            category,
            brand,
            model,
            year,
            price,
            numberPlate,
            driver: {
                name: driverName,
                contact: driverContact,
                license: driverLicense,
            },
        });

        resetForm();
        setEditingCar(null);
    };

    const deleteCar = async (id) => {
        if (window.confirm("Delete this car?")) {
            await deleteDoc(doc(db, "cars", id));
        }
    };

    const toggleStatus = async (id, currentStatus) => {
        const carRef = doc(db, "cars", id);
        const newStatus = currentStatus === "Available" ? "Not Available" : "Available";
        await updateDoc(carRef, { status: newStatus });
    };

    const resetForm = () => {
        setCarName("");
        setCategory("basic");
        setBrand("");
        setModel("");
        setYear("");
        setPrice("");
        setNumberPlate("");
        setDriverName("");
        setDriverContact("");
        setDriverLicense("");
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <h1 className="text-3xl font-bold text-red-700 mb-6">Vehicle Management</h1>
                <div className="fixed top-10 right-15 z-50">
                    <Link to="/admin/dashboard">
                        <button className="px-12 py-3 text-sm bg-red-700 hover:bg-red-600 text-white font-semibold rounded-md shadow-md transition-transform transform hover:scale-105">
                            ADMIN
                        </button>
                    </Link>
                </div>

                {/* Form Card */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-gray-100">
                    <h2 className="text-xl font-semibold text-red-700 mb-4">
                        {editingCar ? "Edit Vehicle" : "Add New Vehicle"}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <select value={category} onChange={(e) => setCategory(e.target.value)} className="input">
                            <option value="basic">Basic</option>
                            <option value="premium">Premium</option>
                        </select>

                        <input placeholder="Car Name" value={carName} onChange={(e) => setCarName(e.target.value)} className="input" />
                        <input placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} className="input" />
                        <input placeholder="Model" value={model} onChange={(e) => setModel(e.target.value)} className="input" />
                        <input placeholder="Year" value={year} onChange={(e) => setYear(e.target.value)} className="input" />
                        <input placeholder="Price ($)" value={price} onChange={(e) => setPrice(e.target.value)} className="input" />
                        <input placeholder="Number Plate" value={numberPlate} onChange={(e) => setNumberPlate(e.target.value)} className="input" />
                        <input placeholder="Driver Name" value={driverName} onChange={(e) => setDriverName(e.target.value)} className="input" />
                        <input placeholder="Driver Contact" value={driverContact} onChange={(e) => setDriverContact(e.target.value)} className="input" />
                        <input placeholder="Driver License" value={driverLicense} onChange={(e) => setDriverLicense(e.target.value)} className="input" />
                    </div>

                    <div className="mt-4">
                        <button
                            onClick={editingCar ? updateCar : addCar}
                            className="bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded-lg shadow"
                        >
                            {editingCar ? "Update Vehicle" : "Add Vehicle"}
                        </button>

                        {editingCar && (
                            <button onClick={resetForm} className="ml-3 px-5 py-2 bg-gray-300 rounded-lg">
                                Cancel
                            </button>
                        )}
                    </div>
                </div>

                {/* Loader */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-10 h-10 border-4 border-red-700 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-red-700 text-white">
                                <tr>
                                    <th className="p-3 text-left">Car</th>
                                    <th className="p-3">Brand</th>
                                    <th className="p-3">Model</th>
                                    <th className="p-3">Year</th>
                                    <th className="p-3">Price</th>
                                    <th className="p-3">Plate</th>
                                    <th className="p-3">Driver</th>
                                    <th className="p-3">Status</th>
                                    <th className="p-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cars.map((car) => (
                                    <tr key={car.id} className="border-b hover:bg-gray-50">
                                        <td className="p-3 font-medium">{car.name}</td>
                                        <td className="p-3 text-center">{car.brand}</td>
                                        <td className="p-3 text-center">{car.model}</td>
                                        <td className="p-3 text-center">{car.year}</td>
                                        <td className="p-3 text-center">${car.price}</td>
                                        <td className="p-3 text-center">{car.numberPlate}</td>
                                        <td className="p-3 text-center text-xs">
                                            {car.driver.name}<br />
                                            {car.driver.contact}
                                        </td>

                                        <td className="p-3 text-center">
                                            <button
                                                onClick={() => toggleStatus(car.id, car.status)}
                                                className={`px-3 py-1 rounded-full text-xs text-white ${car.status === "Available" ? "bg-green-500" : "bg-gray-500"
                                                    }`}
                                            >
                                                {car.status}
                                            </button>
                                        </td>

                                        <td className="p-3 text-center">
                                            <button onClick={() => editCar(car)} className="text-red-700 font-medium mr-2">
                                                Edit
                                            </button>
                                            <button onClick={() => deleteCar(car.id)} className="text-gray-500">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Input styling */}
            <style>{`
                .input {
                    padding: 10px;
                    border: 1px solid #e5e7eb;
                    border-radius: 8px;
                    outline: none;
                }
                .input:focus {
                    border-color: #b91c1c;
                    box-shadow: 0 0 0 1px #b91c1c;
                }
            `}</style>
        </div>
    );
};

export default Vehicles;