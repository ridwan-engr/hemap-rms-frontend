import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";

import {
    getActiveAlarms,
    getAlarmHistory,
    getAlarmStatistics,
    getAlarmSummary,
    getAlarmById,
    acknowledgeAlarm as acknowledgeAlarmApi,
    resolveAlarm as resolveAlarmApi,
    deleteAlarm as deleteAlarmApi
} from "../../features/alarms/api/alarmApi.js";

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

function getErrorMessage(error) {

    return (
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.response?.data ||
        error?.message ||
        "An unexpected error occurred."
    );

}

function normalizeListResponse(response) {

    if (Array.isArray(response)) {

        return {
            rows: response,
            total: response.length
        };

    }

    return {

        rows:
            response?.rows ||
            response?.alarms ||
            response?.data ||
            response?.results ||
            [],

        total:
            response?.total ??
            response?.count ??
            response?.pagination?.total ??
            response?.meta?.total ??
            0

    };

}

/*
|--------------------------------------------------------------------------
| Async Thunks
|--------------------------------------------------------------------------
*/

export const fetchActiveAlarms = createAsyncThunk(

    "alarms/fetchActiveAlarms",

    async (params = {}, { rejectWithValue }) => {

        try {

            return await getActiveAlarms(params);

        } catch (error) {

            return rejectWithValue(
                getErrorMessage(error)
            );

        }

    }

);

export const fetchAlarmHistory = createAsyncThunk(

    "alarms/fetchAlarmHistory",

    async (params = {}, { rejectWithValue }) => {

        try {

            return await getAlarmHistory(params);

        } catch (error) {

            return rejectWithValue(
                getErrorMessage(error)
            );

        }

    }

);

export const fetchAlarmStatistics = createAsyncThunk(

    "alarms/fetchAlarmStatistics",

    async (params = {}, { rejectWithValue }) => {

        try {

            return await getAlarmStatistics(params);

        } catch (error) {

            return rejectWithValue(
                getErrorMessage(error)
            );

        }

    }

);

export const fetchAlarmSummary = createAsyncThunk(

    "alarms/fetchAlarmSummary",

    async (params = {}, { rejectWithValue }) => {

        try {

            return await getAlarmSummary(params);

        } catch (error) {

            return rejectWithValue(
                getErrorMessage(error)
            );

        }

    }

);

export const fetchAlarm = createAsyncThunk(

    "alarms/fetchAlarm",

    async (alarmId, { rejectWithValue }) => {

        try {

            return await getAlarmById(alarmId);

        } catch (error) {

            return rejectWithValue(
                getErrorMessage(error)
            );

        }

    }

);

export const acknowledgeAlarm = createAsyncThunk(

    "alarms/acknowledgeAlarm",

    async (alarmId, { rejectWithValue }) => {

        try {

            return await acknowledgeAlarmApi(alarmId);

        } catch (error) {

            return rejectWithValue(
                getErrorMessage(error)
            );

        }

    }

);

export const resolveAlarm = createAsyncThunk(

    "alarms/resolveAlarm",

    async (
        {
            alarmId,
            payload = {}
        },
        { rejectWithValue }
    ) => {

        try {

            return await resolveAlarmApi(
                alarmId,
                payload
            );

        } catch (error) {

            return rejectWithValue(
                getErrorMessage(error)
            );

        }

    }

);

export const deleteAlarm = createAsyncThunk(

    "alarms/deleteAlarm",

    async (alarmId, { rejectWithValue }) => {

        try {

            await deleteAlarmApi(alarmId);

            return alarmId;

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
*/

const initialState = {

    active: [],

    history: [],

    total: 0,

    statistics: {},

    summary: {},

    severity: [],

    trends: [],

    selectedAlarm: null,

    filters: {

        siteId: "",
        severity: "",
        status: "",
        category: "",
        source: "",
        from: "",
        to: "",
        search: ""

    },

    paginationModel: {

        page: 0,
        pageSize: 10

    },

    loading: false,

    loadingActive: false,

    loadingHistory: false,

    loadingStatistics: false,

    loadingSummary: false,

    loadingAlarm: false,

    processing: false,

    error: null,

    lastUpdated: null

};

/*
|--------------------------------------------------------------------------
| Slice
|--------------------------------------------------------------------------
*/

const alarmSlice = createSlice({

    name: "alarms",

    initialState,

    reducers: {

        setAlarmFilters(
            state,
            action
        ) {

            state.filters = {

                ...state.filters,

                ...action.payload

            };

            /*
             * When filters change, return
             * to the first page.
             */

            state.paginationModel.page = 0;

        },

        setPaginationModel(
            state,
            action
        ) {

            state.paginationModel =
                action.payload;

        },

        clearSelectedAlarm(state) {

            state.selectedAlarm = null;

        },

        clearAlarmError(state) {

            state.error = null;

        },

        clearAlarms(state) {

            state.active = [];

            state.history = [];

            state.total = 0;

            state.statistics = {};

            state.summary = {};

            state.severity = [];

            state.trends = [];

            state.selectedAlarm = null;

            state.error = null;

        }

    },

    extraReducers: builder => {

        /*
        |--------------------------------------------------------------------------
        | Active Alarms
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                fetchActiveAlarms.pending,
                state => {

                    state.loading = true;

                    state.loadingActive = true;

                    state.error = null;

                }
            )

            .addCase(
                fetchActiveAlarms.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.loadingActive = false;

                    const result =
                        normalizeListResponse(
                            action.payload
                        );

                    state.active =
                        result.rows;

                    state.lastUpdated =
                        new Date().toISOString();

                }
            )

            .addCase(
                fetchActiveAlarms.rejected,
                (state, action) => {

                    state.loading = false;

                    state.loadingActive = false;

                    state.error =
                        action.payload;

                }
            );

        /*
        |--------------------------------------------------------------------------
        | Alarm History
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                fetchAlarmHistory.pending,
                state => {

                    state.loading = true;

                    state.loadingHistory = true;

                    state.error = null;

                }
            )

            .addCase(
                fetchAlarmHistory.fulfilled,
                (state, action) => {

                    state.loading = false;

                    state.loadingHistory = false;

                    const result =
                        normalizeListResponse(
                            action.payload
                        );

                    state.history =
                        result.rows;

                    state.total =
                        result.total;

                    state.lastUpdated =
                        new Date().toISOString();

                }
            )

            .addCase(
                fetchAlarmHistory.rejected,
                (state, action) => {

                    state.loading = false;

                    state.loadingHistory = false;

                    state.error =
                        action.payload;

                }
            );

        /*
        |--------------------------------------------------------------------------
        | Statistics
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                fetchAlarmStatistics.pending,
                state => {

                    state.loadingStatistics =
                        true;

                    state.error = null;

                }
            )

            .addCase(
                fetchAlarmStatistics.fulfilled,
                (state, action) => {

                    state.loadingStatistics =
                        false;

                    const data =
                        action.payload?.data ||
                        action.payload ||
                        {};

                    state.statistics =
                        data;

                    state.severity =
                        data?.severity ||
                        data?.severityDistribution ||
                        [];

                    state.trends =
                        data?.trends ||
                        data?.trend ||
                        data?.alarmTrend ||
                        [];

                }
            )

            .addCase(
                fetchAlarmStatistics.rejected,
                (state, action) => {

                    state.loadingStatistics =
                        false;

                    state.error =
                        action.payload;

                }
            );

        /*
        |--------------------------------------------------------------------------
        | Summary
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                fetchAlarmSummary.pending,
                state => {

                    state.loadingSummary =
                        true;

                    state.error = null;

                }
            )

            .addCase(
                fetchAlarmSummary.fulfilled,
                (state, action) => {

                    state.loadingSummary =
                        false;

                    state.summary =
                        action.payload?.data ||
                        action.payload ||
                        {};

                }
            )

            .addCase(
                fetchAlarmSummary.rejected,
                (state, action) => {

                    state.loadingSummary =
                        false;

                    state.error =
                        action.payload;

                }
            );

        /*
        |--------------------------------------------------------------------------
        | Alarm Details
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                fetchAlarm.pending,
                state => {

                    state.loadingAlarm = true;

                    state.error = null;

                }
            )

            .addCase(
                fetchAlarm.fulfilled,
                (state, action) => {

                    state.loadingAlarm = false;

                    state.selectedAlarm =
                        action.payload?.data ||
                        action.payload;

                }
            )

            .addCase(
                fetchAlarm.rejected,
                (state, action) => {

                    state.loadingAlarm = false;

                    state.error =
                        action.payload;

                }
            );

        /*
        |--------------------------------------------------------------------------
        | Acknowledge
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                acknowledgeAlarm.pending,
                state => {

                    state.processing = true;

                    state.error = null;

                }
            )

            .addCase(
                acknowledgeAlarm.fulfilled,
                (state, action) => {

                    state.processing = false;

                    const updatedAlarm =
                        action.payload?.data ||
                        action.payload;

                    const alarmId =
                        updatedAlarm?._id ||
                        updatedAlarm?.id;

                    if (!alarmId) {
                        return;
                    }

                    const activeIndex =
                        state.active.findIndex(
                            alarm =>
                                alarm._id === alarmId ||
                                alarm.id === alarmId
                        );

                    if (activeIndex !== -1) {

                        state.active[activeIndex] =
                            updatedAlarm;

                    }

                    const historyIndex =
                        state.history.findIndex(
                            alarm =>
                                alarm._id === alarmId ||
                                alarm.id === alarmId
                        );

                    if (historyIndex !== -1) {

                        state.history[historyIndex] =
                            updatedAlarm;

                    }

                    if (
                        state.selectedAlarm &&
                        (
                            state.selectedAlarm._id === alarmId ||
                            state.selectedAlarm.id === alarmId
                        )
                    ) {

                        state.selectedAlarm =
                            updatedAlarm;

                    }

                    state.lastUpdated =
                        new Date().toISOString();

                }
            )

            .addCase(
                acknowledgeAlarm.rejected,
                (state, action) => {

                    state.processing = false;

                    state.error =
                        action.payload;

                }
            );

        /*
        |--------------------------------------------------------------------------
        | Resolve
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                resolveAlarm.pending,
                state => {

                    state.processing = true;

                    state.error = null;

                }
            )

            .addCase(
                resolveAlarm.fulfilled,
                (state, action) => {

                    state.processing = false;

                    const updatedAlarm =
                        action.payload?.data ||
                        action.payload;

                    const alarmId =
                        updatedAlarm?._id ||
                        updatedAlarm?.id;

                    if (!alarmId) {
                        return;
                    }

                    state.active =
                        state.active.filter(
                            alarm =>
                                alarm._id !== alarmId &&
                                alarm.id !== alarmId
                        );

                    const historyIndex =
                        state.history.findIndex(
                            alarm =>
                                alarm._id === alarmId ||
                                alarm.id === alarmId
                        );

                    if (historyIndex !== -1) {

                        state.history[historyIndex] =
                            updatedAlarm;

                    } else {

                        state.history.unshift(
                            updatedAlarm
                        );

                    }

                    state.selectedAlarm =
                        updatedAlarm;

                    state.lastUpdated =
                        new Date().toISOString();

                }
            )

            .addCase(
                resolveAlarm.rejected,
                (state, action) => {

                    state.processing = false;

                    state.error =
                        action.payload;

                }
            );

        /*
        |--------------------------------------------------------------------------
        | Delete
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                deleteAlarm.pending,
                state => {

                    state.processing = true;

                    state.error = null;

                }
            )

            .addCase(
                deleteAlarm.fulfilled,
                (state, action) => {

                    state.processing = false;

                    const alarmId =
                        action.payload;

                    state.active =
                        state.active.filter(
                            alarm =>
                                alarm._id !== alarmId &&
                                alarm.id !== alarmId
                        );

                    state.history =
                        state.history.filter(
                            alarm =>
                                alarm._id !== alarmId &&
                                alarm.id !== alarmId
                        );

                    state.total =
                        Math.max(
                            0,
                            state.total - 1
                        );

                    if (
                        state.selectedAlarm &&
                        (
                            state.selectedAlarm._id === alarmId ||
                            state.selectedAlarm.id === alarmId
                        )
                    ) {

                        state.selectedAlarm =
                            null;

                    }

                    state.lastUpdated =
                        new Date().toISOString();

                }
            )

            .addCase(
                deleteAlarm.rejected,
                (state, action) => {

                    state.processing = false;

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

    setAlarmFilters,

    setPaginationModel,

    clearSelectedAlarm,

    clearAlarmError,

    clearAlarms

} = alarmSlice.actions;

export default alarmSlice.reducer;