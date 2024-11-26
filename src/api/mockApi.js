// Mock API functions to simulate server-side CRUD operations
export const mockGetUsers = () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([
        { id: 1, username: 'user1', role: 'Admin', status: 'Active' },
        { id: 2, username: 'user2', role: 'User', status: 'Inactive' }
      ]), 500);
    });
  };
  
  export const mockAddUser = (user) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ...user, id: Date.now() }), 500);
    });
  };
  
  export const mockDeleteUser = (id) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(id), 500);
    });
  };
  