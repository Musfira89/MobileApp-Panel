import { addDoc, collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

// ✅ Add a new car with full details
export const addCar = async (carName, category,brand,year,price, model, numberPlate, driverName, driverContact,driverLicense
) => {
  return await addDoc(collection(db, "cars"), {
    name: carName,
    category: category,
    model: model,
    brand: brand,
    year: year,
    price: price,
    numberPlate: numberPlate,
    available: true,
    driver: {
      name: driverName,
      contact: driverContact,
      License: driverLicense

    }
  });
};

// ✅ Fetch all cars
export const getCars = async () => {
  const querySnapshot = await getDocs(collection(db, "cars"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// ✅ Toggle car availability (for booking)
export const toggleCarAvailability = async (id, status) => {
  return await updateDoc(doc(db, "cars", id), { available: !status });
};
