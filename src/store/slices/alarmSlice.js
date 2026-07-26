import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {

    getAlarms,
    getActiveSummary,
    getAlarmStatistics,
    getSeverityDistribution,
    getAlarmTrends,
    getAlarmById,
    acknowledgeAlarm as acknowledgeAlarmApi,
    resolveAlarm as resolveAlarmApi,
    deleteAlarm as deleteAlarmApi

} from "../../features/alarms/api/alarmApi";

/*
|--------------------------------------------------------------------------
| Async Thunks
|--------------------------------------------------------------------------
*/

export const fetchAlarms = createAsyncThunk(

    "alarms/fetchAlarms",

    async (filters = {}, { rejectWithValue }) => {

        try {

            return await getAlarms(filters);

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const fetchActiveSummary = createAsyncThunk(

    "alarms/fetchActiveSummary",

    async (filters = {}, { rejectWithValue }) => {

        try {

            return await getActiveSummary(filters);

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const fetchAlarmStatistics = createAsyncThunk(

    "alarms/fetchStatistics",

    async (filters = {}, { rejectWithValue }) => {

        try {

            return await getAlarmStatistics(filters);

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const fetchSeverityDistribution = createAsyncThunk(

    "alarms/fetchSeverity",

    async (filters = {}, { rejectWithValue }) => {

        try {

            return await getSeverityDistribution(filters);

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const fetchAlarmTrends = createAsyncThunk(

    "alarms/fetchTrends",

    async (filters = {}, { rejectWithValue }) => {

        try {

            return await getAlarmTrends(filters);

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const fetchAlarmDetails = createAsyncThunk(

    "alarms/fetchDetails",

    async (id, { rejectWithValue }) => {

        try {

            return await getAlarmById(id);

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const acknowledgeAlarm = createAsyncThunk(

    "alarms/acknowledge",

    async (id, { rejectWithValue }) => {

        try {

            return await acknowledgeAlarmApi(id);

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const resolveAlarm = createAsyncThunk(

    "alarms/resolve",

    async ({ id, payload }, { rejectWithValue }) => {

        try {

            return await resolveAlarmApi(

                id,

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

export const deleteAlarm = createAsyncThunk(

    "alarms/delete",

    async (id, { rejectWithValue }) => {

        try {

            await deleteAlarmApi(id);

            return id;

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

    alarms: [],

    total: 0,

    activeSummary: null,

    statistics: null,

    severity: [],

    trends: [],

    selectedAlarm: null,

    filters: {},

    paginationModel: {

        page: 0,

        pageSize: 25

    },

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

const alarmSlice = createSlice({

    name: "alarms",

    initialState,

    reducers: {

        setFilters(state, action) {

            state.filters = action.payload;

        },

        setPaginationModel(state, action) {

            state.paginationModel = action.payload;

        },

        clearSelectedAlarm(state) {

            state.selectedAlarm = null;

        },

        socketAlarmCreated(state, action) {

            state.alarms.unshift(action.payload);

            state.total += 1;

            state.lastUpdated = new Date().toISOString();

        },

        socketAlarmUpdated(state, action) {

            const index = state.alarms.findIndex(

                alarm => alarm.id === action.payload.id

            );

            if (index !== -1) {

                state.alarms[index] = action.payload;

            }

        },

        socketAlarmDeleted(state, action) {

            state.alarms = state.alarms.filter(

                alarm => alarm.id !== action.payload

            );

            state.total--;

        }

    },

    extraReducers: builder => {

        builder

            .addCase(fetchAlarms.pending, state => {

                state.loading = true;

                state.error = null;

            })

            .addCase(fetchAlarms.fulfilled, (state, action) => {

                state.loading = false;

                state.alarms = action.payload.rows;

                state.total = action.payload.total;

                state.lastUpdated = new Date().toISOString();

            })

            .addCase(fetchAlarms.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            });

        builder.addCase(fetchActiveSummary.fulfilled, (state, action) => {

            state.activeSummary = action.payload;

        });

        builder.addCase(fetchAlarmStatistics.fulfilled, (state, action) => {

            state.statistics = action.payload;

        });

        builder.addCase(fetchSeverityDistribution.fulfilled, (state, action) => {

            state.severity = action.payload;

        });

        builder.addCase(fetchAlarmTrends.fulfilled, (state, action) => {

            state.trends = action.payload;

        });

        builder.addCase(fetchAlarmDetails.fulfilled, (state, action) => {

            state.selectedAlarm = action.payload;

        });

        builder.addCase(acknowledgeAlarm.fulfilled, (state) => {

            state.lastUpdated = new Date().toISOString();

        });

        builder.addCase(resolveAlarm.fulfilled, (state) => {

            state.lastUpdated = new Date().toISOString();

        });

        builder.addCase(deleteAlarm.fulfilled, (state, action) => {

            state.alarms = state.alarms.filter(

                alarm => alarm.id !== action.payload

            );

            state.total--;

        });

    }

});

export const {

    setFilters,

    setPaginationModel,

    clearSelectedAlarm,

    socketAlarmCreated,

    socketAlarmUpdated,

    socketAlarmDeleted

} = alarmSlice.actions;

export default alarmSlice.reducer;
