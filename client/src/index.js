import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import AdminState from './context/admin/adminState';
import FarmerState from './context/farmer/farmerState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AdminState>
    <FarmerState>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </FarmerState>
  </AdminState>
);


reportWebVitals();
