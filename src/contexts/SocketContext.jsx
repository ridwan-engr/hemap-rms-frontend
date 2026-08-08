import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import websocketService from "../services/websocketService.js";
import { useAuth } from "./AuthContext.jsx";

const SocketContext = createContext(null);

/*
|--------------------------------------------------------------------------
| Socket Provider
|--------------------------------------------------------------------------
*/

export function SocketProvider({ children }) {

    const {

        token,
        isAuthenticated

    } = useAuth();

    const [connected, setConnected] = useState(false);

    /*
    |--------------------------------------------------------------------------
    | Connect Socket
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (!isAuthenticated || !token) {

            websocketService.disconnect();

            setConnected(false);

            return;

        }

        const socket =
            websocketService.connect(token);

        websocketService.onConnect(() => {

            setConnected(true);

        });

        websocketService.onDisconnect(() => {

            setConnected(false);

        });

        websocketService.onError((error) => {

            console.error(
                "Socket Error:",
                error
            );

        });

        return () => {

            socket?.disconnect();

        };

    }, [isAuthenticated, token]);

    /*
    |--------------------------------------------------------------------------
    | Room Helpers
    |--------------------------------------------------------------------------
    */

    function joinSite(siteId) {

        websocketService.joinSite(siteId);

    }

    function leaveSite(siteId) {

        websocketService.leaveSite(siteId);

    }

    function joinInstallation(installationId) {

        websocketService.joinInstallation(
            installationId
        );

    }

    function leaveInstallation(installationId) {

        websocketService.leaveInstallation(
            installationId
        );

    }

    /*
    |--------------------------------------------------------------------------
    | Event Helpers
    |--------------------------------------------------------------------------
    */

    function onTelemetry(callback) {

        websocketService.onTelemetry(callback);

    }

    function onDashboard(callback) {

        websocketService.onDashboardUpdate(callback);

    }

    function onStatistics(callback) {

        websocketService.onStatistics(callback);

    }

    function onAnalytics(callback) {

        websocketService.onAnalytics(callback);

    }

    function onAlarm(callback) {

        websocketService.onAlarm(callback);

    }

    function onNotification(callback) {

        websocketService.onNotification(callback);

    }

    function remove(event) {

        websocketService.off(event);

    }

    return (

        <SocketContext.Provider

            value={{

                connected,

                socket: websocketService.getSocket(),

                joinSite,
                leaveSite,

                joinInstallation,
                leaveInstallation,

                onTelemetry,
                onDashboard,
                onStatistics,
                onAnalytics,
                onAlarm,
                onNotification,

                remove

            }}

        >

            {children}

        </SocketContext.Provider>

    );

}

/*
|--------------------------------------------------------------------------
| Hook
|--------------------------------------------------------------------------
*/

export function useSocket() {

    const context =
        useContext(SocketContext);

    if (!context) {

        throw new Error(

            "useSocket must be used inside SocketProvider."

        );

    }

    return context;

}