import React from 'react';
import { Button, Avatar, Typography, Menu, MenuItem } from '@mui/material';
import { useAuth } from '../context/AuthContext';  // Import AuthContext for authentication
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import { Link } from 'react-router-dom';  // Import Link for navigation

const Header = () => {
  const { isAuthenticated, userRole, username } = useAuth(); // Get authentication and user info
  const navigate = useNavigate();  // Navigate hook
  const [anchorEl, setAnchorEl] = React.useState(null); // State for the menu

  // Handle opening the menu
  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  // Handle closing the menu
  const handleMenuClose = () => setAnchorEl(null);

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');  // Clear login status
    navigate('/login');  // Redirect to login page
  };

  // Handle navigating to profile page
  const handleProfile = () => {
    navigate('/profile');  // Redirect to profile page (adjust path as necessary)
    handleMenuClose();  // Close the menu after navigation
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', backgroundColor: 'lightblue', alignItems: 'center' }}>
    {/* Logo Image */}
    <img 
          src="https://cdn.iconscout.com/icon/premium/png-512-thumb/secure-profile-icon-download-in-svg-png-gif-file-formats--account-safe-user-control-and-navigation-pack-miscellaneous-icons-10400910.png?f=webp&w=256" // Placeholder image for demonstration (replace with your image URL)
          alt="Logo"
      style={{ width: '40px', height: '40px', marginRight: '10px' }}
    />
    
    {/* Welcome to RBAC (Clickable Link) */}
    <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
      <Typography variant="h6">Welcome to RBAC</Typography>
    </Link>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        {/* Manage Users and Manage Roles buttons displayed after login */}
        {isAuthenticated && (
          <>
            {/* Manage Users Button */}
            <Link to="/dashboard/users" style={{ marginRight: '15px', textDecoration: 'none' }}>
              <Button variant="contained" color="primary">Manage Users</Button>
            </Link>

            {/* Manage Roles Button */}
            <Link to="/dashboard/roles" style={{ marginRight: '15px', textDecoration: 'none' }}>
              <Button variant="contained" color="primary">Manage Roles</Button>
            </Link>
          </>
        )}

        {/* Conditional display for user profile and logout */}
        {isAuthenticated ? (
          <div>
            <Button onClick={handleMenuOpen} style={{ display: 'flex', alignItems: 'center' }}>
              {/* Avatar with initials */}
              <Avatar sx={{ bgcolor: userRole === 'Admin' ? 'blue' : 'green', marginRight: 1 }}>
                {username ? username[0].toUpperCase() : (userRole === 'Admin' ? 'A' : 'U')}
              </Avatar>
              <span>{username || userRole}</span>
            </Button>

            {/* Menu with Profile and Logout options */}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {/* Profile MenuItem */}
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              {/* Logout MenuItem */}
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          
          <Button> </Button> 
        )}
      </div>
    </div>
  );
};

export default Header;
