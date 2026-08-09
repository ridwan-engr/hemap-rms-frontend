// src/store/slices/statisticsSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
    getDashboardStatistics,
    getEnergyStatistics,
    getBatteryStatistics,
    getSolarStatistics,
    getGeneratorStatistics,
    getGridStatistics,
    getSiteLocations
} from "../../features/statistics/api/statisticsApi.js";

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
    kpis: null,
    locations: [],

    loading: {
        dashboard: false,
        energy: false,
        battery: false,
        solar: false,
        generator: false,
        grid: false,
        kpis: false,
        locations: false
    },

    error: {
        dashboard: null,
        energy: null,
        battery: null,
        solar: null,
        generator: null,
        grid: null,
        kpis: null,
        locations: null
    },

    lastUpdated: {
        dashboard: null,
        energy: null,
        battery: null,
        solar: null,
        generator: null,
        grid: null,
        kpis: null,
        locations: null
    }
};

/*
|--------------------------------------------------------------------------
| Error Normalizer
|--------------------------------------------------------------------------
*/

const getErrorMessage = error => {
    return (
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Failed to load statistics."
    );
};

/*
|--------------------------------------------------------------------------
| Dashboard Statistics
|--------------------------------------------------------------------------
*/

export const fetchDashboardStatistics = createAsyncThunk(
    "statistics/fetchDashboardStatistics",
    async (params = {}, { rejectWithValue }) => {
        try {
            const response = await getDashboardStatistics(params);

            return response?.data ?? response;
        } catch (error) {
            return rejectWithValue(
                getErrorMessage(error)
            );
        }
    }
);

/*
|--------------------------------------------------------------------------
| Energy Statistics
|--------------------------------------------------------------------------
*/

export const fetchEnergyStatistics = createAsyncThunk(
    "statistics/fetchEnergyStatistics",
    async (params = {}, { rejectWithValue }) => {
        try {
            const response = await getEnergyStatistics(params);

            return response?.data ?? response;
        } catch (error) {
            return rejectWithValue(
                getErrorMessage(error)
            );
        }
    }
);

/*
|--------------------------------------------------------------------------
| Battery Statistics
|--------------------------------------------------------------------------
*/

export const fetchBatteryStatistics = createAsyncThunk(
    "statistics/fetchBatteryStatistics",
    async (params = {}, { rejectWithValue }) => {
        try {
            const response = await getBatteryStatistics(params);

            return response?.data ?? response;
        } catch (error) {
            return rejectWithValue(
                getErrorMessage(error)
            );
        }
    }
);

/*
|--------------------------------------------------------------------------
| Solar Statistics
|--------------------------------------------------------------------------
*/

export const fetchSolarStatistics = createAsyncThunk(
    "statistics/fetchSolarStatistics",
    async (params = {}, { rejectWithValue }) => {
        try {
            const response = await getSolarStatistics(params);

            return response?.data ?? response;
        } catch (error) {
            return rejectWithValue(
                getErrorMessage(error)
            );
        }
    }
);

/*
|--------------------------------------------------------------------------
| Generator Statistics
|--------------------------------------------------------------------------
*/

export const fetchGeneratorStatistics = createAsyncThunk(
    "statistics/fetchGeneratorStatistics",
    async (params = {}, { rejectWithValue }) => {
        try {
            const response = await getGeneratorStatistics(params);

            return response?.data ?? response;
        } catch (error) {
            return rejectWithValue(
                getErrorMessage(error)
            );
        }
    }
);

/*
|--------------------------------------------------------------------------
| Grid Statistics
|--------------------------------------------------------------------------
*/

export const fetchGridStatistics = createAsyncThunk(
    "statistics/fetchGridStatistics",
    async (params = {}, { rejectWithValue }) => {
        try {
            const response = await getGridStatistics(params);

            return response?.data ?? response;
        } catch (error) {
            return rejectWithValue(
                getErrorMessage(error)
            );
        }
    }
);

/*
|--------------------------------------------------------------------------
| KPI Statistics
|--------------------------------------------------------------------------
*/

export const fetchKPIs = createAsyncThunk(
    "statistics/fetchKPIs",
    async (params = {}, { rejectWithValue }) => {
        try {
            const response = await getKPIs(params);

            return response?.data ?? response;
        } catch (error) {
            return rejectWithValue(
                getErrorMessage(error)
            );
        }
    }
);

/*
|--------------------------------------------------------------------------
| Site Locations
|--------------------------------------------------------------------------
*/

export const fetchSiteLocations = createAsyncThunk(
    "statistics/fetchSiteLocations",
    async (params = {}, { rejectWithValue }) => {
        try {
            const response = await getSiteLocations(params);

            return response?.data ?? response;
        } catch (error) {
            return rejectWithValue(
                getErrorMessage(error)
            );
        }
    }
);

/*
|--------------------------------------------------------------------------
| Statistics Slice
|--------------------------------------------------------------------------
*/

const statisticsSlice = createSlice({
    name: "statistics",

    initialState,

    reducers: {
        clearStatistics: state => {
            state.dashboard = null;
            state.energy = null;
            state.battery = null;
            state.solar = null;
            state.generator = null;
            state.grid = null;
            state.kpis = null;
            state.locations = [];

            state.error = {
                dashboard: null,
                energy: null,
                battery: null,
                solar: null,
                generator: null,
                grid: null,
                kpis: null,
                locations: null
            };
        },

        clearStatisticsErrors: state => {
            state.error = {
                dashboard: null,
                energy: null,
                battery: null,
                solar: null,
                generator: null,
                grid: null,
                kpis: null,
                locations: null
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
                fetchDashboardStatistics.pending,
                state => {
                    state.loading.dashboard = true;
                    state.error.dashboard = null;
                }
            )

            .addCase(
                fetchDashboardStatistics.fulfilled,
                (state, action) => {
                    state.loading.dashboard = false;
                    state.dashboard = action.payload;
                    state.lastUpdated.dashboard = new Date().toISOString();
                }
            )

            .addCase(
                fetchDashboardStatistics.rejected,
                (state, action) => {
                    state.loading.dashboard = false;
                    state.error.dashboard =
                        action.payload ||
                        "Failed to load dashboard statistics.";
                }
            );

        /*
        |--------------------------------------------------------------------------
        | Energy
        |--------------------------------------------------------------------------
        */

        builder
            .addCase(
                fetchEnergyStatistics.pending,
                state => {
                    state.loading.energy = true;
                    state.error.energy = null;
                }
            )

            .addCase(
                fetchEnergyStatistics.fulfilled,
                (state, action) => {
                    state.loading.energy = false;
                    state.energy = action.payload;
                    state.lastUpdated.energy = new Date().toISOString();
                }
            )

            .addCase(
                fetchEnergyStatistics.rejected,
                (state, action) => {
                    state.loading.energy = false;
                    state.error.energy =
                        action.payload ||
                        "Failed to load energy statistics.";
                }
            );

        /*
        |--------------------------------------------------------------------------
        | Battery
        |--------------------------------------------------------------------------
        */

        builder
            .addCase(
                fetchBatteryStatistics.pending,
                state => {
                    state.loading.battery = true;
                    state.error.battery = null;
                }
            )

            .addCase(
                fetchBatteryStatistics.fulfilled,
                (state, action) => {
                    state.loading.battery = false;
                    state.battery = action.payload;
                    state.lastUpdated.battery = new Date().toISOString();
                }
            )

            .addCase(
                fetchBatteryStatistics.rejected,
                (state, action) => {
                    state.loading.battery = false;
                    state.error.battery =
                        action.payload ||
                        "Failed to load battery statistics.";
                }
            );

        /*
        |--------------------------------------------------------------------------
        | Solar
        |--------------------------------------------------------------------------
        */

        builder
            .addCase(
                fetchSolarStatistics.pending,
                state => {
                    state.loading.solar = true;
                    state.error.solar = null;
                }
            )

            .addCase(
                fetchSolarStatistics.fulfilled,
                (state, action) => {
                    state.loading.solar = false;
                    state.solar = action.payload;
                    state.lastUpdated.solar = new Date().toISOString();
                }
            )

            .addCase(
                fetchSolarStatistics.rejected,
                (state, action) => {
                    state.loading.solar = false;
                    state.error.solar =
                        action.payload ||
                        "Failed to load solar statistics.";
                }
            );

        /*
        |--------------------------------------------------------------------------
        | Generator
        |--------------------------------------------------------------------------
        */

        builder
            .addCase(
                fetchGeneratorStatistics.pending,
                state => {
                    state.loading.generator = true;
                    state.error.generator = null;
                }
            )

            .addCase(
                fetchGeneratorStatistics.fulfilled,
                (state, action) => {
                    state.loading.generator = false;
                    state.generator = action.payload;
                    state.lastUpdated.generator = new Date().toISOString();
                }
            )

            .addCase(
                fetchGeneratorStatistics.rejected,
                (state, action) => {
                    state.loading.generator = false;
                    state.error.generator =
                        action.payload ||
                        "Failed to load generator statistics.";
                }
            );

        /*
        |--------------------------------------------------------------------------
        | Grid
        |--------------------------------------------------------------------------
        */

        builder
            .addCase(
                fetchGridStatistics.pending,
                state => {
                    state.loading.grid = true;
                    state.error.grid = null;
                }
            )

            .addCase(
                fetchGridStatistics.fulfilled,
                (state, action) => {
                    state.loading.grid = false;
                    state.grid = action.payload;
                    state.lastUpdated.grid = new Date().toISOString();
                }
            )

            .addCase(
                fetchGridStatistics.rejected,
                (state, action) => {
                    state.loading.grid = false;
                    state.error.grid =
                        action.payload ||
                        "Failed to load grid statistics.";
                }
            );

        /*
        |--------------------------------------------------------------------------
        | KPIs
        |--------------------------------------------------------------------------
        */

        builder
            .addCase(
                fetchKPIs.pending,
                state => {
                    state.loading.kpis = true;
                    state.error.kpis = null;
                }
            )

            .addCase(
                fetchKPIs.fulfilled,
                (state, action) => {
                    state.loading.kpis = false;
                    state.kpis = action.payload;
                    state.lastUpdated.kpis = new Date().toISOString();
                }
            )

            .addCase(
                fetchKPIs.rejected,
                (state, action) => {
                    state.loading.kpis = false;
                    state.error.kpis =
                        action.payload ||
                        "Failed to load KPI statistics.";
                }
            );

        /*
        |--------------------------------------------------------------------------
        | Site Locations
        |--------------------------------------------------------------------------
        */

        builder
            .addCase(
                fetchSiteLocations.pending,
                state => {
                    state.loading.locations = true;
                    state.error.locations = null;
                }
            )

            .addCase(
                fetchSiteLocations.fulfilled,
                (state, action) => {
                    state.loading.locations = false;

                    state.locations =
                        Array.isArray(action.payload)
                            ? action.payload
                            : action.payload?.locations || [];

                    state.lastUpdated.locations =
                        new Date().toISOString();
                }
            )

            .addCase(
                fetchSiteLocations.rejected,
                (state, action) => {
                    state.loading.locations = false;
                    state.error.locations =
                        action.payload ||
                        "Failed to load site locations.";
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
    clearStatistics,
    clearStatisticsErrors
} = statisticsSlice.actions;

/*
|--------------------------------------------------------------------------
| Selectors
|--------------------------------------------------------------------------
*/

export const selectDashboardStatistics = state =>
    state.statistics.dashboard;

export const selectEnergyStatistics = state =>
    state.statistics.energy;

export const selectBatteryStatistics = state =>
    state.statistics.battery;

export const selectSolarStatistics = state =>
    state.statistics.solar;

export const selectGeneratorStatistics = state =>
    state.statistics.generator;

export const selectGridStatistics = state =>
    state.statistics.grid;

export const selectKPIs = state =>
    state.statistics.kpis;

export const selectSiteLocations = state =>
    state.statistics.locations;

export const selectStatisticsLoading = state =>
    state.statistics.loading;

export const selectStatisticsErrors = state =>
    state.statistics.error;

export const selectStatisticsLastUpdated = state =>
    state.statistics.lastUpdated;

/*
|--------------------------------------------------------------------------
| Export Reducer
|--------------------------------------------------------------------------
*/

export default statisticsSlice.reducer;