import React from 'react';
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';  // Import useAuth from AuthContext
import { ThemeProvider } from './context/ThemeContext'; // Import ThemeProvider

import Header from './components/Header';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import RoleManagement from './components/RoleManagement';
import Login from './components/Login';
import Registration from './components/Registration';
import Profile from './components/Profile';  // Import Profile Component

const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider> 
        {/* Set the basename to the repository name for GitHub Pages deployment */}
        <Router basename="/Role-Based-Access-Control">
          <Header />
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />

            {/* Private Routes - Accessible only if authenticated */}
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/dashboard/users" element={<PrivateRoute><UserManagement /></PrivateRoute>} />
            <Route path="/dashboard/roles" element={<PrivateRoute><RoleManagement /></PrivateRoute>} />
            
            {/* Profile route */}
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />

            {/* Redirect to login if trying to access an unauthorized route */}
            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

// PrivateRoute component to check if user is authenticated
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();  // Use the custom context for authentication state

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  return children;
};

export default App;
