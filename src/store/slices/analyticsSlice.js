import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {

    getDashboardAnalytics,
    getReliabilityMetrics,
    getEnergyForecast,
    getEnergyTrends,
    getOptimizationSummary,
    getKPIComparison,
    getAvailability,
    getBatteryHealth,
    getSolarPerformance,
    getGeneratorPerformance,
    getWeatherImpact,
    refreshAnalytics as refreshAnalyticsApi

} from "../../features/analytics/api/analyticsApi";

/*
|--------------------------------------------------------------------------
| Async Thunks
|--------------------------------------------------------------------------
*/

export const fetchDashboardAnalytics = createAsyncThunk(

    "analytics/dashboard",

    async (filters = {}, { rejectWithValue }) => {

        try {

            return await getDashboardAnalytics(filters);

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const fetchReliabilityMetrics = createAsyncThunk(

    "analytics/reliability",

    async (filters = {}, { rejectWithValue }) => {

        try {

            return await getReliabilityMetrics(filters);

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const fetchEnergyForecast = createAsyncThunk(

    "analytics/forecast",

    async (filters = {}, { rejectWithValue }) => {

        try {

            return await getEnergyForecast(filters);

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const fetchEnergyTrends = createAsyncThunk(

    "analytics/trends",

    async (filters = {}, { rejectWithValue }) => {

        try {

            return await getEnergyTrends(filters);

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const fetchOptimizationSummary = createAsyncThunk(

    "analytics/optimization",

    async (filters = {}, { rejectWithValue }) => {

        try {

            return await getOptimizationSummary(filters);

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const fetchKPIComparison = createAsyncThunk(

    "analytics/kpis",

    async (filters = {}, { rejectWithValue }) => {

        try {

            return await getKPIComparison(filters);

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const fetchAvailability = createAsyncThunk(

    "analytics/availability",

    async (filters = {}, { rejectWithValue }) => {

        try {

            return await getAvailability(filters);

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const fetchBatteryHealth = createAsyncThunk(

    "analytics/battery",

    async (filters = {}, { rejectWithValue }) => {

        try {

            return await getBatteryHealth(filters);

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const fetchSolarPerformance = createAsyncThunk(

    "analytics/solar",

    async (filters = {}, { rejectWithValue }) => {

        try {

            return await getSolarPerformance(filters);

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const fetchGeneratorPerformance = createAsyncThunk(

    "analytics/generator",

    async (filters = {}, { rejectWithValue }) => {

        try {

            return await getGeneratorPerformance(filters);

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const fetchWeatherImpact = createAsyncThunk(

    "analytics/weather",

    async (filters = {}, { rejectWithValue }) => {

        try {

            return await getWeatherImpact(filters);

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const refreshAnalytics = createAsyncThunk(

    "analytics/refresh",

    async (filters = {}, { rejectWithValue }) => {

        try {

            return await refreshAnalyticsApi(filters);

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

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

    reliability: [],

    forecast: [],

    trends: [],

    optimization: null,

    kpis: [],

    availability: [],

    batteryHealth: [],

    solarPerformance: [],

    generatorPerformance: [],

    weatherImpact: [],

    loading: false,

    refreshing: false,

    error: null,

    filters: {},

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

        setAnalyticsFilters(state, action) {

            state.filters = action.payload;

        },

        clearAnalytics(state) {

            return initialState;

        }

    },

    extraReducers: builder => {

        builder

            .addCase(fetchDashboardAnalytics.pending, state => {

                state.loading = true;

                state.error = null;

            })

            .addCase(fetchDashboardAnalytics.fulfilled, (state, action) => {

                state.loading = false;

                state.dashboard = action.payload.data;

                state.lastUpdated = new Date().toISOString();

            })

            .addCase(fetchDashboardAnalytics.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            });

        builder.addCase(fetchReliabilityMetrics.fulfilled, (state, action) => {

            state.reliability = action.payload;

        });

        builder.addCase(fetchEnergyForecast.fulfilled, (state, action) => {

            state.forecast = action.payload;

        });

        builder.addCase(fetchEnergyTrends.fulfilled, (state, action) => {

            state.trends = action.payload;

        });

        builder.addCase(fetchOptimizationSummary.fulfilled, (state, action) => {

            state.optimization = action.payload;

        });

        builder.addCase(fetchKPIComparison.fulfilled, (state, action) => {

            state.kpis = action.payload;

        });

        builder.addCase(fetchAvailability.fulfilled, (state, action) => {

            state.availability = action.payload;

        });

        builder.addCase(fetchBatteryHealth.fulfilled, (state, action) => {

            state.batteryHealth = action.payload;

        });

        builder.addCase(fetchSolarPerformance.fulfilled, (state, action) => {

            state.solarPerformance = action.payload;

        });

        builder.addCase(fetchGeneratorPerformance.fulfilled, (state, action) => {

            state.generatorPerformance = action.payload;

        });

        builder.addCase(fetchWeatherImpact.fulfilled, (state, action) => {

            state.weatherImpact = action.payload;

        });

        builder

            .addCase(refreshAnalytics.pending, state => {

                state.refreshing = true;

            })

            .addCase(refreshAnalytics.fulfilled, state => {

                state.refreshing = false;

                state.lastUpdated = new Date().toISOString();

            })

            .addCase(refreshAnalytics.rejected, (state, action) => {

                state.refreshing = false;

                state.error = action.payload;

            });

    }

});

export const {

    setAnalyticsFilters,

    clearAnalytics

} = analyticsSlice.actions;

export default analyticsSlice.reducer;