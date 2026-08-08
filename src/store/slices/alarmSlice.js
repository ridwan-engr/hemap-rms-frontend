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
| Async Thunks
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Fetch Active Alarms
|--------------------------------------------------------------------------
*/

export const fetchActiveAlarms = createAsyncThunk(

    "alarms/fetchActiveAlarms",

    async (params = {}, { rejectWithValue }) => {

        try {

            return await getActiveAlarms(params);

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
| Fetch Alarm History
|--------------------------------------------------------------------------
*/

export const fetchAlarmHistory = createAsyncThunk(

    "alarms/fetchAlarmHistory",

    async (params = {}, { rejectWithValue }) => {

        try {

            return await getAlarmHistory(params);

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
| Fetch Alarm Statistics
|--------------------------------------------------------------------------
*/

export const fetchAlarmStatistics = createAsyncThunk(

    "alarms/fetchAlarmStatistics",

    async (params = {}, { rejectWithValue }) => {

        try {

            return await getAlarmStatistics(params);

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
| Fetch Alarm Summary
|--------------------------------------------------------------------------
*/

export const fetchAlarmSummary = createAsyncThunk(

    "alarms/fetchAlarmSummary",

    async (params = {}, { rejectWithValue }) => {

        try {

            return await getAlarmSummary(params);

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
| Fetch Alarm By ID
|--------------------------------------------------------------------------
*/

export const fetchAlarm = createAsyncThunk(

    "alarms/fetchAlarm",

    async (alarmId, { rejectWithValue }) => {

        try {

            return await getAlarmById(alarmId);

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
| Acknowledge Alarm
|--------------------------------------------------------------------------
*/

export const acknowledgeAlarm = createAsyncThunk(

    "alarms/acknowledgeAlarm",

    async (alarmId, { rejectWithValue }) => {

        try {

            return await acknowledgeAlarmApi(alarmId);

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
| Resolve Alarm
|--------------------------------------------------------------------------
*/

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
| Delete Alarm
|--------------------------------------------------------------------------
*/

export const deleteAlarm = createAsyncThunk(

    "alarms/deleteAlarm",

    async (alarmId, { rejectWithValue }) => {

        try {

            await deleteAlarmApi(alarmId);

            return alarmId;

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

    active: [],

    history: [],

    statistics: {},

    summary: {},

    selectedAlarm: null,

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

        clearSelectedAlarm(state) {

            state.selectedAlarm = null;

        },

        clearAlarmError(state) {

            state.error = null;

        },

        clearAlarms(state) {

            state.active = [];

            state.history = [];

            state.statistics = {};

            state.summary = {};

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

                    state.active =

                        Array.isArray(action.payload)

                            ? action.payload

                            : action.payload?.rows ||

                              action.payload?.alarms ||

                              action.payload?.data ||

                              [];

                    state.lastUpdated =

                        new Date().toISOString();

                }

            )

            .addCase(

                fetchActiveAlarms.rejected,

                (state, action) => {

                    state.loading = false;

                    state.loadingActive = false;

                    state.error = action.payload;

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

                    state.history =

                        Array.isArray(action.payload)

                            ? action.payload

                            : action.payload?.rows ||

                              action.payload?.alarms ||

                              action.payload?.data ||

                              [];

                    state.lastUpdated =

                        new Date().toISOString();

                }

            )

            .addCase(

                fetchAlarmHistory.rejected,

                (state, action) => {

                    state.loading = false;

                    state.loadingHistory = false;

                    state.error = action.payload;

                }

            );

        /*
        |--------------------------------------------------------------------------
        | Alarm Statistics
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(

                fetchAlarmStatistics.pending,

                state => {

                    state.loadingStatistics = true;

                    state.error = null;

                }

            )

            .addCase(

                fetchAlarmStatistics.fulfilled,

                (state, action) => {

                    state.loadingStatistics = false;

                    state.statistics =

                        action.payload || {};

                }

            )

            .addCase(

                fetchAlarmStatistics.rejected,

                (state, action) => {

                    state.loadingStatistics = false;

                    state.error = action.payload;

                }

            );

        /*
        |--------------------------------------------------------------------------
        | Alarm Summary
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(

                fetchAlarmSummary.pending,

                state => {

                    state.loadingSummary = true;

                    state.error = null;

                }

            )

            .addCase(

                fetchAlarmSummary.fulfilled,

                (state, action) => {

                    state.loadingSummary = false;

                    state.summary =

                        action.payload || {};

                }

            )

            .addCase(

                fetchAlarmSummary.rejected,

                (state, action) => {

                    state.loadingSummary = false;

                    state.error = action.payload;

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

                        action.payload;

                }

            )

            .addCase(

                fetchAlarm.rejected,

                (state, action) => {

                    state.loadingAlarm = false;

                    state.error = action.payload;

                }

            );

        /*
        |--------------------------------------------------------------------------
        | Acknowledge Alarm
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

                        action.payload;

                    const alarmId =

                        updatedAlarm?._id ||

                        updatedAlarm?.id;

                    if (updatedAlarm && alarmId) {

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

                    }

                    state.lastUpdated =

                        new Date().toISOString();

                }

            )

            .addCase(

                acknowledgeAlarm.rejected,

                (state, action) => {

                    state.processing = false;

                    state.error = action.payload;

                }

            );

        /*
        |--------------------------------------------------------------------------
        | Resolve Alarm
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

                        action.payload;

                    const alarmId =

                        updatedAlarm?._id ||

                        updatedAlarm?.id;

                    if (updatedAlarm && alarmId) {

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

                        }

                        else {

                            state.history.unshift(

                                updatedAlarm

                            );

                        }

                        state.selectedAlarm =

                            updatedAlarm;

                    }

                    state.lastUpdated =

                        new Date().toISOString();

                }

            )

            .addCase(

                resolveAlarm.rejected,

                (state, action) => {

                    state.processing = false;

                    state.error = action.payload;

                }

            );

        /*
        |--------------------------------------------------------------------------
        | Delete Alarm
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

                    const alarmId = action.payload;

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

                    if (

                        state.selectedAlarm &&

                        (

                            state.selectedAlarm._id === alarmId ||

                            state.selectedAlarm.id === alarmId

                        )

                    ) {

                        state.selectedAlarm = null;

                    }

                    state.lastUpdated =

                        new Date().toISOString();

                }

            )

            .addCase(

                deleteAlarm.rejected,

                (state, action) => {

                    state.processing = false;

                    state.error = action.payload;

                }

            );

    }

});

export const {

    clearSelectedAlarm,

    clearAlarmError,

    clearAlarms

} = alarmSlice.actions;

export default alarmSlice.reducer;