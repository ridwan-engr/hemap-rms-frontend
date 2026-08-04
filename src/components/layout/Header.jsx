import {
    AppBar,
    Avatar,
    Badge,
    Box,
    IconButton,
    Stack,
    Toolbar,
    Tooltip,
    Typography
} from "@mui/material";

import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import RefreshIcon from "@mui/icons-material/Refresh";

import { useDispatch } from "react-redux";

import { refreshDashboard } from "../../store/slices/dashboardSlice.js";

export default function Header({

    onMenuClick

}) {

    const dispatch = useDispatch();

    function handleRefresh() {

        dispatch(

            refreshDashboard()

        );

    }

    return (

        <AppBar

            elevation={0}

            color="inherit"

            position="sticky"

            sx={{

                borderBottom: 1,

                borderColor: "divider"

            }}

        >

            <Toolbar>

                <IconButton

                    edge="start"

                    onClick={onMenuClick}

                >

                    <MenuIcon />

                </IconButton>

                <Typography

                    variant="h6"

                    sx={{

                        flexGrow: 1,

                        ml: 2,

                        fontWeight: 700

                    }}

                >

                    HEMAP-RMS

                </Typography>

                <Stack

                    direction="row"

                    spacing={1}

                >

                    <Tooltip title="Refresh">

                        <IconButton

                            onClick={handleRefresh}

                        >

                            <RefreshIcon />

                        </IconButton>

                    </Tooltip>

                    <Tooltip title="Notifications">

                        <IconButton>

                            <Badge

                                color="error"

                                badgeContent={0}

                            >

                                <NotificationsNoneOutlinedIcon />

                            </Badge>

                        </IconButton>

                    </Tooltip>

                    <Avatar>

                        A

                    </Avatar>

                </Stack>

            </Toolbar>

        </AppBar>

    );

}