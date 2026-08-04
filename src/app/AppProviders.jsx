import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";


import store from "../store";

import theme from "../theme";

import AppRoutes from "./routes.jsx";

import useSocket from "../hooks/useSocket.js";

const theme = createAppTheme("light");

export default function AppProviders() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />

                <SnackbarProvider
                    maxSnack={5}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    autoHideDuration={4000}
                >
                    <BrowserRouter>
                        <SocketInitializer />
                        <AppRoutes />
                    </BrowserRouter>
                </SnackbarProvider>
            </ThemeProvider>
        </Provider>
    );
}