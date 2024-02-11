import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

//Pages
import Homepage from "./Pages/Homepage";
import AdminDashboard from "./Pages/AdminDashboard";
import FarmerRegister from "./Pages/Farmer/Register";
import AdminRegister from "./Pages/Admin/Register";
import Folder from "./Pages/Folder";
import FarmerDashboard from "./Pages/FarmerDashboard";
import AdminLogin from "./Pages/Admin/Login";
import FarmerLogin from "./Pages/Farmer/Login";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage />} />

        {/* Admin Routes */}
        <Route exact path="/admin-dashboard/:id" element={<AdminDashboard />} />
        <Route exact path="/admin/folders/:id" element={<Folder />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Farmer Routes */}
        <Route exact path="/farmer-dashboard/:id" element={<FarmerDashboard />} />
        <Route path="/farmer-register" element={<FarmerRegister />} />
        <Route path="/farmer-login" element={<FarmerLogin />} />

      </Routes>

    </Router>
  );
};

export default App;
