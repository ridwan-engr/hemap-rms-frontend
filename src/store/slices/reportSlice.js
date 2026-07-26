import {

    createSlice,
    createAsyncThunk

} from "@reduxjs/toolkit";

import {

    generateSiteOverview,
    generateEnergyReport,
    generateBatteryReport,
    generateReliabilityReport,
    generateAlarmReport,
    generateMaintenanceReport,
    generateDashboardReport,
    generateExecutiveReport,
    exportReport,
    getReportResponse

} from "../../features/reports/api/reportApi";

/*
|--------------------------------------------------------------------------
| Async Thunks
|--------------------------------------------------------------------------
*/

export const generateSiteOverviewAsync = createAsyncThunk(

    "reports/siteOverview",

    async (payload, thunkAPI) => {

        try {

            const response = await generateSiteOverview(payload);

            return response.data;

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const generateEnergyAsync = createAsyncThunk(

    "reports/energy",

    async (payload, thunkAPI) => {

        try {

            const response = await generateEnergyReport(payload);

            return response.data;

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const generateBatteryAsync = createAsyncThunk(

    "reports/battery",

    async (payload, thunkAPI) => {

        try {

            const response = await generateBatteryReport(payload);

            return response.data;

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const generateReliabilityAsync = createAsyncThunk(

    "reports/reliability",

    async (payload, thunkAPI) => {

        try {

            const response = await generateReliabilityReport(payload);

            return response.data;

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const generateAlarmAsync = createAsyncThunk(

    "reports/alarm",

    async (payload, thunkAPI) => {

        try {

            const response = await generateAlarmReport(payload);

            return response.data;

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const generateMaintenanceAsync = createAsyncThunk(

    "reports/maintenance",

    async (payload, thunkAPI) => {

        try {

            const response = await generateMaintenanceReport(payload);

            return response.data;

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const generateDashboardAsync = createAsyncThunk(

    "reports/dashboard",

    async (payload, thunkAPI) => {

        try {

            const response = await generateDashboardReport(payload);

            return response.data;

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const generateExecutiveAsync = createAsyncThunk(

    "reports/executive",

    async (payload, thunkAPI) => {

        try {

            const response = await generateExecutiveReport(payload);

            return response.data;

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const exportReportAsync = createAsyncThunk(

    "reports/export",

    async (payload, thunkAPI) => {

        try {

            const response = await exportReport(payload);

            return response.data;

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const fetchReportResponse = createAsyncThunk(

    "reports/response",

    async (reportId, thunkAPI) => {

        try {

            const response = await getReportResponse(reportId);

            return response.data;

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

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

    report: null,

    summary: null,

    exportData: null,

    loading: false,

    exporting: false,

    error: null,

    lastGenerated: null

};

/*
|--------------------------------------------------------------------------
| Slice
|--------------------------------------------------------------------------
*/

const reportSlice = createSlice({

    name: "reports",

    initialState,

    reducers: {

        clearReport(state) {

            state.report = null;

            state.summary = null;

            state.exportData = null;

            state.error = null;

        }

    },

    extraReducers: builder => {

        builder

            .addMatcher(

                action =>

                    action.type.startsWith("reports/") &&

                    action.type.endsWith("/pending"),

                state => {

                    state.loading = true;

                    state.error = null;

                }

            )

            .addMatcher(

                action =>

                    action.type.startsWith("reports/") &&

                    action.type.endsWith("/fulfilled"),

                (state, action) => {

                    state.loading = false;

                    state.report = action.payload.data || null;

                    state.summary =

                        action.payload.data?.summary ||

                        null;

                    state.lastGenerated = new Date().toISOString();

                }

            )

            .addMatcher(

                action =>

                    action.type.startsWith("reports/") &&

                    action.type.endsWith("/rejected"),

                (state, action) => {

                    state.loading = false;

                    state.error = action.payload;

                }

            )

            .addCase(

                exportReportAsync.fulfilled,

                (state, action) => {

                    state.exportData = action.payload.data;

                    state.exporting = false;

                }

            );

    }

});

export const {

    clearReport

} = reportSlice.actions;

export default reportSlice.reducer;