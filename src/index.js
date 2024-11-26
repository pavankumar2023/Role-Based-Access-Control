import React from 'react';
import ReactDOM from 'react-dom/client';  // Ensure you're using React 18+ syntax
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';  // Ensure AuthProvider is being used

const root = ReactDOM.createRoot(document.getElementById('root')); // Ensure 'root' div exists in your public/index.html
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
