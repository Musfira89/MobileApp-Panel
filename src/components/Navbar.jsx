import React, { useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import { motion } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaUserShield,
  FaUtensils,
  FaHome,
  FaInfoCircle,
  FaConciergeBell,
  FaFileContract,
  FaPhoneAlt,
} from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-[#3A3838] text-white w-full top-0 left-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 relative">
          {/* Left - Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-xl font-bold tracking-wider">LOGO</h1>
          </Link>

          {/* Center - Desktop Navigation */}
          <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-8 text-sm">
            <Link to="/" className="hover:text-red-500 font-medium">
              HOME
            </Link>
            <Link
              smooth
              to="/#about-us"
              className="hover:text-red-500 font-medium"
            >
              ABOUT US
            </Link>
            <Link
              smooth
              to="/#services"
              className="hover:text-red-500 font-medium"
            >
              SERVICES
            </Link>
            <Link
              smooth
              to="/#contact-us"
              className="hover:text-red-500 font-medium"
            >
              CONTACT US
            </Link>
            <Link
              smooth
              to="/#terms"
              className="hover:text-red-500 font-medium"
            >
              TERMS
            </Link>
          </nav>

          {/* Right - Admin/Rest Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              to="/adminlogin"
              className="bg-red-700 px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-800 flex items-center gap-1"
            >
              <FaUserShield /> ADMIN
            </Link>
            <Link
              to="/restsignup"
              className="bg-red-700 px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-800 flex items-center gap-1"
            >
              <FaUtensils /> RESTAURANT
            </Link>
          </div>

          {/* Mobile Menu Icon */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMenuOpen(true)}
          >
            <FaBars />
          </button>
        </div>

        {/* Mobile Sidebar Menu */}
        {menuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 h-screen w-[80%] max-w-xs bg-[#1f1f1f] z-50 shadow-lg flex flex-col"
          >
            <div className="flex justify-between items-center px-4 py-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold">MENU</h2>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-white text-xl"
              >
                <FaTimes />
              </button>
            </div>

            <nav className="flex flex-col px-4 py-6 space-y-5 text-sm">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 hover:text-red-500"
              >
                <FaHome /> Home
              </Link>
              <Link
                smooth
                to="/#about-us"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 hover:text-red-500"
              >
                <FaInfoCircle /> About Us
              </Link>
              <Link
                smooth
                to="/#services"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 hover:text-red-500"
              >
                <FaConciergeBell /> Services
              </Link>
              <Link
                smooth
                to="/#contact-us"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 hover:text-red-500"
              >
                <FaPhoneAlt /> Contact Us
              </Link>
              <Link
                smooth
                to="/#terms"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 hover:text-red-500"
              >
                <FaFileContract /> Terms
              </Link>

              {/* Divider */}
              <hr className="border-gray-700" />

              {/* Action Buttons in Same Row */}
              <div className="flex flex-wrap gap-3 mt-4 justify-center">
                <Link
                  to="/restsignup"
                  className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-md text-white font-semibold hover:bg-red-700 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaUtensils /> RESTAURANT
                </Link>
                <Link
                  to="/adminlogin"
                  className="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-md text-white font-semibold hover:bg-red-700 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  <FaUserShield /> ADMIN
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </header>
    </>
  );
};

export default Navbar;
