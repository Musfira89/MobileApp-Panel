import { auth, db } from "../firebaseConnect.js"; // Import Firestore database instance

export const confirmRide = async (req, res) => {
  const { authorization } = req.headers; // Extract the Authorization header

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = authorization.split("Bearer ")[1]; // Extract the token

  try {
    // Verify the Firebase Authentication token
    const decodedToken = await auth.verifyIdToken(token);
    const userId = decodedToken.uid; // Extract the user ID from the token

    const rideData = req.body;

    // Add default fields and timestamps
    const rideDetails = {
      userId, 
      rideType: rideData.rideType,
      pickupLocation: rideData.pickupLocation, // Only store location names
      destinationLocation: rideData.destinationLocation, // Only store location names
      selectedDate: new Date(rideData.selectedDate).toISOString(),
      selectedTime: new Date(rideData.selectedTime).toISOString(),
      selectedAC: rideData.selectedAC,
      vehicle: null, // Default to null
      status: "pending", // Default to pending
      createdAt: new Date().toISOString(),
    };

    // Store the ride details in Firestore
    const docRef = await db.collection("rides").add(rideDetails);

    // Respond with success
    res.status(201).json({
      message: "Ride confirmed successfully.",
      rideId: docRef.id,
    });
  } catch (error) {
    console.error("Error confirming ride:", error.message);
    res.status(500).json({ error: "Failed to confirm the ride." });
  }
};

export const updateRideStatus = async (req, res) => {
  const { rideId } = req.params; // Extract the ride ID from the request parameters
  const { vehicle } = req.body; // Extract the vehicle information from the request body

  try {
    // Check if the ride exists
    const rideRef = db.collection("rides").doc(rideId);
    const rideDoc = await rideRef.get();

    if (!rideDoc.exists) {
      return res.status(404).json({ error: "Ride not found" });
    }

    // Update the ride's status to "booked" and assign the vehicle
    await rideRef.update({
      status: "booked",
      vehicle: vehicle, // Assign the vehicle
      updatedAt: new Date().toISOString(), // Add an updated timestamp
    });

    res.status(200).json({ message: "Ride status updated successfully." });
  } catch (error) {
    console.error("Error updating ride status:", error.message);
    res.status(500).json({ error: "Failed to update ride status." });
  }
};