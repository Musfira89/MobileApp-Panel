import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock } from "react-icons/fa";
import adminBackground from "../../assets/header.png";



const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  return (
    <div className="flex flex-col md:flex-row h-screen font-sans">
      {/* Left Section */}
      <div
        className="w-full md:w-1/2 flex flex-col justify-center items-center text-white px-6 py-12 md:py-16 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${adminBackground})` }}
      >
        
        <motion.div
          className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-6 md:p-8 shadow-lg text-center max-w-sm"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-2xl md:text-4xl font-extrabold mb-4">Admin Panel</h1>
          <p className="text-sm md:text-lg">Manage your platform efficiently and securely.</p>
        </motion.div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-gray-100 p-6 md:p-10">
        <motion.div
          className="w-full max-w-xl p-6 md:p-12 bg-white rounded-2xl shadow-2xl"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Admin Login</h2>
            <p className="text-gray-500 text-sm md:text-base">Sign in to access the admin dashboard.</p>
          </div>

          <form className="space-y-6">
            <div className="relative">
              <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
              <input
                type="email"
                placeholder="Admin Email"
                className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm md:text-base"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-gray-400" />
              <input
                type="password"
                placeholder="Admin Password"
                className="w-full pl-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm md:text-base"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-3 rounded-lg shadow-lg hover:scale-105 transition-transform"
              disabled={loading}
            >
              {loading ? "Logging In..." : "Log In"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminLogin;
