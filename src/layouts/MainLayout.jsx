import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
    AppBar,
    Avatar,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";

import {
    Menu as MenuIcon,
    Dashboard,
    Business,
    ElectricalServices,
    BatteryChargingFull,
    SolarPower,
    Bolt,
    Analytics,
    AutoGraph,
    Assessment,
    Notifications,
    Settings,
    Logout,
    AccountCircle
} from "@mui/icons-material";

import { logout } from "../store/slices/authSlice";

const drawerWidth = 260;

const navigation = [

    {
        label: "Dashboard",
        path: "/dashboard",
        icon: <Dashboard />
    },

    {
        label: "Sites",
        path: "/sites",
        icon: <Business />
    },

    {
        label: "Installations",
        path: "/installations",
        icon: <ElectricalServices />
    },

    {
        label: "Battery",
        path: "/battery",
        icon: <BatteryChargingFull />
    },

    {
        label: "Solar",
        path: "/solar",
        icon: <SolarPower />
    },

    {
        label: "Grid",
        path: "/grid",
        icon: <Bolt />
    },

    {
        label: "Analytics",
        path: "/analytics",
        icon: <Analytics />
    },

    {
        label: "Optimization",
        path: "/optimization",
        icon: <AutoGraph />
    },

    {
        label: "Reports",
        path: "/reports",
        icon: <Assessment />
    },

    {
        label: "Notifications",
        path: "/notifications",
        icon: <Notifications />
    },

    {
        label: "Settings",
        path: "/settings",
        icon: <Settings />
    }

];

export default function MainLayout() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const location = useLocation();

    const [mobileOpen, setMobileOpen] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);

    const toggleDrawer = () => {

        setMobileOpen(!mobileOpen);

    };

    const openProfileMenu = (event) => {

        setAnchorEl(event.currentTarget);

    };

    const closeProfileMenu = () => {

        setAnchorEl(null);

    };

    const handleLogout = () => {

        dispatch(logout());

        navigate("/login");

    };

    const drawer = (

        <>

            <Toolbar>

                <Typography
                    variant="h6"
                    fontWeight={700}
                >

                    HEMAP-RMS

                </Typography>

            </Toolbar>

            <Divider />

            <List>

                {

                    navigation.map((item) => (

                        <ListItemButton

                            key={item.path}

                            selected={location.pathname === item.path}

                            onClick={() => {

                                navigate(item.path);

                                setMobileOpen(false);

                            }}

                        >

                            <ListItemIcon>

                                {item.icon}

                            </ListItemIcon>

                            <ListItemText

                                primary={item.label}

                            />

                        </ListItemButton>

                    ))

                }

            </List>

        </>

    );

    return (

        <Box sx={{ display: "flex" }}>

            <CssBaseline />

            <AppBar

                position="fixed"

                sx={{

                    width: {

                        sm: `calc(100% - ${drawerWidth}px)`

                    },

                    ml: {

                        sm: `${drawerWidth}px`

                    }

                }}

            >

                <Toolbar>

                    <IconButton

                        color="inherit"

                        edge="start"

                        onClick={toggleDrawer}

                        sx={{

                            mr: 2,

                            display: {

                                sm: "none"

                            }

                        }}

                    >

                        <MenuIcon />

                    </IconButton>

                    <Typography

                        variant="h6"

                        sx={{ flexGrow: 1 }}

                    >

                        Hybrid Energy Monitoring and Analytics Platform

                    </Typography>

                    <Tooltip title="Profile">

                        <IconButton

                            color="inherit"

                            onClick={openProfileMenu}

                        >

                            <Avatar>

                                <AccountCircle />

                            </Avatar>

                        </IconButton>

                    </Tooltip>

                    <Menu

                        anchorEl={anchorEl}

                        open={Boolean(anchorEl)}

                        onClose={closeProfileMenu}

                    >

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

            <Box

                component="nav"

                sx={{

                    width: {

                        sm: drawerWidth

                    },

                    flexShrink: {

                        sm: 0

                    }

                }}

            >

                <Drawer

                    variant="temporary"

                    open={mobileOpen}

                    onClose={toggleDrawer}

                    ModalProps={{

                        keepMounted: true

                    }}

                    sx={{

                        display: {

                            xs: "block",

                            sm: "none"

                        },

                        "& .MuiDrawer-paper": {

                            width: drawerWidth

                        }

                    }}

                >

                    {drawer}

                </Drawer>

                <Drawer

                    variant="permanent"

                    open

                    sx={{

                        display: {

                            xs: "none",

                            sm: "block"

                        },

                        "& .MuiDrawer-paper": {

                            width: drawerWidth,

                            boxSizing: "border-box"

                        }

                    }}

                >

                    {drawer}

                </Drawer>

            </Box>

            <Box

                component="main"

                sx={{

                    flexGrow: 1,

                    p: 3,

                    width: {

                        sm: `calc(100% - ${drawerWidth}px)`

                    }

                }}

            >

                <Toolbar />

                <Outlet />

            </Box>

        </Box>

    );

}