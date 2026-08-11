import { useState } from "react";
import { useLocation } from "react-router-dom";

import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Badge,
    Menu,
    MenuItem,
    Avatar,
    Box,
    Tooltip
} from "@mui/material";

import {
    Notifications,
    AccountCircle,
    Logout
} from "@mui/icons-material";

import { useAuth } from "../contexts/AuthContext.jsx";

const titles = {

    "/dashboard": "Dashboard",

    "/sites": "Sites",

    "/installations": "Installations",

    "/telemetry": "Telemetry",

    "/analytics": "Analytics",

    "/statistics": "Statistics",

    "/optimization": "Optimization",

    "/alarms": "Alarms",

    "/users": "Users",

    "/settings": "Settings",

     "/vrm": "VRM"

};

export default function Topbar() {

    const location = useLocation();

    const { user, logout } = useAuth();

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const pageTitle =
        titles[location.pathname] || "HEMAP RMS";

    function handleMenu(event) {

        setAnchorEl(event.currentTarget);

    }

    function handleClose() {

        setAnchorEl(null);

    }

    async function handleLogout() {

        handleClose();

        await logout();

    }

    return (

        <AppBar
            position="sticky"
            color="inherit"
            elevation={1}
        >

            <Toolbar>

                <Typography
                    variant="h6"
                    sx={{
                        flexGrow: 1,
                        fontWeight: 600
                    }}
                >

                    {pageTitle}

                </Typography>

                <Tooltip title="Notifications">

                    <IconButton color="inherit">

                        <Badge
                            badgeContent={3}
                            color="error"
                        >

                            <Notifications />

                        </Badge>

                    </IconButton>

                </Tooltip>

                <Box ml={2}>

                    <IconButton
                        color="inherit"
                        onClick={handleMenu}
                    >

                        {user?.avatar ? (

                            <Avatar
                                src={user.avatar}
                            />

                        ) : (

                            <AccountCircle />

                        )}

                    </IconButton>

                </Box>

                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >

                    <MenuItem disabled>

                        {user?.name || "Administrator"}

                    </MenuItem>

                    <MenuItem
                        onClick={handleLogout}
                    >

                        <Logout
                            sx={{ mr: 1 }}
                        />

                        Logout

                    </MenuItem>

                </Menu>

            </Toolbar>

        </AppBar>

    );

}