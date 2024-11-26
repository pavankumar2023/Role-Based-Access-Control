import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle registration functionality
  const handleRegister = (e) => {
    e.preventDefault();

    // Debugging: Check entered values
    console.log('Entered Username:', username);
    console.log('Entered Password:', password);

    // Retrieve existing users from localStorage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the username already exists
    if (existingUsers.find(user => user.username === username)) {
      alert('Username already exists');
    } else {
      // Add new user to the list
      const newUser = { username, password };
      existingUsers.push(newUser);

      // Store updated users in localStorage
      localStorage.setItem('users', JSON.stringify(existingUsers));

      // Redirect to login after successful registration
      alert('Registration successful');
      navigate('/login');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
