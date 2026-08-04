import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
    getDashboard,
    getDashboardCards,
    getDashboardKPIs,
    getDashboardMap,
    refreshDashboard as refreshDashboardApi
} from "../../features/dashboard/api/dashboardApi";

/*
|--------------------------------------------------------------------------
| Async Actions
|--------------------------------------------------------------------------
*/

export const fetchDashboard = createAsyncThunk(
    "dashboard/fetchDashboard",
    async (filters = {}, { rejectWithValue }) => {
        try {
            return await getDashboard(filters);
        } catch (error) {
            return rejectWithValue(
                error.response?.data || error.message
            );
        }
    }
);

export const fetchDashboardCards = createAsyncThunk(
    "dashboard/fetchCards",
    async (filters = {}, { rejectWithValue }) => {
        try {
            return await getDashboardCards(filters);
        } catch (error) {
            return rejectWithValue(
                error.response?.data || error.message
            );
        }
    }
);

export const fetchDashboardKPIs = createAsyncThunk(
    "dashboard/fetchKPIs",
    async (filters = {}, { rejectWithValue }) => {
        try {
            return await getDashboardKPIs(filters);
        } catch (error) {
            return rejectWithValue(
                error.response?.data || error.message
            );
        }
    }
);

export const fetchDashboardMap = createAsyncThunk(
    "dashboard/fetchMap",
    async (filters = {}, { rejectWithValue }) => {
        try {
            return await getDashboardMap(filters);
        } catch (error) {
            return rejectWithValue(
                error.response?.data || error.message
            );
        }
    }
);

export const refreshDashboard = createAsyncThunk(
    "dashboard/refresh",
    async (filters = {}, { rejectWithValue }) => {
        try {
            return await refreshDashboardApi(filters);
        } catch (error) {
            return rejectWithValue(
                error.response?.data || error.message
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

    dashboard: null,

    cards: null,

    kpis: null,

    map: [],

    loading: false,

    refreshing: false,

    error: null,

    lastUpdated: null

};

/*
|--------------------------------------------------------------------------
| Slice
|--------------------------------------------------------------------------
*/

const dashboardSlice = createSlice({

    name: "dashboard",

    initialState,

    reducers: {

        clearDashboard(state) {

            state.dashboard = null;
            state.cards = null;
            state.kpis = null;
            state.map = [];
            state.error = null;
            state.lastUpdated = null;

        },

        updateDashboardRealtime(state, action) {

            const payload = action.payload;

            if (!payload) return;

            if (payload.dashboard)
                state.dashboard = payload.dashboard;

            if (payload.cards)
                state.cards = payload.cards;

            if (payload.kpis)
                state.kpis = payload.kpis;

            if (payload.map)
                state.map = payload.map;

            state.lastUpdated = new Date().toISOString();

        }

    },

    extraReducers: (builder) => {

        /*
        |--------------------------------------------------------------------------
        | Dashboard
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(fetchDashboard.pending, (state) => {

                state.loading = true;
                state.error = null;

            })

            .addCase(fetchDashboard.fulfilled, (state, action) => {

                state.loading = false;

                state.dashboard =
                    action.payload.data ?? action.payload;

                state.lastUpdated = new Date().toISOString();

            })

            .addCase(fetchDashboard.rejected, (state, action) => {

                state.loading = false;
                state.error = action.payload;

            });

        /*
        |--------------------------------------------------------------------------
        | Cards
        |--------------------------------------------------------------------------
        */

        builder.addCase(fetchDashboardCards.fulfilled, (state, action) => {

            state.cards = action.payload;

        });

        /*
        |--------------------------------------------------------------------------
        | KPIs
        |--------------------------------------------------------------------------
        */

        builder.addCase(fetchDashboardKPIs.fulfilled, (state, action) => {

            state.kpis = action.payload;

        });

        /*
        |--------------------------------------------------------------------------
        | Map
        |--------------------------------------------------------------------------
        */

        builder.addCase(fetchDashboardMap.fulfilled, (state, action) => {

            state.map = action.payload;

        });

        /*
        |--------------------------------------------------------------------------
        | Refresh
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(refreshDashboard.pending, (state) => {

                state.refreshing = true;

            })

            .addCase(refreshDashboard.fulfilled, (state, action) => {

                state.refreshing = false;

                state.dashboard =
                    action.payload.data ?? action.payload;

                state.lastUpdated = new Date().toISOString();

            })

            .addCase(refreshDashboard.rejected, (state, action) => {

                state.refreshing = false;
                state.error = action.payload;

            });

    }

});

export const {

    clearDashboard,

    updateDashboardRealtime

} = dashboardSlice.actions;

export default dashboardSlice.reducer;