import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Adjust the path to your AuthContext

const Profile = () => {
  const { username, role } = useAuth(); // Get user details from AuthContext

  // State to manage profile updates and notifications
  const [newUsername, setNewUsername] = useState(username);
  const [newAvatar, setNewAvatar] = useState(`https://robohash.org/${username}?set=set4`);
  const [showNotifications, setShowNotifications] = useState(false); // State to toggle notifications
  const [notifications] = useState([
    "You have a new message from the admin.",
    "Your task deadline is approaching.",
    "There are updates available for your profile.",
  ]);

  const [isEditing, setIsEditing] = useState(false); // State to toggle Edit Profile mode

  // Profile card styles
  const cardStyle = {
    maxWidth: '400px',
    margin: '20px auto',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    fontFamily: 'Arial, sans-serif',
  };

  const avatarStyle = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    margin: '0 auto 20px',
    display: 'block',
    border: '2px solid #4CAF50',
  };

  const buttonStyle = {
    padding: '10px 20px',
    margin: '10px 0',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease, transform 0.2s',
  };

  const handleUsernameChange = (e) => setNewUsername(e.target.value);
  const handleAvatarChange = (e) => {
    const reader = new FileReader();
    reader.onloadend = () => setNewAvatar(reader.result);
    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
  };

  const handleProfileUpdate = () => {
    // Update the profile (this could be done with an API call or context update)
    alert('Profile updated successfully!');
    setIsEditing(false); // Close the edit mode after saving
  };

  const toggleNotifications = () => setShowNotifications(!showNotifications); // Toggle notification visibility

  return (
    <div style={{ padding: '20px' }}>
      <div style={cardStyle}>
        <img
          src={newAvatar} // Show updated avatar
          alt="Avatar"
          style={avatarStyle}
        />
        <h2 style={{ textAlign: 'center', color: '#333' }}>Welcome, {newUsername}!</h2>
        <p style={{ textAlign: 'center', color: '#666' }}>
          Role: <strong>{role.charAt(0).toUpperCase() + role.slice(1)}</strong>
        </p>
        <hr style={{ margin: '20px 0', border: 'none', borderTop: '1px solid #ddd' }} />
        <div>
        <p>
  As a <strong>{role}</strong>, you play a crucial role in shaping the success of the platform. Whether you’re managing tasks, reviewing updates, or connecting with others, you have access to the tools that matter most. Stay proactive, keep track of your projects, and contribute to the community’s growth.
</p>


          {/* Edit Profile Button */}
          {!isEditing ? (
            <button
              style={buttonStyle}
              onClick={() => setIsEditing(true)} // Enter edit mode
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#007BFF')}
            >
              Edit Profile
            </button>
          ) : (
            <div>
              {/* Form to edit username and avatar */}
              <div style={{ marginTop: '10px' }}>
                <input
                  type="text"
                  value={newUsername}
                  onChange={handleUsernameChange}
                  placeholder="Enter new name"
                  style={{
                    padding: '10px',
                    width: '100%',
                    marginTop: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ddd',
                  }}
                />
              </div>

              <div style={{ marginTop: '10px' }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  style={{ marginTop: '10px' }}
                />
              </div>

              <button
                style={buttonStyle}
                onClick={handleProfileUpdate} // Save profile changes
              >
                Save Changes
              </button>

              <button
                style={{
                  ...buttonStyle,
                  backgroundColor: '#FF5733',
                }}
                onClick={() => setIsEditing(false)} // Cancel edit mode
              >
                Cancel
              </button>
            </div>
          )}

          {/* View Notifications Button */}
          <button
            style={{
              ...buttonStyle,
              backgroundColor: '#FF5733',
            }}
            onClick={toggleNotifications} // Toggle notifications visibility
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#cc4628')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FF5733')}
          >
            View Notifications
          </button>

          {/* Notifications Section */}
          {showNotifications && (
            <div style={{ marginTop: '20px' }}>
              <h3>Notifications:</h3>
              <ul>
                {notifications.map((notification, index) => (
                  <li key={index} style={{ padding: '5px 0', color: '#555' }}>
                    {notification}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
