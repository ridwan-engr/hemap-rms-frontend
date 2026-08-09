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
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.response?.data ||
        error?.message ||
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

export const fetchDashboardAnalytics = createAsyncThunk(
    "analytics/fetchDashboardAnalytics",

    async (filters = {}, { rejectWithValue }) => {
        try {
            return await getDashboardAnalytics(filters);
        } catch (error) {
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

export const fetchEnergyAnalytics = createAsyncThunk(
    "analytics/fetchEnergyAnalytics",

    async (filters = {}, { rejectWithValue }) => {
        try {
            return await getEnergyAnalytics(filters);
        } catch (error) {
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

export const fetchBatteryAnalytics = createAsyncThunk(
    "analytics/fetchBatteryAnalytics",

    async (filters = {}, { rejectWithValue }) => {
        try {
            return await getBatteryAnalytics(filters);
        } catch (error) {
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

export const fetchSolarAnalytics = createAsyncThunk(
    "analytics/fetchSolarAnalytics",

    async (filters = {}, { rejectWithValue }) => {
        try {
            return await getSolarAnalytics(filters);
        } catch (error) {
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

export const fetchGeneratorAnalytics = createAsyncThunk(
    "analytics/fetchGeneratorAnalytics",

    async (filters = {}, { rejectWithValue }) => {
        try {
            return await getGeneratorAnalytics(filters);
        } catch (error) {
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

export const fetchGridAnalytics = createAsyncThunk(
    "analytics/fetchGridAnalytics",

    async (filters = {}, { rejectWithValue }) => {
        try {
            return await getGridAnalytics(filters);
        } catch (error) {
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

export const fetchReliabilityAnalytics = createAsyncThunk(
    "analytics/fetchReliabilityAnalytics",

    async (filters = {}, { rejectWithValue }) => {
        try {
            return await getReliabilityAnalytics(filters);
        } catch (error) {
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
|
| Each analytics endpoint has its own:
|
| - data
| - loading
| - error
|
| This prevents one endpoint from affecting another.
|
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

    loading: {
        dashboard: false,
        energy: false,
        battery: false,
        solar: false,
        generator: false,
        grid: false,
        reliability: false
    },

    error: {
        dashboard: null,
        energy: null,
        battery: null,
        solar: null,
        generator: null,
        grid: null,
        reliability: null
    },

    lastUpdated: {
        dashboard: null,
        energy: null,
        battery: null,
        solar: null,
        generator: null,
        grid: null,
        reliability: null
    }
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
        | Set Analytics Filters
        |--------------------------------------------------------------------------
        */

        setAnalyticsFilters: (state, action) => {
            state.filters = action.payload || {};
        },

        /*
        |--------------------------------------------------------------------------
        | Clear Analytics
        |--------------------------------------------------------------------------
        */

        clearAnalytics: state => {
            state.dashboard = null;
            state.energy = null;
            state.battery = null;
            state.solar = null;
            state.generator = null;
            state.grid = null;
            state.reliability = null;

            state.filters = {};

            state.loading = {
                dashboard: false,
                energy: false,
                battery: false,
                solar: false,
                generator: false,
                grid: false,
                reliability: false
            };

            state.error = {
                dashboard: null,
                energy: null,
                battery: null,
                solar: null,
                generator: null,
                grid: null,
                reliability: null
            };

            state.lastUpdated = {
                dashboard: null,
                energy: null,
                battery: null,
                solar: null,
                generator: null,
                grid: null,
                reliability: null
            };
        },

        /*
        |--------------------------------------------------------------------------
        | Clear Analytics Errors
        |--------------------------------------------------------------------------
        */

        clearAnalyticsErrors: state => {
            state.error = {
                dashboard: null,
                energy: null,
                battery: null,
                solar: null,
                generator: null,
                grid: null,
                reliability: null
            };
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
                (state, action) => {
                    state.loading.dashboard = true;
                    state.error.dashboard = null;

                    state.filters =
                        action.meta.arg || {};
                }
            )

            .addCase(
                fetchDashboardAnalytics.fulfilled,
                (state, action) => {
                    state.loading.dashboard = false;

                    state.dashboard =
                        action.payload;

                    state.lastUpdated.dashboard =
                        new Date().toISOString();
                }
            )

            .addCase(
                fetchDashboardAnalytics.rejected,
                (state, action) => {
                    state.loading.dashboard = false;

                    state.error.dashboard =
                        action.payload ||
                        "Failed to load dashboard analytics";
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
                (state, action) => {
                    state.loading.energy = true;
                    state.error.energy = null;

                    state.filters =
                        action.meta.arg || {};
                }
            )

            .addCase(
                fetchEnergyAnalytics.fulfilled,
                (state, action) => {
                    state.loading.energy = false;

                    state.energy =
                        action.payload;

                    state.lastUpdated.energy =
                        new Date().toISOString();
                }
            )

            .addCase(
                fetchEnergyAnalytics.rejected,
                (state, action) => {
                    state.loading.energy = false;

                    state.error.energy =
                        action.payload ||
                        "Failed to load energy analytics";
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
                (state, action) => {
                    state.loading.battery = true;
                    state.error.battery = null;

                    state.filters =
                        action.meta.arg || {};
                }
            )

            .addCase(
                fetchBatteryAnalytics.fulfilled,
                (state, action) => {
                    state.loading.battery = false;

                    state.battery =
                        action.payload;

                    state.lastUpdated.battery =
                        new Date().toISOString();
                }
            )

            .addCase(
                fetchBatteryAnalytics.rejected,
                (state, action) => {
                    state.loading.battery = false;

                    state.error.battery =
                        action.payload ||
                        "Failed to load battery analytics";
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
                (state, action) => {
                    state.loading.solar = true;
                    state.error.solar = null;

                    state.filters =
                        action.meta.arg || {};
                }
            )

            .addCase(
                fetchSolarAnalytics.fulfilled,
                (state, action) => {
                    state.loading.solar = false;

                    state.solar =
                        action.payload;

                    state.lastUpdated.solar =
                        new Date().toISOString();
                }
            )

            .addCase(
                fetchSolarAnalytics.rejected,
                (state, action) => {
                    state.loading.solar = false;

                    state.error.solar =
                        action.payload ||
                        "Failed to load solar analytics";
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
                (state, action) => {
                    state.loading.generator = true;
                    state.error.generator = null;

                    state.filters =
                        action.meta.arg || {};
                }
            )

            .addCase(
                fetchGeneratorAnalytics.fulfilled,
                (state, action) => {
                    state.loading.generator = false;

                    state.generator =
                        action.payload;

                    state.lastUpdated.generator =
                        new Date().toISOString();
                }
            )

            .addCase(
                fetchGeneratorAnalytics.rejected,
                (state, action) => {
                    state.loading.generator = false;

                    state.error.generator =
                        action.payload ||
                        "Failed to load generator analytics";
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
                (state, action) => {
                    state.loading.grid = true;
                    state.error.grid = null;

                    state.filters =
                        action.meta.arg || {};
                }
            )

            .addCase(
                fetchGridAnalytics.fulfilled,
                (state, action) => {
                    state.loading.grid = false;

                    state.grid =
                        action.payload;

                    state.lastUpdated.grid =
                        new Date().toISOString();
                }
            )

            .addCase(
                fetchGridAnalytics.rejected,
                (state, action) => {
                    state.loading.grid = false;

                    state.error.grid =
                        action.payload ||
                        "Failed to load grid analytics";
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
                (state, action) => {
                    state.loading.reliability = true;
                    state.error.reliability = null;

                    state.filters =
                        action.meta.arg || {};
                }
            )

            .addCase(
                fetchReliabilityAnalytics.fulfilled,
                (state, action) => {
                    state.loading.reliability = false;

                    state.reliability =
                        action.payload;

                    state.lastUpdated.reliability =
                        new Date().toISOString();
                }
            )

            .addCase(
                fetchReliabilityAnalytics.rejected,
                (state, action) => {
                    state.loading.reliability = false;

                    state.error.reliability =
                        action.payload ||
                        "Failed to load reliability analytics";
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
    clearAnalytics,
    clearAnalyticsErrors
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

/*
|--------------------------------------------------------------------------
| Loading Selectors
|--------------------------------------------------------------------------
*/

export const selectDashboardAnalyticsLoading =
    state => state.analytics.loading.dashboard;

export const selectEnergyAnalyticsLoading =
    state => state.analytics.loading.energy;

export const selectBatteryAnalyticsLoading =
    state => state.analytics.loading.battery;

export const selectSolarAnalyticsLoading =
    state => state.analytics.loading.solar;

export const selectGeneratorAnalyticsLoading =
    state => state.analytics.loading.generator;

export const selectGridAnalyticsLoading =
    state => state.analytics.loading.grid;

export const selectReliabilityAnalyticsLoading =
    state => state.analytics.loading.reliability;

/*
|--------------------------------------------------------------------------
| Global Analytics Loading
|--------------------------------------------------------------------------
*/

export const selectAnalyticsLoading =
    state =>
        Object.values(
            state.analytics.loading
        ).some(Boolean);

/*
|--------------------------------------------------------------------------
| Error Selectors
|--------------------------------------------------------------------------
*/

export const selectAnalyticsError =
    state => state.analytics.error;

export const selectDashboardAnalyticsError =
    state => state.analytics.error.dashboard;

export const selectEnergyAnalyticsError =
    state => state.analytics.error.energy;

export const selectBatteryAnalyticsError =
    state => state.analytics.error.battery;

export const selectSolarAnalyticsError =
    state => state.analytics.error.solar;

export const selectGeneratorAnalyticsError =
    state => state.analytics.error.generator;

export const selectGridAnalyticsError =
    state => state.analytics.error.grid;

export const selectReliabilityAnalyticsError =
    state => state.analytics.error.reliability;

/*
|--------------------------------------------------------------------------
| Last Updated Selectors
|--------------------------------------------------------------------------
*/

export const selectAnalyticsLastUpdated =
    state => state.analytics.lastUpdated;

export const selectDashboardAnalyticsLastUpdated =
    state => state.analytics.lastUpdated.dashboard;

export const selectEnergyAnalyticsLastUpdated =
    state => state.analytics.lastUpdated.energy;

export const selectBatteryAnalyticsLastUpdated =
    state => state.analytics.lastUpdated.battery;

export const selectSolarAnalyticsLastUpdated =
    state => state.analytics.lastUpdated.solar;

export const selectGeneratorAnalyticsLastUpdated =
    state => state.analytics.lastUpdated.generator;

export const selectGridAnalyticsLastUpdated =
    state => state.analytics.lastUpdated.grid;

export const selectReliabilityAnalyticsLastUpdated =
    state => state.analytics.lastUpdated.reliability;

/*
|--------------------------------------------------------------------------
| Default Export
|--------------------------------------------------------------------------
*/

export default analyticsSlice.reducer;