import { io } from "socket.io-client";

class WebSocketService {

    constructor() {

        this.socket = null;

    }

    /*
    |--------------------------------------------------------------------------
    | Connect
    |--------------------------------------------------------------------------
    */

    connect(token) {

        if (this.socket?.connected) {

            return this.socket;

        }

        this.socket = io(

            import.meta.env.VITE_SOCKET_URL,

            {

                transports: ["websocket"],

                autoConnect: true,

                auth: {

                    token

                }

            }

        );

        return this.socket;

    }

    /*
    |--------------------------------------------------------------------------
    | Disconnect
    |--------------------------------------------------------------------------
    */

    disconnect() {

        if (this.socket) {

            this.socket.disconnect();

            this.socket = null;

        }

    }

    /*
    |--------------------------------------------------------------------------
    | Get Socket
    |--------------------------------------------------------------------------
    */

    getSocket() {

        return this.socket;

    }

    /*
    |--------------------------------------------------------------------------
    | Connection Events
    |--------------------------------------------------------------------------
    */

    onConnect(callback) {

        this.socket?.on("connect", callback);

    }

    onDisconnect(callback) {

        this.socket?.on("disconnect", callback);

    }

    onReconnect(callback) {

        this.socket?.on("reconnect", callback);

    }

    onError(callback) {

        this.socket?.on("connect_error", callback);

    }

    /*
    |--------------------------------------------------------------------------
    | Rooms
    |--------------------------------------------------------------------------
    */

    joinSite(siteId) {

        this.socket?.emit(

            "join-site",

            siteId

        );

    }

    leaveSite(siteId) {

        this.socket?.emit(

            "leave-site",

            siteId

        );

    }

    joinInstallation(installationId) {

        this.socket?.emit(

            "join-installation",

            installationId

        );

    }

    leaveInstallation(installationId) {

        this.socket?.emit(

            "leave-installation",

            installationId

        );

    }

    /*
    |--------------------------------------------------------------------------
    | Telemetry
    |--------------------------------------------------------------------------
    */

    onTelemetry(callback) {

        this.socket?.on(

            "telemetry",

            callback

        );

    }

    /*
    |--------------------------------------------------------------------------
    | Dashboard
    |--------------------------------------------------------------------------
    */

    onDashboardUpdate(callback) {

        this.socket?.on(

            "dashboard-update",

            callback

        );

    }

    /*
    |--------------------------------------------------------------------------
    | Statistics
    |--------------------------------------------------------------------------
    */

    onStatistics(callback) {

        this.socket?.on(

            "statistics",

            callback

        );

    }

    /*
    |--------------------------------------------------------------------------
    | Analytics
    |--------------------------------------------------------------------------
    */

    onAnalytics(callback) {

        this.socket?.on(

            "analytics",

            callback

        );

    }

    /*
    |--------------------------------------------------------------------------
    | Alarms
    |--------------------------------------------------------------------------
    */

    onAlarm(callback) {

        this.socket?.on(

            "alarm",

            callback

        );

    }

    /*
    |--------------------------------------------------------------------------
    | Notifications
    |--------------------------------------------------------------------------
    */

    onNotification(callback) {

        this.socket?.on(

            "notification",

            callback

        );

    }

    /*
    |--------------------------------------------------------------------------
    | Generic
    |--------------------------------------------------------------------------
    */

    emit(event, payload) {

        this.socket?.emit(

            event,

            payload

        );

    }

    on(event, callback) {

        this.socket?.on(

            event,

            callback

        );

    }

    off(event) {

        this.socket?.off(

            event

        );

    }

    removeAllListeners() {

        this.socket?.removeAllListeners();

    }

}

export default new WebSocketService();