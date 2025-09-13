import React, { useState } from "react";
import { motion } from "framer-motion";
import BgImg from "../assets/header.png";
import { HashLink as Link } from "react-router-hash-link";
import { FaPlay } from "react-icons/fa";

const HeroSection = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <section
      id="home"
      className="relative h-screen flex flex-col md:flex-row items-center justify-center px-6 sm:px-16 bg-white"
    >
      {/* Left Column - Text */}
      <div className="z-10 md:w-1/2 flex flex-col justify-center items-start text-left max-w-xl">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-wide text-gray-900"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          WELCOME TO <span className="text-red-700">MAKEMYDAY</span> PANEL
        </motion.h1>

        <motion.p
          className="mt-6 text-sm  text-gray-700 leading-relaxed tracking-wider max-w-md"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          At MAKEMYDAY, we help you achieve your fitness and wellness goals
          through personalized and innovative online coaching.
        </motion.p>

        <div className="mt-10 flex gap-3">
          <Link to="/adminpanel">
            <button className="px-12 py-3 text-sm bg-red-700 hover:bg-red-600 text-white font-semibold rounded-md shadow-md transition-transform transform hover:scale-105">
              ADMIN
            </button>
          </Link>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-3 px-6 py-3 text-sm  text-red-700 font-semibold rounded-md hover:bg-red-700 hover:text-white transition"
          >
            <FaPlay size={18} />
            Watch  Video
          </button>
        </div>
      </div>

      {/* Right Column - Background Image */}
      <div className="md:w-1/2 relative h-96 md:h-full flex justify-center items-center mt-10 md:mt-0">
        
        <img
          src={BgImg}
          alt="Hero background"
          className="relative object-cover rounded-lg shadow-lg max-w-full max-h-full"
        />
      </div>

      {/* Optional: Modal for Video */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white rounded-lg overflow-hidden max-w-3xl w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 font-bold text-xl"
            >
              &times;
            </button>
            {/* Replace with your video embed or player */}
            <iframe
              width="100%"
              height="450"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Training Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
