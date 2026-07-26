import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";

import { useEffect } from "react";

import App from "../App";

import store from "../store";

import theme from "../theme";

import useSocket from "../hooks/useSocket";

/*
|--------------------------------------------------------------------------
| Socket Initializer
|--------------------------------------------------------------------------
*/

function SocketInitializer() {

    useSocket();

    return null;

}

/*
|--------------------------------------------------------------------------
| App Providers
|--------------------------------------------------------------------------
*/

export default function AppProviders() {

    return (

        <Provider store={store}>

            <ThemeProvider theme={theme}>

                <CssBaseline />

                <SnackbarProvider

                    maxSnack={5}

                    anchorOrigin={{

                        vertical: "top",

                        horizontal: "right"

                    }}

                    autoHideDuration={4000}

                >

                    <BrowserRouter>

                        <SocketInitializer />

                        <App />

                    </BrowserRouter>

                </SnackbarProvider>

            </ThemeProvider>

        </Provider>

    );

}