// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (username, role) => {
    setUsername(username);
    setRole(role);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUsername('');
    setRole('');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ username, role, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
