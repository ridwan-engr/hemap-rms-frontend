import {

    createSlice,
    createAsyncThunk

} from "@reduxjs/toolkit";

import {

    getAuditLogs,
    getAuditLog,
    createAuditLog,
    updateAuditLog,
    deleteAuditLog,
    getAuditSummary,
    getAuditStatistics

} from "../../features/audit/api/auditApi";

/*
|--------------------------------------------------------------------------
| Async Thunks
|--------------------------------------------------------------------------
*/

export const fetchAuditLogs = createAsyncThunk(

    "audit/fetchLogs",

    async (params = {}, thunkAPI) => {

        try {

            return await getAuditLogs(params);

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const fetchAuditLog = createAsyncThunk(

    "audit/fetchLog",

    async (auditId, thunkAPI) => {

        try {

            return await getAuditLog(auditId);

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const fetchAuditSummary = createAsyncThunk(

    "audit/fetchSummary",

    async (_, thunkAPI) => {

        try {

            return await getAuditSummary();

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const fetchAuditStatistics = createAsyncThunk(

    "audit/fetchStatistics",

    async (_, thunkAPI) => {

        try {

            return await getAuditStatistics();

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const createNewAuditLog = createAsyncThunk(

    "audit/create",

    async (payload, thunkAPI) => {

        try {

            return await createAuditLog(payload);

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const updateExistingAuditLog = createAsyncThunk(

    "audit/update",

    async (

        {

            auditId,

            payload

        },

        thunkAPI

    ) => {

        try {

            return await updateAuditLog(

                auditId,

                payload

            );

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const deleteExistingAuditLog = createAsyncThunk(

    "audit/delete",

    async (auditId, thunkAPI) => {

        try {

            await deleteAuditLog(auditId);

            return auditId;

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

    logs: [],

    total: 0,

    selectedLog: null,

    summary: {},

    statistics: [],

    filters: {

        search: "",

        module: "",

        action: "",

        user: "",

        site: ""

    },

    paginationModel: {

        page: 0,

        pageSize: 20

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

const auditSlice = createSlice({

    name: "audit",

    initialState,

    reducers: {

        setAuditFilters(state, action) {

            state.filters = action.payload;

        },

        setPaginationModel(state, action) {

            state.paginationModel = action.payload;

        },

        refreshAudit(state) {

            state.refreshing = true;

        }

    },

    extraReducers: builder => {

        builder

            .addCase(fetchAuditLogs.pending, state => {

                state.loading = true;

                state.error = null;

            })

            .addCase(fetchAuditLogs.fulfilled, (state, action) => {

                state.loading = false;

                state.logs = action.payload.data || [];

                state.total = action.payload.total || 0;

                state.refreshing = false;

                state.lastUpdated = Date.now();

            })

            .addCase(fetchAuditLogs.rejected, (state, action) => {

                state.loading = false;

                state.refreshing = false;

                state.error = action.payload;

            })

            .addCase(fetchAuditLog.fulfilled, (state, action) => {

                state.selectedLog = action.payload.data;

            })

            .addCase(fetchAuditSummary.fulfilled, (state, action) => {

                state.summary = action.payload;

            })

            .addCase(fetchAuditStatistics.fulfilled, (state, action) => {

                state.statistics = action.payload;

            })

            .addCase(createNewAuditLog.fulfilled, state => {

                state.lastUpdated = Date.now();

            })

            .addCase(updateExistingAuditLog.fulfilled, state => {

                state.lastUpdated = Date.now();

            })

            .addCase(deleteExistingAuditLog.fulfilled, (state, action) => {

                state.logs = state.logs.filter(

                    log => log._id !== action.payload

                );

            });

    }

});

export const {

    setAuditFilters,

    setPaginationModel,

    refreshAudit

} = auditSlice.actions;

export default auditSlice.reducer;