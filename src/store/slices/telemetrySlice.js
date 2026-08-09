import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";

import {
    getTelemetry,
    getTelemetryHistory,
    getTelemetrySummary,
    getLatestTelemetry,
    getDeviceStatus,
    synchronizeTelemetry
} from "../../features/telemetry/api/telemetryApi.js";

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

const getErrorMessage = error => {
    return (
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.response?.data ||
        error?.message ||
        "Telemetry request failed"
    );
};

/*
|--------------------------------------------------------------------------
| Fetch Current Telemetry
|--------------------------------------------------------------------------
|
| Backend:
| GET /telemetry
|
| Query:
| telemetryQueryValidator
|
*/

export const fetchTelemetry = createAsyncThunk(
    "telemetry/fetchTelemetry",

    async (
        params = {},
        { rejectWithValue }
    ) => {
        try {
            return await getTelemetry(params);
        }

        catch (error) {
            return rejectWithValue(
                getErrorMessage(error)
            );
        }
    }
);

/*
|--------------------------------------------------------------------------
| Fetch Telemetry History
|--------------------------------------------------------------------------
|
| Backend:
| GET /telemetry/history
|
| Query:
| telemetryHistoryValidator
|
*/

export const fetchTelemetryHistory = createAsyncThunk(
    "telemetry/fetchTelemetryHistory",

    async (
        params = {},
        { rejectWithValue }
    ) => {
        try {
            return await getTelemetryHistory(params);
        }

        catch (error) {
            return rejectWithValue(
                getErrorMessage(error)
            );
        }
    }
);

/*
|--------------------------------------------------------------------------
| Fetch Telemetry Summary
|--------------------------------------------------------------------------
|
| Backend:
| GET /telemetry/summary
|
| Query:
| telemetryQueryValidator
|
*/

export const fetchTelemetrySummary = createAsyncThunk(
    "telemetry/fetchTelemetrySummary",

    async (
        params = {},
        { rejectWithValue }
    ) => {
        try {
            return await getTelemetrySummary(params);
        }

        catch (error) {
            return rejectWithValue(
                getErrorMessage(error)
            );
        }
    }
);

/*
|--------------------------------------------------------------------------
| Fetch Latest Installation Telemetry
|--------------------------------------------------------------------------
|
| Backend:
| GET /telemetry/:installationId/latest
|
*/

export const fetchLatestTelemetry = createAsyncThunk(
    "telemetry/fetchLatestTelemetry",

    async (
        installationId,
        { rejectWithValue }
    ) => {
        try {
            if (!installationId) {
                return rejectWithValue(
                    "installationId is required"
                );
            }

            return await getLatestTelemetry(
                installationId
            );
        }

        catch (error) {
            return rejectWithValue(
                getErrorMessage(error)
            );
        }
    }
);

/*
|--------------------------------------------------------------------------
| Fetch Device Status
|--------------------------------------------------------------------------
|
| Backend:
| GET /telemetry/:installationId/status
|
*/

export const fetchDeviceStatus = createAsyncThunk(
    "telemetry/fetchDeviceStatus",

    async (
        installationId,
        { rejectWithValue }
    ) => {
        try {
            if (!installationId) {
                return rejectWithValue(
                    "installationId is required"
                );
            }

            return await getDeviceStatus(
                installationId
            );
        }

        catch (error) {
            return rejectWithValue(
                getErrorMessage(error)
            );
        }
    }
);

/*
|--------------------------------------------------------------------------
| Synchronize Telemetry
|--------------------------------------------------------------------------
|
| Backend:
| POST /telemetry/:installationId/synchronize
|
| Authorization:
| ADMIN
|
*/

export const synchronizeTelemetryData = createAsyncThunk(
    "telemetry/synchronizeTelemetry",

    async (
        installationId,
        { rejectWithValue }
    ) => {
        try {
            if (!installationId) {
                return rejectWithValue(
                    "installationId is required"
                );
            }

            return await synchronizeTelemetry(
                installationId
            );
        }

        catch (error) {
            return rejectWithValue(
                getErrorMessage(error)
            );
        }
    }
);

/*
|--------------------------------------------------------------------------
| Initial State
|--------------------------------------------------------------------------
*/

const initialState = {

    /*
    |--------------------------------------------------------------------------
    | Current Telemetry
    |--------------------------------------------------------------------------
    */

    latest: null,

    /*
    |--------------------------------------------------------------------------
    | Historical Telemetry
    |--------------------------------------------------------------------------
    */

    history: [],

    /*
    |--------------------------------------------------------------------------
    | Telemetry Summary
    |--------------------------------------------------------------------------
    */

    summary: null,

    /*
    |--------------------------------------------------------------------------
    | Installation Device Status
    |--------------------------------------------------------------------------
    */

    deviceStatus: null,

    /*
    |--------------------------------------------------------------------------
    | Synchronization Result
    |--------------------------------------------------------------------------
    */

    synchronization: null,

    /*
    |--------------------------------------------------------------------------
    | Loading States
    |--------------------------------------------------------------------------
    */

    loading: false,

    historyLoading: false,

    summaryLoading: false,

    statusLoading: false,

    synchronizing: false,

    /*
    |--------------------------------------------------------------------------
    | Connection State
    |--------------------------------------------------------------------------
    */

    connected: false,

    /*
    |--------------------------------------------------------------------------
    | Error
    |--------------------------------------------------------------------------
    */

    error: null,

    historyError: null,

    summaryError: null,

    statusError: null,

    synchronizationError: null,

    /*
    |--------------------------------------------------------------------------
    | Last Update
    |--------------------------------------------------------------------------
    */

    lastUpdated: null

};

/*
|--------------------------------------------------------------------------
| Slice
|--------------------------------------------------------------------------
*/

const telemetrySlice = createSlice({

    name: "telemetry",

    initialState,

    reducers: {

        /*
        |--------------------------------------------------------------------------
        | Generic Loading
        |--------------------------------------------------------------------------
        */

        telemetryLoading(state) {

            state.loading = true;

            state.error = null;

        },

        /*
        |--------------------------------------------------------------------------
        | Telemetry Loaded
        |--------------------------------------------------------------------------
        */

        telemetryLoaded(
            state,
            action
        ) {

            state.loading = false;

            state.latest =
                action.payload;

            state.lastUpdated =
                new Date().toISOString();

        },

        /*
        |--------------------------------------------------------------------------
        | Telemetry History
        |--------------------------------------------------------------------------
        */

        telemetryHistory(
            state,
            action
        ) {

            state.history =
                Array.isArray(action.payload)
                    ? action.payload
                    : [];

        },

        /*
        |--------------------------------------------------------------------------
        | Connected
        |--------------------------------------------------------------------------
        */

        telemetryConnected(state) {

            state.connected = true;

        },

        /*
        |--------------------------------------------------------------------------
        | Disconnected
        |--------------------------------------------------------------------------
        */

        telemetryDisconnected(state) {

            state.connected = false;

        },

        /*
        |--------------------------------------------------------------------------
        | Realtime Telemetry Update
        |--------------------------------------------------------------------------
        */

        updateTelemetryRealtime(
            state,
            action
        ) {

            const payload =
                action.payload;

            if (!payload) {
                return;
            }

            /*
            |--------------------------------------------------------------
            | If the socket sends a wrapped payload
            |--------------------------------------------------------------
            */

            if (
                payload.latest !== undefined
            ) {

                state.latest =
                    payload.latest;

            }

            else {

                /*
                |----------------------------------------------------------
                | If the socket sends telemetry directly
                |----------------------------------------------------------
                */

                state.latest =
                    payload;

            }

            /*
            |--------------------------------------------------------------
            | Optional realtime fields
            |--------------------------------------------------------------
            */

            if (
                payload.summary !== undefined
            ) {

                state.summary =
                    payload.summary;

            }

            if (
                payload.deviceStatus !== undefined
            ) {

                state.deviceStatus =
                    payload.deviceStatus;

            }

            if (
                payload.history !== undefined &&
                Array.isArray(payload.history)
            ) {

                state.history =
                    payload.history;

            }

            state.lastUpdated =
                new Date().toISOString();

        },

        /*
        |--------------------------------------------------------------------------
        | Clear Telemetry
        |--------------------------------------------------------------------------
        */

        clearTelemetry(state) {

            Object.assign(
                state,
                initialState
            );

        }

    },

    /*
    |--------------------------------------------------------------------------
    | Async Thunks
    |--------------------------------------------------------------------------
    */

    extraReducers: builder => {

        /*
        |--------------------------------------------------------------------------
        | Current Telemetry
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                fetchTelemetry.pending,
                state => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                fetchTelemetry.fulfilled,
                (
                    state,
                    action
                ) => {

                    state.loading = false;

                    state.latest =
                        action.payload;

                    state.lastUpdated =
                        new Date().toISOString();

                }
            )

            .addCase(
                fetchTelemetry.rejected,
                (
                    state,
                    action
                ) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );

        /*
        |--------------------------------------------------------------------------
        | Telemetry History
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                fetchTelemetryHistory.pending,
                state => {

                    state.historyLoading = true;

                    state.historyError = null;

                }
            )

            .addCase(
                fetchTelemetryHistory.fulfilled,
                (
                    state,
                    action
                ) => {

                    state.historyLoading = false;

                    /*
                    | API may return:
                    | []
                    |
                    | or:
                    | { history: [] }
                    */

                    if (
                        Array.isArray(
                            action.payload
                        )
                    ) {

                        state.history =
                            action.payload;

                    }

                    else {

                        state.history =
                            action.payload?.history ||
                            action.payload?.data ||
                            [];

                    }

                }
            )

            .addCase(
                fetchTelemetryHistory.rejected,
                (
                    state,
                    action
                ) => {

                    state.historyLoading = false;

                    state.historyError =
                        action.payload;

                }
            );

        /*
        |--------------------------------------------------------------------------
        | Telemetry Summary
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                fetchTelemetrySummary.pending,
                state => {

                    state.summaryLoading = true;

                    state.summaryError = null;

                }
            )

            .addCase(
                fetchTelemetrySummary.fulfilled,
                (
                    state,
                    action
                ) => {

                    state.summaryLoading = false;

                    state.summary =
                        action.payload?.summary ??
                        action.payload;

                }
            )

            .addCase(
                fetchTelemetrySummary.rejected,
                (
                    state,
                    action
                ) => {

                    state.summaryLoading = false;

                    state.summaryError =
                        action.payload;

                }
            );

        /*
        |--------------------------------------------------------------------------
        | Latest Installation Telemetry
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                fetchLatestTelemetry.pending,
                state => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                fetchLatestTelemetry.fulfilled,
                (
                    state,
                    action
                ) => {

                    state.loading = false;

                    state.latest =
                        action.payload?.latest ??
                        action.payload;

                    state.lastUpdated =
                        new Date().toISOString();

                }
            )

            .addCase(
                fetchLatestTelemetry.rejected,
                (
                    state,
                    action
                ) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );

        /*
        |--------------------------------------------------------------------------
        | Device Status
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                fetchDeviceStatus.pending,
                state => {

                    state.statusLoading = true;

                    state.statusError = null;

                }
            )

            .addCase(
                fetchDeviceStatus.fulfilled,
                (
                    state,
                    action
                ) => {

                    state.statusLoading = false;

                    state.deviceStatus =
                        action.payload?.status ??
                        action.payload;

                }
            )

            .addCase(
                fetchDeviceStatus.rejected,
                (
                    state,
                    action
                ) => {

                    state.statusLoading = false;

                    state.statusError =
                        action.payload;

                }
            );

        /*
        |--------------------------------------------------------------------------
        | Synchronize Telemetry
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                synchronizeTelemetryData.pending,
                state => {

                    state.synchronizing = true;

                    state.synchronizationError =
                        null;

                }
            )

            .addCase(
                synchronizeTelemetryData.fulfilled,
                (
                    state,
                    action
                ) => {

                    state.synchronizing = false;

                    state.synchronization =
                        action.payload;

                    state.lastUpdated =
                        new Date().toISOString();

                }
            )

            .addCase(
                synchronizeTelemetryData.rejected,
                (
                    state,
                    action
                ) => {

                    state.synchronizing = false;

                    state.synchronizationError =
                        action.payload;

                }
            );

    }

});

/*
|--------------------------------------------------------------------------
| Actions
|--------------------------------------------------------------------------
*/

export const {

    telemetryLoading,

    telemetryLoaded,

    telemetryHistory,

    telemetryConnected,

    telemetryDisconnected,

    updateTelemetryRealtime,

    clearTelemetry

} = telemetrySlice.actions;

/*
|--------------------------------------------------------------------------
| Reducer
|--------------------------------------------------------------------------
*/

export default telemetrySlice.reducer;