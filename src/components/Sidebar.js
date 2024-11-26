import React from "react";
import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Dashboard, People, Security } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div style={{ width: "250px", background: "#f4f4f4", height: "100vh" }}>
            <h2 style={{ padding: "1rem", textAlign: "center" }}>RBAC Admin</h2>
            <List>
                <ListItem button component={Link} to="/dashboard">
                    <ListItemIcon>
                        <Dashboard />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button component={Link} to="/users">
                    <ListItemIcon>
                        <People />
                    </ListItemIcon>
                    <ListItemText primary="Users" />
                </ListItem>
                <ListItem button component={Link} to="/roles">
                    <ListItemIcon>
                        <Security />
                    </ListItemIcon>
                    <ListItemText primary="Roles" />
                </ListItem>
            </List>
        </div>
    );
};

export default Sidebar;
