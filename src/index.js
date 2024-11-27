import React from 'react';
import ReactDOM from 'react-dom/client'; // React 18+ syntax
import './index.css'; // Optional for global styles
import App from './App'; // Main App component

const root = ReactDOM.createRoot(document.getElementById('root')); // Ensure 'root' div exists
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
