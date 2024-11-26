import React, { useState } from 'react';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Snackbar, Alert } from '@mui/material';

const RoleManagement = () => {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState({ name: '', permissions: [] });
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleAddRole = () => {
    if (!newRole.name) {
      setError('Role name is required');
      setOpenSnackbar(true);
      return;
    }
    const newRoleData = { ...newRole, id: Date.now() }; // Unique ID using Date.now()
    setRoles([...roles, newRoleData]);
    setNewRole({ name: '', permissions: [] }); // Reset form after submission
  };

  const handleEditPermissions = (roleId, permission) => {
    setRoles(roles.map(role =>
      role.id === roleId
        ? { ...role, permissions: role.permissions.includes(permission)
            ? role.permissions.filter(p => p !== permission)
            : [...role.permissions, permission]
        }
        : role
    ));
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div>
      <h3>Role Management</h3>
      <div style={{ marginBottom: '20px' }}>
        <TextField
          label="Role Name"
          value={newRole.name}
          onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
          style={{ marginRight: '10px' }}
        />
        <Button variant="contained" color="primary" onClick={handleAddRole}>
          Add Role
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
              <TableCell>Role Name</TableCell>
              <TableCell>Permissions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.name}</TableCell>
                <TableCell>
  {['Read', 'Write', 'Delete'].map(permission => (
    <label key={permission} style={{ margin: '5px' }}>
      <input
        type="checkbox"
        checked={role.permissions.includes(permission)}
        onChange={() => handleEditPermissions(role.id, permission)}
      />
      {permission}
    </label>
  ))}
</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RoleManagement;
