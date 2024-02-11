import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

//Pages
import Homepage from "./Pages/Homepage";
import AdminDashboard from "./Pages/AdminDashboard";
import FarmerRegister from "./Pages/Farmer/Register";
import AdminRegister from "./Pages/Admin/Register";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/farmer-register" element={<FarmerRegister />} />
        <Route exact path="/admin/folders/:id" element={<Folder />} />
        <Route path="/admin-register" element={<AdminRegister />} />
      </Routes>

    </Router>
  );
};

export default App;
