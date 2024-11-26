import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Ensure the correct path to AuthContext

const Dashboard = () => {
  const { username, role, isAuthenticated, login, logout } = useAuth(); // Access context values

  // State for notifications
  const [notifications, setNotifications] = useState([
    'You have a new task assigned.',
    'Your profile has been updated.',
    'A new comment was posted on your task.',
  ]);
  const [showNotifications, setShowNotifications] = useState(false); // To toggle notifications view

  // State for tasks
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [showCreateTaskForm, setShowCreateTaskForm] = useState(false); // To toggle task creation form visibility

  // Handle Create Task button functionality
  const handleCreateTask = () => {
    setShowCreateTaskForm(true); // Show the task creation form
  };

  // Handle task submission
  const handleTaskSubmit = (e) => {
    e.preventDefault();

    if (!taskName || !taskDescription) {
      alert('Please fill out all fields!');
      return;
    }

    // Add the new task to the tasks list
    const newTask = { name: taskName, description: taskDescription };
    setTasks([...tasks, newTask]);

    // Reset the form
    setTaskName('');
    setTaskDescription('');
    setShowCreateTaskForm(false); // Hide the form after submission
  };

  // If not authenticated, render login page
  if (!isAuthenticated) {
    return (
      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h1>Welcome to the RBAC!</h1>
        </div>
        <p>Please log in to access the dashboard.</p>
        <button
          onClick={() => {
            // Prompt for username and role
            const enteredUsername = prompt('Enter your username:');
            if (!enteredUsername) {
              alert('Username is required!');
              return;
            }

            const enteredRole = prompt('Enter your role (Admin/User):').toLowerCase();
            if (!['admin', 'user'].includes(enteredRole)) {
              alert('Invalid role! Please enter "Admin" or "User".');
              return;
            }

            // Call login function with entered credentials
            login(enteredUsername, enteredRole);
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            transition: 'background-color 0.3s ease, transform 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#0056b3';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#007BFF';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Login
        </button>
      </div>
    );
  }

  // Render dashboard if authenticated
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>
        Welcome to the Dashboard, {username} (
        {role ? role.charAt(0).toUpperCase() + role.slice(1) : 'Unknown Role'})!
      </h2>
      <button
        onClick={logout}
        style={{
          padding: '10px 20px',
          backgroundColor: '#FF5733',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
          marginBottom: '20px',
          transition: 'background-color 0.3s ease, transform 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#cc4628';
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#FF5733';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        Logout
      </button>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        {/* Create Task Card */}
        <div
          style={{
            border: '1px solid #ccc',
            padding: '20px',
            borderRadius: '8px',
            width: '30%',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
          }}
        >
          <h4 style={{ marginBottom: '15px', color: '#333', fontWeight: 'bold' }}>Create Task</h4>
          <button
            onClick={handleCreateTask}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4CAF50',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease, transform 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#45a049')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4CAF50')}
          >
            Create
          </button>

          {/* Show task creation form if visible */}
          {showCreateTaskForm && (
            <form
              onSubmit={handleTaskSubmit}
              style={{
                marginTop: '20px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <input
                type="text"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                placeholder="Task Name"
                style={{
                  padding: '10px',
                  marginBottom: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  fontSize: '16px',
                }}
                required
              />
              <textarea
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Task Description"
                rows="4"
                style={{
                  padding: '10px',
                  marginBottom: '10px',
                  borderRadius: '4px',
                  border: '1px solid #ccc',
                  fontSize: '16px',
                }}
                required
              />
              <button
                type="submit"
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#28a745',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease, transform 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#218838')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#28a745')}
              >
                Submit Task
              </button>
            </form>
          )}
        </div>

        {/* Notifications Card */}
        <div
          style={{
            border: '1px solid #ccc',
            padding: '20px',
            borderRadius: '8px',
            width: '30%',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 8px 12px rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
          }}
        >
          <h4 style={{ marginBottom: '15px', color: '#333', fontWeight: 'bold' }}>Notifications</h4>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease, transform 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0056b3')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#007BFF')}
          >
            Toggle Notifications
          </button>
          {showNotifications && (
            <ul style={{ marginTop: '20px', paddingLeft: '0' }}>
              {notifications.map((notification, index) => (
                <li key={index} style={{ marginBottom: '10px', color: '#555' }}>
                  {notification}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Display tasks */}
      <div style={{ marginTop: '20px' }}>
        <h4 style={{ marginBottom: '10px', color: '#333', fontWeight: 'bold' }}>Your Tasks</h4>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              <h5>{task.name}</h5>
              <p>{task.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
