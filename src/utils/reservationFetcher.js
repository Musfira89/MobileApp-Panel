import { db } from '../services/firebase';
import { collection, getDocs } from 'firebase/firestore';

export const fetchAllReservations = async () => {
  const restaurantNames = ['KababjeesSuperHighway', 'Tandoor'];
  let allReservations = [];

  for (let restName of restaurantNames) {
    const subColRef = collection(db, `restaurants/${restName}/createReservations`);
    const snapshot = await getDocs(subColRef);

    snapshot.forEach(doc => {
      const data = doc.data();
      allReservations.push({
        id: data.readableReservationId || 'N/A',
        name: data.fullName,
        restaurant: restName,
        guests: data.guestCount,
        date: data.reservationDay,
        time: data.reservationTime,
        amount: parseFloat(data.totalAmount),
        commission: parseFloat(data.totalAmount) * 0.10
      });
    });
  }

  return allReservations;
};
