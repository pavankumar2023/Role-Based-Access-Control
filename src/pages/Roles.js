import React, { useEffect, useState } from "react";
import { fetchRoles } from "../api/mockApi";

const Roles = () => {
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        fetchRoles().then(setRoles);
    }, []);

    return (
        <div>
            <h2>Roles</h2>
            <table>
                <thead>
                    <tr>
                        <th>Role</th>
                        <th>Permissions</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map((role) => (
                        <tr key={role.id}>
                            <td>{role.name}</td>
                            <td>{role.permissions.join(", ")}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Roles;
