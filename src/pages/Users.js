import React, { useEffect, useState } from "react";
import { fetchUsers, addUser, deleteUser } from "../api/mockApi";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({ name: "", email: "", role: "Viewer" });

    useEffect(() => {
        fetchUsers().then(setUsers);
    }, []);

    const handleAddUser = () => {
        addUser(newUser).then(() => fetchUsers().then(setUsers));
    };

    const handleDeleteUser = (id) => {
        deleteUser(id).then(() => fetchUsers().then(setUsers));
    };

    return (
        <div>
            <h2>Users</h2>
            <input
                type="text"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            <button onClick={handleAddUser}>Add User</button>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>{user.status}</td>
                            <td>
                                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
