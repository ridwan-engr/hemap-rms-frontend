import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";
import store from "./store";

import { AuthProvider } from "./contexts/AuthContext";
import { SocketProvider } from "./contexts/SocketContext";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>

            <BrowserRouter>

                <AuthProvider>

                    <SocketProvider>

                        <App />

                    </SocketProvider>

                </AuthProvider>

            </BrowserRouter>

        </Provider>
    </React.StrictMode>
);