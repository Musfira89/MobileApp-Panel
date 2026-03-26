import express from "express";
import { confirmRide, updateRideStatus } from "../controllers/rideController.js";

const router = express.Router();

// POST /api/rides
router.post("/rides", confirmRide);
router.patch("/rides/:rideId", updateRideStatus);
export default router;