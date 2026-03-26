import express from "express";
import cors from "cors";
import reservationRoutes from "./routes/reservation.routes.js";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/reservations", reservationRoutes);

// Start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});