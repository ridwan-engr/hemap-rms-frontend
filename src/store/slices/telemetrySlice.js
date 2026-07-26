import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    latest: [],

    history: [],

    loading: false,

    connected: false

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

        }

    }

});

export const {

    telemetryLoading,

    telemetryLoaded,

    telemetryHistory,

    telemetryConnected,

    telemetryDisconnected

} = telemetrySlice.actions;

export default telemetrySlice.reducer;