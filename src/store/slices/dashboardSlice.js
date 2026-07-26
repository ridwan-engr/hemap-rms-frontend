import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    loading: false,

    data: null,

    error: null,

    lastUpdated: null

};

const dashboardSlice = createSlice({

    name: "dashboard",

    initialState,

    reducers: {

        dashboardLoading(state) {

            state.loading = true;

        },

        dashboardLoaded(state, action) {

            state.loading = false;

            state.data = action.payload;

            state.lastUpdated = new Date().toISOString();

        },

        dashboardError(state, action) {

            state.loading = false;

            state.error = action.payload;

        }

    }

});

export const {

    dashboardLoading,

    dashboardLoaded,

    dashboardError

} = dashboardSlice.actions;

export default dashboardSlice.reducer;