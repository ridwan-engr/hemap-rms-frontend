import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";

import {
    getDashboard,
    getDashboardCards,
    getDashboardKPIs,
    getDashboardMap,
    getDashboardCharts,
    getOptimizationSummary,
    refreshDashboard as refreshDashboardApi
} from "../../features/dashboard/api/dashboardApi";

/*
|--------------------------------------------------------------------------
| Helper
|--------------------------------------------------------------------------
*/

function extractError(error) {

    return (
        error?.response?.data ??
        error?.message ??
        "Dashboard request failed."
    );

}

/*
|--------------------------------------------------------------------------
| Fetch Complete Dashboard
|--------------------------------------------------------------------------
*/

export const fetchDashboard = createAsyncThunk(
    "dashboard/fetchDashboard",

    async (filters = {}, { rejectWithValue }) => {

        try {

            return await getDashboard(filters);

        } catch (error) {

            return rejectWithValue(
                extractError(error)
            );

        }

    }
);

/*
|--------------------------------------------------------------------------
| Fetch Dashboard Cards
|--------------------------------------------------------------------------
*/

export const fetchDashboardCards = createAsyncThunk(
    "dashboard/fetchCards",

    async (filters = {}, { rejectWithValue }) => {

        try {

            return await getDashboardCards(filters);

        } catch (error) {

            return rejectWithValue(
                extractError(error)
            );

        }

    }
);

/*
|--------------------------------------------------------------------------
| Fetch Dashboard KPIs
|--------------------------------------------------------------------------
*/

export const fetchDashboardKPIs = createAsyncThunk(
    "dashboard/fetchKPIs",

    async (filters = {}, { rejectWithValue }) => {

        try {

            return await getDashboardKPIs(filters);

        } catch (error) {

            return rejectWithValue(
                extractError(error)
            );

        }

    }
);

/*
|--------------------------------------------------------------------------
| Fetch Dashboard Map
|--------------------------------------------------------------------------
*/

export const fetchDashboardMap = createAsyncThunk(
    "dashboard/fetchMap",

    async (filters = {}, { rejectWithValue }) => {

        try {

            return await getDashboardMap(filters);

        } catch (error) {

            return rejectWithValue(
                error.response?.data ||
                error.message
            );

        }

    }
);

/*
|--------------------------------------------------------------------------
| Fetch Dashboard Charts
|--------------------------------------------------------------------------
*/

export const fetchDashboardCharts = createAsyncThunk(
    "dashboard/fetchCharts",

    async (filters = {}, { rejectWithValue }) => {

        try {

            return await getDashboardCharts(filters);

        } catch (error) {

            return rejectWithValue(
                extractError(error)
            );

        }

    }
);

/*
|--------------------------------------------------------------------------
| Fetch Optimization Summary
|--------------------------------------------------------------------------
*/

export const fetchOptimizationSummary = createAsyncThunk(
    "dashboard/fetchOptimization",

    async (filters = {}, { rejectWithValue }) => {

        try {

            return await getOptimizationSummary(filters);

        } catch (error) {

            return rejectWithValue(
                extractError(error)
            );

        }

    }
);

/*
|--------------------------------------------------------------------------
| Refresh Dashboard
|--------------------------------------------------------------------------
*/

export const refreshDashboard = createAsyncThunk(
    "dashboard/refresh",

    async (filters = {}, { rejectWithValue }) => {

        try {

            return await refreshDashboardApi(filters);

        } catch (error) {

            return rejectWithValue(
                extractError(error)
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

    charts: null,

    optimization: null,

    loading: false,

    cardsLoading: false,

    kpisLoading: false,

    mapLoading: false,

    chartsLoading: false,

    optimizationLoading: false,

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
            state.charts = null;
            state.optimization = null;

            state.loading = false;
            state.cardsLoading = false;
            state.kpisLoading = false;
            state.mapLoading = false;
            state.chartsLoading = false;
            state.optimizationLoading = false;

            state.refreshing = false;

            state.error = null;

            state.lastUpdated = null;

        },

        updateDashboardRealtime(state, action) {

            const payload = action.payload;

            if (!payload) {
                return;
            }

            if (payload.dashboard !== undefined) {
                state.dashboard =
                    payload.dashboard;
            }

            if (payload.cards !== undefined) {
                state.cards =
                    payload.cards;
            }

            if (payload.kpis !== undefined) {
                state.kpis =
                    payload.kpis;
            }

            if (payload.map !== undefined) {
                state.map =
                    payload.map;
            }

            if (payload.charts !== undefined) {
                state.charts =
                    payload.charts;
            }

            if (payload.optimization !== undefined) {
                state.optimization =
                    payload.optimization;
            }

            state.lastUpdated =
                new Date().toISOString();

        }

    },

    extraReducers: (builder) => {

        /*
        |--------------------------------------------------------------------------
        | Dashboard
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                fetchDashboard.pending,
                (state) => {

                    state.loading = true;
                    state.error = null;

                }
            )

            .addCase(
                fetchDashboard.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.dashboard =
                        action.payload ?? null;

                    state.lastUpdated =
                        new Date().toISOString();

                }
            )

            .addCase(
                fetchDashboard.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );

        /*
        |--------------------------------------------------------------------------
        | Cards
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                fetchDashboardCards.pending,
                (state) => {

                    state.cardsLoading = true;

                }
            )

            .addCase(
                fetchDashboardCards.fulfilled,
                (state, action) => {

                    state.cardsLoading = false;

                    state.cards =
                        action.payload ?? null;

                }
            )

            .addCase(
                fetchDashboardCards.rejected,
                (state, action) => {

                    state.cardsLoading = false;

                    state.error =
                        action.payload;

                }
            );

        /*
        |--------------------------------------------------------------------------
        | KPIs
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                fetchDashboardKPIs.pending,
                (state) => {

                    state.kpisLoading = true;

                }
            )

            .addCase(
                fetchDashboardKPIs.fulfilled,
                (state, action) => {

                    state.kpisLoading = false;

                    state.kpis =
                        action.payload ?? null;

                }
            )

            .addCase(
                fetchDashboardKPIs.rejected,
                (state, action) => {

                    state.kpisLoading = false;

                    state.error =
                        action.payload;

                }
            );

        /*
        |--------------------------------------------------------------------------
        | Map
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                fetchDashboardMap.pending,
                (state) => {

                    state.mapLoading = true;

                }
            )

            .addCase(
                fetchDashboardMap.fulfilled,
                (state, action) => {

                    state.mapLoading = false;

                    state.map =
                        action.payload ?? [];

                }
            )

            .addCase(
                fetchDashboardMap.rejected,
                (state, action) => {

                    state.mapLoading = false;

                    state.error =
                        action.payload;

                }
            );

        /*
        |--------------------------------------------------------------------------
        | Charts
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                fetchDashboardCharts.pending,
                (state) => {

                    state.chartsLoading = true;

                }
            )

            .addCase(
                fetchDashboardCharts.fulfilled,
                (state, action) => {

                    state.chartsLoading = false;

                    state.charts =
                        action.payload ?? null;

                }
            )

            .addCase(
                fetchDashboardCharts.rejected,
                (state, action) => {

                    state.chartsLoading = false;

                    state.error =
                        action.payload;

                }
            );

        /*
        |--------------------------------------------------------------------------
        | Optimization
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                fetchOptimizationSummary.pending,
                (state) => {

                    state.optimizationLoading = true;

                }
            )

            .addCase(
                fetchOptimizationSummary.fulfilled,
                (state, action) => {

                    state.optimizationLoading = false;

                    state.optimization =
                        action.payload ?? null;

                }
            )

            .addCase(
                fetchOptimizationSummary.rejected,
                (state, action) => {

                    state.optimizationLoading = false;

                    state.error =
                        action.payload;

                }
            );

        /*
        |--------------------------------------------------------------------------
        | Refresh
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                refreshDashboard.pending,
                (state) => {

                    state.refreshing = true;
                    state.error = null;

                }
            )

            .addCase(
                refreshDashboard.fulfilled,
                (state, action) => {

                    state.refreshing = false;

                    state.dashboard =
                        action.payload ?? null;

                    state.lastUpdated =
                        new Date().toISOString();

                }
            )

            .addCase(
                refreshDashboard.rejected,
                (state, action) => {

                    state.refreshing = false;

                    state.error =
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
    clearDashboard,
    updateDashboardRealtime
} = dashboardSlice.actions;

/*
|--------------------------------------------------------------------------
| Reducer
|--------------------------------------------------------------------------
*/

export default dashboardSlice.reducer;