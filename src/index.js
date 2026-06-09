import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; 
import App from './App';
// import { BrowserRouter } from 'react-router-dom'; // Iski zaroorat yahan nahi hai

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* BrowserRouter yahan se hata diya gaya hai */}
    <App />
  </React.StrictMode>
);