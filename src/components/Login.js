import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box, Paper, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Ensure this is defined in your AuthContext
import axios from 'axios';

const Login = () => {
  const { login } = useAuth(); // The custom context to manage authentication state
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Mock validation logic (since there's no backend)
    if (
      (username === 'pavan' && role === 'User') || // User login logic
      (username === 'admin' && role === 'Admin') // Admin login logic
    ) {
      // Simulating a successful login
      login(username, role);
      localStorage.setItem('user', JSON.stringify({ username, role })); // Store user info in localStorage
      navigate('/dashboard'); // Redirect to dashboard on success
    } else {
      setError('Invalid username or role!');
    }
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: '100px' }}>
      <Paper elevation={3} style={{ padding: '30px', borderRadius: '8px' }}>
        <Box textAlign="center" mb={3}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome to RBAC
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Please login to continue
          </Typography>
        </Box>

        {/* Error message display */}
        {error && (
          <Typography color="error" align="center" style={{ marginBottom: '20px' }}>
            {error}
          </Typography>
        )}

        {/* Username Input */}
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          style={{ marginBottom: '20px' }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Role Selection */}
        <FormControl fullWidth variant="outlined" style={{ marginBottom: '20px' }}>
          <InputLabel>Role</InputLabel>
          <Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            label="Role"
          >
            <MenuItem value="Admin">Admin</MenuItem>
            <MenuItem value="User">User</MenuItem>
          </Select>
        </FormControl>

        {/* Login Button */}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
        >
          Login
        </Button>
      </Paper>
    </Container>
  );
};

export default Login;
