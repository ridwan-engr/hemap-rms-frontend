import {

    useState,
    useEffect

} from "react";

import {

    Paper,
    Stack,
    TextField,
    Typography,
    Button,
    CircularProgress,
    Alert

} from "@mui/material";

import {

    useDispatch,
    useSelector

} from "react-redux";

import {

    login

} from "../store/slices/authSlice";

import {

    useNavigate

} from "react-router-dom";

export default function Login() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {

        loading,
        error,
        isAuthenticated

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

        if (isAuthenticated) {

            navigate(

                "/dashboard",

                {

                    replace: true

                }

            );

        }

    }, [

        isAuthenticated,

        navigate

    ]);

    function handleChange(event) {

        setCredentials({

            ...credentials,

            [event.target.name]: event.target.value

        });

    }

    async function handleSubmit(event) {

        event.preventDefault();

        const result = await dispatch(

            login(credentials)

        );

        console.log(result);

    }

    return (

        <Paper

            elevation={8}

            sx={{

                width:420,

                p:5,

                mx:"auto",

                mt:10

            }}

        >

            <form onSubmit={handleSubmit}>

                <Stack spacing={3}>

                    <Typography

                        variant="h4"

                    >

                        HEMAP-RMS

                    </Typography>

                    {

                        error &&

                        <Alert severity="error">

                            {error}

                        </Alert>

                    }

                    <TextField

                        label="Email"

                        name="email"

                        value={credentials.email}

                        onChange={handleChange}

                    />

                    <TextField

                        label="Password"

                        name="password"

                        type="password"

                        value={credentials.password}

                        onChange={handleChange}

                    />

                    <Button

                        type="submit"

                        variant="contained"

                        disabled={loading}

                    >

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

            </form>

        </Paper>

    );

} 