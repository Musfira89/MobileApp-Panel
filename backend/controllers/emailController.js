import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config(); // Load environment variables

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Send Ride Confirmation Email
export const sendRideConfirmationEmail = async (req, res) => {
    console.log("Request body received in backend:", req.body);

  const { email, name, pickup, destination, date, time, vehicle, carNumber, driverName, driverContact } = req.body;

  if (!email) {
    console.error("Email is missing in the request body.");
    return res.status(400).json({ error: "Email is required." });
  }

  try {
    console.log("Sending email to:", email);

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your Ride is Confirmed!",
      html: `
        <h1>Ride Confirmation</h1>
        <p>Dear ${name},</p>
        <p>Your ride has been confirmed. Here are the details:</p>
        <ul>
          <li><strong>Pickup Location:</strong> ${pickup}</li>
          <li><strong>Destination:</strong> ${destination}</li>
          <li><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</li>
          <li><strong>Time:</strong> ${new Date(time).toLocaleTimeString()}</li>
          <li><strong>Vehicle:</strong> ${vehicle} (${carNumber})</li>
          <li><strong>Driver Name:</strong> ${driverName}</li>
          <li><strong>Driver Contact:</strong> ${driverContact}</li>
        </ul>
        <p>Thank you for choosing our service!</p>
      `,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to:", email, info.response);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error.message);
    res.status(500).json({ error: "Failed to send email." });
  }
};