import React, { useState } from 'react';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Switch, Snackbar, Alert } from '@mui/material';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', role: '', status: 'Active' });
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleAddUser = () => {
    if (!newUser.username || !newUser.role) {
      setError('Username and role are required');
      setOpenSnackbar(true);
      return;
    }
    const newUserData = { ...newUser, id: Date.now() }; // Using Date.now() for unique ID
    setUsers((prevUsers) => [...prevUsers, newUserData]); // Use functional form of setState
    setNewUser({ username: '', role: '', status: 'Active' }); // Reset form after submission
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const toggleUserStatus = (id) => {
    setUsers((prevUsers) =>
      prevUsers.map(user =>
        user.id === id ? { ...user, status: user.status === 'Active' ? 'Inactive' : 'Active' } : user
      )
    );
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <h3>User Management</h3>
      
      <div style={{ marginBottom: '20px' }}>
        <TextField
          label="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          style={{ marginRight: '10px' }}
        />
        <TextField
          label="Role"
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          style={{ marginRight: '10px' }}
        />
        <Button variant="contained" color="primary" onClick={handleAddUser}>
          Add User
        </Button>
      </div>

      {/* Snackbar for Error Message */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error">
          {error}
        </Alert>
      </Snackbar>

      <TableContainer component={Paper} style={{ marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Switch
                    checked={user.status === 'Active'}
                    onChange={() => toggleUserStatus(user.id)}
                    color="primary"
                  />
                </TableCell>
                <TableCell>
                  <Button color="secondary" onClick={() => handleDeleteUser(user.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserManagement;
