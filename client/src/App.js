import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//App CSS
import "./App.css";

//Pages
import Homepage from "./Pages/Homepage";
import AdminDashboard from "./Pages/AdminDashboard";

const App = () => {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
    </Router>
  );
};

export default App;
