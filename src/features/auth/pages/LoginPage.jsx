import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Stack,
    TextField,
    Typography
} from "@mui/material";

import { useState } from "react";
import { Navigate } from "react-router-dom";

import { useAuth } from "../hooks.js";

/*
|--------------------------------------------------------------------------
| Login Page
|--------------------------------------------------------------------------
*/

export default function LoginPage() {

    const {

        isAuthenticated,

        loading,

        error,

        signIn

    } = useAuth();

    const [credentials, setCredentials] = useState({

        email: "",

        password: ""

    });

    function handleChange(event) {

        setCredentials({

            ...credentials,

            [event.target.name]: event.target.value

        });

    }

    async function handleSubmit(event) {

        event.preventDefault();

        await signIn(credentials);

    }

    if (isAuthenticated) {

        return <Navigate to="/dashboard" replace />;

    }

    return (

        <Box

            sx={{

                minHeight: "100vh",

                display: "flex",

                justifyContent: "center",

                alignItems: "center",

                bgcolor: "background.default",

                p: 2

            }}

        >

            <Card

                sx={{

                    width: 420,

                    maxWidth: "100%"

                }}

            >

                <CardContent>

                    <Typography

                        variant="h4"

                        fontWeight={700}

                        gutterBottom

                    >

                        HEMAP RMS

                    </Typography>

                    <Typography

                        color="text.secondary"

                        mb={3}

                    >

                        Sign in to continue

                    </Typography>

                    {

                        error && (

                            <Alert

                                severity="error"

                                sx={{ mb: 2 }}

                            >

                                {error}

                            </Alert>

                        )

                    }

                    <form onSubmit={handleSubmit}>

                        <Stack spacing={2}>

                            <TextField

                                fullWidth

                                required

                                label="Email"

                                name="email"

                                type="email"

                                value={credentials.email}

                                onChange={handleChange}

                            />

                            <TextField

                                fullWidth

                                required

                                label="Password"

                                name="password"

                                type="password"

                                value={credentials.password}

                                onChange={handleChange}

                            />

                            <Button

                                type="submit"

                                variant="contained"

                                size="large"

                                disabled={loading}

                            >

                                {

                                    loading

                                        ? (

                                            <CircularProgress

                                                size={22}

                                                color="inherit"

                                            />

                                        )

                                        : "Login"

                                }

                            </Button>

                        </Stack>

                    </form>

                </CardContent>

            </Card>

        </Box>

    );

}