import socket from "../socket/socket.js";
import SOCKET_EVENTS from "../socket/socketEvents.js";

/**
 * ============================================================================
 * HEMAP-RMS Socket Service
 * ============================================================================
 * Central Socket.IO service used throughout the frontend.
 * All socket interactions should go through this service.
 * ============================================================================
 */

class SocketService {

    connect() {

        if (!socket.connected) {

            socket.connect();

        }

    }

    disconnect() {

        if (socket.connected) {

            socket.disconnect();

        }

    }

    isConnected() {

        return socket.connected;

    }

    id() {

        return socket.id;

    }

    emit(event, payload = {}) {

        socket.emit(

            event,

            payload

        );

    }

    on(event, callback) {

        socket.on(

            event,

            callback

        );

    }

    once(event, callback) {

        socket.once(

            event,

            callback

        );

    }

    off(event, callback) {

        socket.off(

            event,

            callback

        );

    }

    removeAll(event) {

        socket.removeAllListeners(event);

    }

    /**
     * ------------------------------------------------------------------------
     * Connection Events
     * ------------------------------------------------------------------------
     */

    registerConnectionEvents({

        onConnect,

        onDisconnect,

        onError

    } = {}) {

        if (onConnect) {

            socket.on(

                SOCKET_EVENTS.CONNECT,

                onConnect

            );

        }

        if (onDisconnect) {

            socket.on(

                SOCKET_EVENTS.DISCONNECT,

                onDisconnect

            );

        }

        if (onError) {

            socket.on(

                SOCKET_EVENTS.CONNECT_ERROR,

                onError

            );

        }

    }

    unregisterConnectionEvents() {

        socket.off(

            SOCKET_EVENTS.CONNECT

        );

        socket.off(

            SOCKET_EVENTS.DISCONNECT

        );

        socket.off(

            SOCKET_EVENTS.CONNECT_ERROR

        );

    }

}

const socketService = new SocketService();

export default socketService;