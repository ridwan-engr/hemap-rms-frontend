import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";

import {
    generateReport,
    getReports,
    getReportById,
    downloadReport,
    deleteReport
} from "../../features/reports/api/reportApi.js";

/*
|--------------------------------------------------------------------------
| Async Thunks
|--------------------------------------------------------------------------
*/

/**
 * Generate Report
 *
 * Backend:
 * POST /reports
 */
export const createReport = createAsyncThunk(
    "reports/createReport",

    async (payload, { rejectWithValue }) => {

        try {

            const response = await generateReport(payload);

            return response.data?.data ?? response.data;

        }

        catch (error) {

            return rejectWithValue(
                error.response?.data ||
                error.message
            );

        }

    }
);


/**
 * Get Reports
 *
 * Backend:
 * GET /reports
 */
export const fetchReports = createAsyncThunk(
    "reports/fetchReports",

    async (params = {}, { rejectWithValue }) => {

        try {

            const response = await getReports(params);

            return response.data?.data ?? response.data;

        }

        catch (error) {

            return rejectWithValue(
                error.response?.data ||
                error.message
            );

        }

    }
);


/**
 * Get Report By ID
 *
 * Backend:
 * GET /reports/:reportId
 */
export const fetchReportById = createAsyncThunk(
    "reports/fetchReportById",

    async (reportId, { rejectWithValue }) => {

        try {

            const response = await getReportById(reportId);

            return response.data?.data ?? response.data;

        }

        catch (error) {

            return rejectWithValue(
                error.response?.data ||
                error.message
            );

        }

    }
);


/**
 * Download Report
 *
 * Backend:
 * GET /reports/:reportId/download
 */
export const downloadReportFile = createAsyncThunk(
    "reports/downloadReport",

    async (reportId, { rejectWithValue }) => {

        try {

            const response = await downloadReport(reportId);

            return {
                data: response.data,
                headers: response.headers,
                reportId
            };

        }

        catch (error) {

            return rejectWithValue(
                error.response?.data ||
                error.message
            );

        }

    }
);


/**
 * Delete Report
 *
 * Backend:
 * DELETE /reports/:reportId
 */
export const removeReport = createAsyncThunk(
    "reports/removeReport",

    async (reportId, { rejectWithValue }) => {

        try {

            await deleteReport(reportId);

            return reportId;

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

    reports: [],

    total: 0,

    selectedReport: null,

    pagination: {
        page: 1,
        limit: 25
    },

    filters: {},

    loading: false,

    generating: false,

    downloading: false,

    deleting: false,

    error: null,

    lastGenerated: null,

    lastUpdated: null

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

        setReportFilters(state, action) {

            state.filters = action.payload;

        },

        setReportPagination(state, action) {

            state.pagination = action.payload;

        },

        clearSelectedReport(state) {

            state.selectedReport = null;

        },

        clearReportError(state) {

            state.error = null;

        },

        clearReports(state) {

            state.reports = [];

            state.total = 0;

            state.selectedReport = null;

            state.error = null;

        }

    },

    extraReducers: builder => {

        builder

        /*
        |--------------------------------------------------------------------------
        | Generate Report
        |--------------------------------------------------------------------------
        */

        .addCase(
            createReport.pending,
            state => {

                state.generating = true;

                state.error = null;

            }
        )

        .addCase(
            createReport.fulfilled,
            (state, action) => {

                state.generating = false;

                state.selectedReport = action.payload;

                state.lastGenerated =
                    new Date().toISOString();

                state.lastUpdated =
                    new Date().toISOString();

            }
        )

        .addCase(
            createReport.rejected,
            (state, action) => {

                state.generating = false;

                state.error = action.payload;

            }
        )


        /*
        |--------------------------------------------------------------------------
        | Get Reports
        |--------------------------------------------------------------------------
        */

        .addCase(
            fetchReports.pending,
            state => {

                state.loading = true;

                state.error = null;

            }
        )

        .addCase(
            fetchReports.fulfilled,
            (state, action) => {

                state.loading = false;

                /*
                 * Supports both:
                 *
                 * {
                 *     rows: [],
                 *     total: 100
                 * }
                 *
                 * and:
                 *
                 * []
                 */

                if (Array.isArray(action.payload)) {

                    state.reports =
                        action.payload;

                    state.total =
                        action.payload.length;

                }

                else {

                    state.reports =
                        action.payload?.rows ??
                        action.payload?.reports ??
                        action.payload?.items ??
                        [];

                    state.total =
                        action.payload?.total ??
                        state.reports.length;

                }

                state.lastUpdated =
                    new Date().toISOString();

            }
        )

        .addCase(
            fetchReports.rejected,
            (state, action) => {

                state.loading = false;

                state.error = action.payload;

            }
        )


        /*
        |--------------------------------------------------------------------------
        | Get Report By ID
        |--------------------------------------------------------------------------
        */

        .addCase(
            fetchReportById.pending,
            state => {

                state.loading = true;

                state.error = null;

            }
        )

        .addCase(
            fetchReportById.fulfilled,
            (state, action) => {

                state.loading = false;

                state.selectedReport =
                    action.payload;

            }
        )

        .addCase(
            fetchReportById.rejected,
            (state, action) => {

                state.loading = false;

                state.error = action.payload;

            }
        )


        /*
        |--------------------------------------------------------------------------
        | Download Report
        |--------------------------------------------------------------------------
        */

        .addCase(
            downloadReportFile.pending,
            state => {

                state.downloading = true;

                state.error = null;

            }
        )

        .addCase(
            downloadReportFile.fulfilled,
            state => {

                state.downloading = false;

            }
        )

        .addCase(
            downloadReportFile.rejected,
            (state, action) => {

                state.downloading = false;

                state.error = action.payload;

            }
        )


        /*
        |--------------------------------------------------------------------------
        | Delete Report
        |--------------------------------------------------------------------------
        */

        .addCase(
            removeReport.pending,
            state => {

                state.deleting = true;

                state.error = null;

            }
        )

        .addCase(
            removeReport.fulfilled,
            (state, action) => {

                state.deleting = false;

                state.reports =
                    state.reports.filter(
                        report =>
                            report._id !== action.payload &&
                            report.id !== action.payload
                    );

                if (
                    state.total > 0
                ) {

                    state.total -= 1;

                }

                if (
                    state.selectedReport?._id ===
                    action.payload ||

                    state.selectedReport?.id ===
                    action.payload
                ) {

                    state.selectedReport = null;

                }

                state.lastUpdated =
                    new Date().toISOString();

            }
        )

        .addCase(
            removeReport.rejected,
            (state, action) => {

                state.deleting = false;

                state.error = action.payload;

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

    setReportFilters,

    setReportPagination,

    clearSelectedReport,

    clearReportError,

    clearReports

} = reportSlice.actions;


/*
|--------------------------------------------------------------------------
| Selectors
|--------------------------------------------------------------------------
*/

export const selectReports =
    state => state.reports.reports;

export const selectReportTotal =
    state => state.reports.total;

export const selectSelectedReport =
    state => state.reports.selectedReport;

export const selectReportFilters =
    state => state.reports.filters;

export const selectReportPagination =
    state => state.reports.pagination;

export const selectReportLoading =
    state => state.reports.loading;

export const selectReportGenerating =
    state => state.reports.generating;

export const selectReportDownloading =
    state => state.reports.downloading;

export const selectReportDeleting =
    state => state.reports.deleting;

export const selectReportError =
    state => state.reports.error;

export const selectLastGenerated =
    state => state.reports.lastGenerated;

export const selectLastUpdated =
    state => state.reports.lastUpdated;


/*
|--------------------------------------------------------------------------
| Default Export
|--------------------------------------------------------------------------
*/

export default reportSlice.reducer;