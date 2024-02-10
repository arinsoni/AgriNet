import React from "react";

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
