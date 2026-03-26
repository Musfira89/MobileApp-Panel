import express from "express";
import { sendRideConfirmationEmail } from "../controllers/emailController.js";

const router = express.Router();

// POST /api/rides
router.post("/send-email", sendRideConfirmationEmail);

export default router;