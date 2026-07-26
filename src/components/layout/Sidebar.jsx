import {

    Drawer,

    List,

    ListItemButton,

    ListItemIcon,

    ListItemText,

    Toolbar

} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import BusinessIcon from "@mui/icons-material/Business";
import SolarPowerIcon from "@mui/icons-material/SolarPower";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import InsightsIcon from "@mui/icons-material/Insights";
import DescriptionIcon from "@mui/icons-material/Description";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";

import {

    NavLink

} from "react-router-dom";

const drawerWidth = 260;

const menus = [

    {

        text: "Dashboard",

        icon: <DashboardIcon />,

        path: "/dashboard"

    },

    {

        text: "Sites",

        icon: <BusinessIcon />,

        path: "/sites"

    },

    {

        text: "Telemetry",

        icon: <ElectricalServicesIcon />,

        path: "/telemetry"

    },

    {

        text: "Battery",

        icon: <BatteryChargingFullIcon />,

        path: "/battery"

    },

    {

        text: "Solar",

        icon: <SolarPowerIcon />,

        path: "/solar"

    },

    {

        text: "Analytics",

        icon: <AnalyticsIcon />,

        path: "/analytics"

    },

    {

        text: "Optimization",

        icon: <InsightsIcon />,

        path: "/optimization"

    },

    {

        text: "Reports",

        icon: <DescriptionIcon />,

        path: "/reports"

    },

    {

        text: "Notifications",

        icon: <NotificationsIcon />,

        path: "/notifications"

    },

    {

        text: "Settings",

        icon: <SettingsIcon />,

        path: "/settings"

    },

    {

        text: "Reports",

        icon: <AssessmentIcon />,

        path: "/reports"

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

            <List>

                {

                    menus.map(item => (

                        <ListItemButton

                            key={item.text}

                            component={NavLink}

                            to={item.path}

                        >

                            <ListItemIcon>

                                {item.icon}

                            </ListItemIcon>

                            <ListItemText

                                primary={item.text}

                            />

                        </ListItemButton>

                    ))

                }

            </List>

        </Drawer>

    );

}