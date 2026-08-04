import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    latest: [],

    history: [],

    loading: false,

    connected: false,

    lastUpdated: null

};

const telemetrySlice = createSlice({

    name: "telemetry",

    initialState,

    reducers: {

        telemetryLoading(state) {

            state.loading = true;

        },

        telemetryLoaded(state, action) {

            state.loading = false;

            state.latest = action.payload;

        },

        telemetryHistory(state, action) {

            state.history = action.payload;

        },

        telemetryConnected(state) {

            state.connected = true;

        },

        telemetryDisconnected(state) {

            state.connected = false;

        },

        updateTelemetryRealtime(state, action) {

            const payload = action.payload;

            if (!payload) return;

            state.latest = payload;

            state.lastUpdated = new Date().toISOString();

        }

    }

});

export const {

    telemetryLoading,

    telemetryLoaded,

    telemetryHistory,

    telemetryConnected,

    telemetryDisconnected,

    updateTelemetryRealtime

} = telemetrySlice.actions;

export default telemetrySlice.reducer;