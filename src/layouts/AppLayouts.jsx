import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";

export default function AppLayout() {

    return (

        <Box
            sx={{
                display: "flex",
                minHeight: "100vh",
                backgroundColor: "background.default"
            }}
        >

            <Sidebar />

            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column"
                }}
            >

                <Topbar />

                <Box
                    component="main"
                    sx={{
                        flex: 1,
                        p: 3,
                        overflow: "auto"
                    }}
                >

                    <Outlet />

                </Box>

            </Box>

        </Box>

    );

}