import { Box, Button, Stack, Typography } from "@mui/material";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import { Link as RouterLink } from "react-router-dom";

export default function NotFound() {

    return (

        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                px: 3
            }}
        >

            <Stack
                spacing={3}
                alignItems="center"
                textAlign="center"
            >

                <ErrorOutlinedIcon
                    color="error"
                    sx={{
                        fontSize: 90
                    }}
                />

                <Typography
                    variant="h2"
                    fontWeight={700}
                >

                    404

                </Typography>

                <Typography
                    variant="h5"
                >

                    Page Not Found

                </Typography>

                <Typography
                    color="text.secondary"
                    sx={{
                        maxWidth: 500
                    }}
                >

                    The page you are looking for does not exist,
                    has been moved, or the URL is incorrect.

                </Typography>

                <Button
                    component={RouterLink}
                    to="/dashboard"
                    variant="contained"
                    size="large"
                >

                    Back to Dashboard

                </Button>

            </Stack>

        </Box>

    );

}