import { db } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore"; 

export const getAllReservations = async (req, res) => {
  try {
    const restaurantNames = ["KababjeesSuperHighway", "Tandoor"];
    let allReservations = [];

    for (let restName of restaurantNames) {
      const subColRef = collection(
        db,
        `restaurants/${restName}/createReservations`
      );

      const snapshot = await getDocs(subColRef);

      snapshot.forEach((doc) => {
        const data = doc.data();
        const rawAmount = data.totalAmount ? Number(data.totalAmount) : 0;

        allReservations.push({
          id: data.readableReservationId || doc.id,
          name: data.fullName,
          restaurant: restName,
          guests: data.guestCount,
          date: data.reservationDay,
          time: data.reservationTime,
          amount: rawAmount,
          commission: rawAmount * 0.1,
        });
      });
    }

    res.status(200).json({
      success: true,
      count: allReservations.length,
      data: allReservations,
    });
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({
      success: false,
      message: error.message, // This helps you see the error in Postman/Browser
    });
  }
};