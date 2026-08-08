import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";

import {
    getDashboardAnalytics,
    getEnergyAnalytics,
    getBatteryAnalytics,
    getSolarAnalytics,
    getGeneratorAnalytics,
    getGridAnalytics,
    getReliabilityAnalytics
} from "../../features/analytics/api/analyticsApi.js";

/*
|--------------------------------------------------------------------------
| Error Helper
|--------------------------------------------------------------------------
*/

const getErrorMessage = error => {

    return (
        error.response?.data ||
        error.message ||
        "Analytics request failed"
    );

};

/*
|--------------------------------------------------------------------------
| Async Thunks
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Dashboard Analytics
|--------------------------------------------------------------------------
*/

export const fetchDashboardAnalytics =
    createAsyncThunk(

        "analytics/fetchDashboardAnalytics",

        async (
            filters = {},
            { rejectWithValue }
        ) => {

            try {

                return await getDashboardAnalytics(
                    filters
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
| Energy Analytics
|--------------------------------------------------------------------------
*/

export const fetchEnergyAnalytics =
    createAsyncThunk(

        "analytics/fetchEnergyAnalytics",

        async (
            filters = {},
            { rejectWithValue }
        ) => {

            try {

                return await getEnergyAnalytics(
                    filters
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
| Battery Analytics
|--------------------------------------------------------------------------
*/

export const fetchBatteryAnalytics =
    createAsyncThunk(

        "analytics/fetchBatteryAnalytics",

        async (
            filters = {},
            { rejectWithValue }
        ) => {

            try {

                return await getBatteryAnalytics(
                    filters
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
| Solar Analytics
|--------------------------------------------------------------------------
*/

export const fetchSolarAnalytics =
    createAsyncThunk(

        "analytics/fetchSolarAnalytics",

        async (
            filters = {},
            { rejectWithValue }
        ) => {

            try {

                return await getSolarAnalytics(
                    filters
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
| Generator Analytics
|--------------------------------------------------------------------------
*/

export const fetchGeneratorAnalytics =
    createAsyncThunk(

        "analytics/fetchGeneratorAnalytics",

        async (
            filters = {},
            { rejectWithValue }
        ) => {

            try {

                return await getGeneratorAnalytics(
                    filters
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
| Grid Analytics
|--------------------------------------------------------------------------
*/

export const fetchGridAnalytics =
    createAsyncThunk(

        "analytics/fetchGridAnalytics",

        async (
            filters = {},
            { rejectWithValue }
        ) => {

            try {

                return await getGridAnalytics(
                    filters
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
| Reliability Analytics
|--------------------------------------------------------------------------
*/

export const fetchReliabilityAnalytics =
    createAsyncThunk(

        "analytics/fetchReliabilityAnalytics",

        async (
            filters = {},
            { rejectWithValue }
        ) => {

            try {

                return await getReliabilityAnalytics(
                    filters
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

    dashboard: null,

    energy: null,

    battery: null,

    solar: null,

    generator: null,

    grid: null,

    reliability: null,

    filters: {},

    loading: false,

    error: null,

    lastUpdated: null

};

/*
|--------------------------------------------------------------------------
| Slice
|--------------------------------------------------------------------------
*/

const analyticsSlice = createSlice({

    name: "analytics",

    initialState,

    reducers: {

        /*
        |--------------------------------------------------------------------------
        | Set Filters
        |--------------------------------------------------------------------------
        */

        setAnalyticsFilters(
            state,
            action
        ) {

            state.filters =
                action.payload || {};

        },

        /*
        |--------------------------------------------------------------------------
        | Clear Analytics
        |--------------------------------------------------------------------------
        */

        clearAnalytics(state) {

            state.dashboard = null;

            state.energy = null;

            state.battery = null;

            state.solar = null;

            state.generator = null;

            state.grid = null;

            state.reliability = null;

            state.error = null;

            state.lastUpdated = null;

        }

    },

    extraReducers: builder => {

        /*
        |--------------------------------------------------------------------------
        | Dashboard
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                fetchDashboardAnalytics.pending,
                state => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                fetchDashboardAnalytics.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.dashboard =
                        action.payload;

                    state.lastUpdated =
                        new Date().toISOString();

                }
            )

            .addCase(
                fetchDashboardAnalytics.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload;

                }
            );

        /*
        |--------------------------------------------------------------------------
        | Energy
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                fetchEnergyAnalytics.pending,
                state => {

                    state.error = null;

                }
            )

            .addCase(
                fetchEnergyAnalytics.fulfilled,
                (state, action) => {

                    state.energy =
                        action.payload;

                    state.lastUpdated =
                        new Date().toISOString();

                }
            )

            .addCase(
                fetchEnergyAnalytics.rejected,
                (state, action) => {

                    state.error =
                        action.payload;

                }
            );

        /*
        |--------------------------------------------------------------------------
        | Battery
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                fetchBatteryAnalytics.pending,
                state => {

                    state.error = null;

                }
            )

            .addCase(
                fetchBatteryAnalytics.fulfilled,
                (state, action) => {

                    state.battery =
                        action.payload;

                    state.lastUpdated =
                        new Date().toISOString();

                }
            )

            .addCase(
                fetchBatteryAnalytics.rejected,
                (state, action) => {

                    state.error =
                        action.payload;

                }
            );

        /*
        |--------------------------------------------------------------------------
        | Solar
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                fetchSolarAnalytics.pending,
                state => {

                    state.error = null;

                }
            )

            .addCase(
                fetchSolarAnalytics.fulfilled,
                (state, action) => {

                    state.solar =
                        action.payload;

                    state.lastUpdated =
                        new Date().toISOString();

                }
            )

            .addCase(
                fetchSolarAnalytics.rejected,
                (state, action) => {

                    state.error =
                        action.payload;

                }
            );

        /*
        |--------------------------------------------------------------------------
        | Generator
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                fetchGeneratorAnalytics.pending,
                state => {

                    state.error = null;

                }
            )

            .addCase(
                fetchGeneratorAnalytics.fulfilled,
                (state, action) => {

                    state.generator =
                        action.payload;

                    state.lastUpdated =
                        new Date().toISOString();

                }
            )

            .addCase(
                fetchGeneratorAnalytics.rejected,
                (state, action) => {

                    state.error =
                        action.payload;

                }
            );

        /*
        |--------------------------------------------------------------------------
        | Grid
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                fetchGridAnalytics.pending,
                state => {

                    state.error = null;

                }
            )

            .addCase(
                fetchGridAnalytics.fulfilled,
                (state, action) => {

                    state.grid =
                        action.payload;

                    state.lastUpdated =
                        new Date().toISOString();

                }
            )

            .addCase(
                fetchGridAnalytics.rejected,
                (state, action) => {

                    state.error =
                        action.payload;

                }
            );

        /*
        |--------------------------------------------------------------------------
        | Reliability
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                fetchReliabilityAnalytics.pending,
                state => {

                    state.error = null;

                }
            )

            .addCase(
                fetchReliabilityAnalytics.fulfilled,
                (state, action) => {

                    state.reliability =
                        action.payload;

                    state.lastUpdated =
                        new Date().toISOString();

                }
            )

            .addCase(
                fetchReliabilityAnalytics.rejected,
                (state, action) => {

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
    setAnalyticsFilters,
    clearAnalytics
} = analyticsSlice.actions;

/*
|--------------------------------------------------------------------------
| Selectors
|--------------------------------------------------------------------------
*/

export const selectAnalytics =
    state => state.analytics;

export const selectDashboardAnalytics =
    state => state.analytics.dashboard;

export const selectEnergyAnalytics =
    state => state.analytics.energy;

export const selectBatteryAnalytics =
    state => state.analytics.battery;

export const selectSolarAnalytics =
    state => state.analytics.solar;

export const selectGeneratorAnalytics =
    state => state.analytics.generator;

export const selectGridAnalytics =
    state => state.analytics.grid;

export const selectReliabilityAnalytics =
    state => state.analytics.reliability;

export const selectAnalyticsLoading =
    state => state.analytics.loading;

export const selectAnalyticsError =
    state => state.analytics.error;

export default analyticsSlice.reducer;