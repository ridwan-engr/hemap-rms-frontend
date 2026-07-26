import { useEffect, useState } from "react";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Paper,
    Stack,
    TextField,
    Typography
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../store/slices/authSlice";

export default function Login() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {

        isauthenticated,

        loading,

        error

    } = useSelector(

        state => state.auth

    );

    const [

        credentials,

        setCredentials

    ] = useState({

        email: "",

        password: ""

    });

    useEffect(() => {

        if (isauthenticated) {

            navigate(

                "/dashboard",

                {

                    replace: true

                }

            );

        }

    }, [

        isauthenticated,

        navigate

    ]);

    function handleChange(event) {

        setCredentials({

            ...credentials,

            [event.target.name]:

                event.target.value

        });

    }

    async function handleSubmit(event) {

        event.preventDefault();

        await dispatch(

            login(credentials)

        );

    }

    return (

        <Paper

            elevation={8}

            sx={{

                width: 420,

                p: 5,

                borderRadius: 3

            }}

        >

            <Stack spacing={3}>

                <Box>

                    <Typography

                        variant="h4"

                        fontWeight={700}

                    >

                        HEMAP-RMS

                    </Typography>

                    <Typography

                        color="text.secondary"

                    >

                        Hybrid Energy Monitoring &
                        Analytics Platform

                    </Typography>

                </Box>

                {

                    error && (

                        <Alert severity="error">

                            {error}

                        </Alert>

                    )

                }

                <TextField

                    
                    label="Email"

                    name="email"

                    type="email"

                    autoComplete="email"

                    fullWidth

                    value={credentials.email}

                    onChange={handleChange}

                />

                <TextField

                    label="Password"

                    name="password"

                    type="password"

                    autoComplete="current-password"

                    fullWidth

                    value={credentials.password}

                    onChange={handleChange}

                />

                <Button

                    fullWidth

                    variant="contained"

                    size="large"

                    disabled={loading}

                    onClick={handleSubmit}

                >

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                    >

                        <Button
                            type="submit"
                        ></Button>

                    </Box>

                    {

                        loading

                            ?

                            <CircularProgress

                                size={22}

                                color="inherit"

                            />

                            :

                            "Sign In"

                    }

                </Button>

            </Stack>

        </Paper>

    );

}