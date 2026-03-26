import cors from "cors";
import express from "express";
import emailRoute from './routes/emailRoute.js';
import reservationRoutes from "./routes/reservation.routes.js";
import rideRoutes from './routes/rideRoutes.js';
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cors({ origin: "*" }));
// Routes
app.use("/api/reservations", reservationRoutes);
app.use('/api', booki);
app.use('/api', rideRoutes);
app.use("/api", emailRoute);

// Start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});