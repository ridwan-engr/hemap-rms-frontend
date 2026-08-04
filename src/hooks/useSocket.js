import { useEffect } from "react";
import { useDispatch } from "react-redux";

import socketService from "../socket/socketService.js";

import SOCKET_EVENTS from "../socket/socketEvents.js";

import {
    updateDashboardRealtime
} from "../store/slices/dashboardSlice.js";

import {
    updateTelemetryRealtime
} from "../store/slices/telemetrySlice.js";

import {
    addNotification
} from "../store/slices/notificationSlice.js";

import {
    updateOptimizationRealtime
} from "../store/slices/optimizationSlice";

import {
    updateReliabilityRealtime
} from "../store/slices/reliabilitySlice.js";

/**
 * ============================================================================
 * HEMAP-RMS Socket Hook
 * ============================================================================
 * Initializes the Socket.IO connection and synchronizes real-time events
 * with the Redux store.
 * ============================================================================
 */

export default function useSocket() {

    const dispatch = useDispatch();

    useEffect(() => {

        socketService.connect();

        /*
        |--------------------------------------------------------------------------
        | Connection Events
        |--------------------------------------------------------------------------
        */

        socketService.registerConnectionEvents({

            onConnect: () => {

                console.info(
                    "Socket connected:",
                    socketService.id()
                );

            },

            onDisconnect: () => {

                console.info(
                    "Socket disconnected."
                );

            },

            onError: error => {

                console.error(
                    "Socket connection error:",
                    error
                );

            }

        });

        /*
        |--------------------------------------------------------------------------
        | Dashboard
        |--------------------------------------------------------------------------
        */

        socketService.on(

            SOCKET_EVENTS.DASHBOARD_UPDATE,

            payload => {

                dispatch(

                    updateDashboardRealtime(payload)

                );

            }

        );

        /*
        |--------------------------------------------------------------------------
        | Telemetry
        |--------------------------------------------------------------------------
        */

        socketService.on(

            SOCKET_EVENTS.TELEMETRY_UPDATE,

            payload => {

                dispatch(

                    updateTelemetryRealtime(payload)

                );

            }

        );

        /*
        |--------------------------------------------------------------------------
        | Reliability
        |--------------------------------------------------------------------------
        */

        socketService.on(

            SOCKET_EVENTS.RELIABILITY_UPDATE,

            payload => {

                dispatch(updateReliabilityRealtime({
                    reliability: payload
                }));

            }

        );

        /*
        |--------------------------------------------------------------------------
        | Optimization
        |--------------------------------------------------------------------------
        */

        socketService.on(

            SOCKET_EVENTS.OPTIMIZATION_UPDATE,

            payload => {

                dispatch(updateOptimizationRealtime({
                    optimization: payload
                }));

            }

        );

        /*
        |--------------------------------------------------------------------------
        | Notifications
        |--------------------------------------------------------------------------
        */

        socketService.on(

            SOCKET_EVENTS.NOTIFICATION_NEW,

            payload => {

                dispatch(

                    addNotification(payload)

                );

            }

        );

        return () => {

            socketService.removeAll(

                SOCKET_EVENTS.DASHBOARD_UPDATE
            );

            socketService.removeAll(

                SOCKET_EVENTS.TELEMETRY_UPDATE
            );

            socketService.removeAll(

                SOCKET_EVENTS.RELIABILITY_UPDATE
            );

            socketService.removeAll(

                SOCKET_EVENTS.OPTIMIZATION_UPDATE
            );

            socketService.removeAll(

                SOCKET_EVENTS.NOTIFICATION_NEW
            );

            socketService.unregisterConnectionEvents();

            socketService.disconnect();

        };

    }, [dispatch]);

}