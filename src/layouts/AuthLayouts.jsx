import { Outlet } from "react-router-dom";

import {
    Box,
    Container,
    Paper,
    Typography
} from "@mui/material";

/**
 * ============================================================================
 * Auth Layout
 * ============================================================================
 * Layout for authentication pages.
 *
 * Used by:
 * - Login
 * - Forgot Password
 * - Reset Password
 * ============================================================================
 */

export default function AuthLayout() {

    return (

        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "background.default",
                px: 2
            }}
        >

            <Container
                maxWidth="sm"
            >

                <Paper
                    elevation={8}
                    sx={{
                        p: 5,
                        borderRadius: 3
                    }}
                >

                    <Box
                        sx={{
                            textAlign: "center",
                            mb: 4
                        }}
                    >

                        <Typography
                            variant="h4"
                            fontWeight={700}
                            gutterBottom
                        >
                            HEMAP-RMS
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Hybrid Energy Monitoring and
                            Analytics Platform
                        </Typography>

                    </Box>

                    <Outlet />

                </Paper>

            </Container>

        </Box>

    );

}