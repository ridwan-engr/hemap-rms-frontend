import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Divider
} from "@mui/material";

import {
    Dashboard,
    LocationOn,
    Router,
    BatteryChargingFull,
    Assessment,
    Warning,
    Settings,
    People,
    Tune,
    Timeline
} from "@mui/icons-material";

import { NavLink } from "react-router-dom";

const drawerWidth = 260;

const menu = [

    {
        title: "Dashboard",
        icon: <Dashboard />,
        path: "/dashboard"
    },

    {
        title: "Sites",
        icon: <LocationOn />,
        path: "/sites"
    },

    {
        title: "Installations",
        icon: <Router />,
        path: "/installations"
    },

    {
        title: "Telemetry",
        icon: <BatteryChargingFull />,
        path: "/telemetry"
    },

    {
        title: "Analytics",
        icon: <Timeline />,
        path: "/analytics"
    },

    {
        title: "Statistics",
        icon: <Assessment />,
        path: "/statistics"
    },

    {
        title: "Optimization",
        icon: <Tune />,
        path: "/optimization"
    },

    {
        title: "Alarms",
        icon: <Warning />,
        path: "/alarms"
    },

    {
        title: "Users",
        icon: <People />,
        path: "/users"
    },

    {
        title: "Settings",
        icon: <Settings />,
        path: "/settings"
    }

];

export default function Sidebar() {

    return (

        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box"
                }
            }}
        >

            <Toolbar />

            <Divider />

            <List>

                {menu.map((item) => (

                    <ListItemButton
                        key={item.path}
                        component={NavLink}
                        to={item.path}
                        sx={{
                            "&.active": {
                                backgroundColor: "primary.main",
                                color: "#fff",

                                "& .MuiListItemIcon-root": {
                                    color: "#fff"
                                }
                            }
                        }}
                    >

                        <ListItemIcon>

                            {item.icon}

                        </ListItemIcon>

                        <ListItemText
                            primary={item.title}
                        />

                    </ListItemButton>

                ))}

            </List>

        </Drawer>

    );

}