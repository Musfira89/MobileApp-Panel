import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./components/Home";
import AdminLogin from "./pages/admin/login";
import AdminLayout from "./layouts/AdminLayout";

// Admin Pages
import Dashboard from "./pages/admin/dashboard";
import Reservations from "./pages/admin/reservations";
import Restaurants from "./pages/admin/restaurants";
import Users from "./pages/admin/users";
import Earnings from "./pages/admin/earnings";

// Rest
import RestDashboard from "./pages/restaurant/dashboard";
import RestSignup from "./pages/restaurant/signup";
import RestLogin from "./pages/restaurant/login";
import RestLayout from "./layouts/RestLayout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Admin Auth */}
        <Route path="/adminpanel" element={<AdminLogin />} />

        {/* Admin Dashboard with Layout */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/reservations"
          element={
            <AdminLayout>
              <Reservations />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/restaurants"
          element={
            <AdminLayout>
              <Restaurants />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminLayout>
              <Users />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/earnings"
          element={
            <AdminLayout>
              <Earnings />
            </AdminLayout>
          }
        />

        {/* Rest Auth */}
        <Route path="/restlogin" element={<RestLogin />} />
        <Route path="/restsignup" element={<RestSignup />} />

        {/* Admin Dashboard with Layout */}
        <Route
          path="/rest/dashboard"
          element={
            <RestLayout>
              <RestDashboard />
            </RestLayout>
          }
        />
      </Routes>

      <ToastContainer />
    </Router>
  );
}

export default App;
