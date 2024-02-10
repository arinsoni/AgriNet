import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//App CSS
import "./App.css";

//Pages
import Homepage from "./Pages/Homepage";

const App = () => {
  return (
    <Router>
        <Routes>
          <Route exact path="/" element={<Homepage />} />
        </Routes>
    </Router>
  );
};

export default App;
