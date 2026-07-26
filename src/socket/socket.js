import { io } from "socket.io-client";

/**
 * ============================================================================
 * Socket.IO Client
 * ============================================================================
 * HEMAP-RMS Frontend
 * Connects to the deployed backend.
 * ============================================================================
 */

const SOCKET_URL =
    import.meta.env.VITE_SOCKET_URL ||
    import.meta.env.VITE_API_BASE_URL ||
    "https://hemap-rms.onrender.com";

const socket = io(SOCKET_URL, {
    autoConnect: false,

    transports: ["websocket", "polling"],

    reconnection: true,

    reconnectionAttempts: Infinity,

    reconnectionDelay: 2000,

    timeout: 20000
});

/*
|--------------------------------------------------------------------------
| Connection Events
|--------------------------------------------------------------------------
*/

socket.on("connect", () => {
    console.info(
        `[Socket] Connected: ${socket.id}`
    );
});

socket.on("disconnect", (reason) => {
    console.warn(
        `[Socket] Disconnected: ${reason}`
    );
});

socket.on("connect_error", (error) => {
    console.error(
        "[Socket] Connection Error:",
        error.message
    );
});

export default socket;