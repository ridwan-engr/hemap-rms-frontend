import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {

    getRoles,
    getRole,
    createRole,
    updateRole,
    deleteRole,

    getRoleSummary,
    getRoleStatistics

} from "../../features/roles/api/roleApi";

/*
|--------------------------------------------------------------------------
| Async Thunks
|--------------------------------------------------------------------------
*/

export const fetchRoles = createAsyncThunk(

    "roles/fetchRoles",

    async (params = {}, thunkAPI) => {

        try {

            return await getRoles(params);

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const fetchRole = createAsyncThunk(

    "roles/fetchRole",

    async (roleId, thunkAPI) => {

        try {

            return await getRole(roleId);

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const fetchRoleSummary = createAsyncThunk(

    "roles/fetchSummary",

    async (_, thunkAPI) => {

        try {

            return await getRoleSummary();

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const fetchRoleStatistics = createAsyncThunk(

    "roles/fetchStatistics",

    async (_, thunkAPI) => {

        try {

            return await getRoleStatistics();

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const createNewRole = createAsyncThunk(

    "roles/create",

    async (payload, thunkAPI) => {

        try {

            return await createRole(payload);

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const updateExistingRole = createAsyncThunk(

    "roles/update",

    async (

        {

            roleId,

            payload

        },

        thunkAPI

    ) => {

        try {

            return await updateRole(

                roleId,

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

export const deleteExistingRole = createAsyncThunk(

    "roles/delete",

    async (roleId, thunkAPI) => {

        try {

            await deleteRole(roleId);

            return roleId;

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

    roles: [],

    total: 0,

    selectedRole: null,

    summary: {},

    statistics: [],

    filters: {

        search: ""

    },

    paginationModel: {

        page: 0,

        pageSize: 10

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

const roleSlice = createSlice({

    name: "roles",

    initialState,

    reducers: {

        setRoleFilters(state, action) {

            state.filters = action.payload;

        },

        setPaginationModel(state, action) {

            state.paginationModel = action.payload;

        },

        refreshRoles(state) {

            state.refreshing = true;

        }

    },

    extraReducers: builder => {

        builder

            .addCase(fetchRoles.pending, state => {

                state.loading = true;

                state.error = null;

            })

            .addCase(fetchRoles.fulfilled, (state, action) => {

                state.loading = false;

                state.roles = action.payload.rows || action.payload.data || [];

                state.total = action.payload.total || 0;

                state.refreshing = false;

                state.lastUpdated = Date.now();

            })

            .addCase(fetchRoles.rejected, (state, action) => {

                state.loading = false;

                state.refreshing = false;

                state.error = action.payload;

            })

            .addCase(fetchRole.fulfilled, (state, action) => {

                state.selectedRole = action.payload;

            })

            .addCase(fetchRoleSummary.fulfilled, (state, action) => {

                state.summary = action.payload;

            })

            .addCase(fetchRoleStatistics.fulfilled, (state, action) => {

                state.statistics = action.payload;

            })

            .addCase(createNewRole.fulfilled, state => {

                state.lastUpdated = Date.now();

            })

            .addCase(updateExistingRole.fulfilled, state => {

                state.lastUpdated = Date.now();

            })

            .addCase(deleteExistingRole.fulfilled, (state, action) => {

                state.roles = state.roles.filter(

                    role => role._id !== action.payload

                );

            });

    }

});

export const {

    setRoleFilters,

    setPaginationModel,

    refreshRoles

} = roleSlice.actions;

export default roleSlice.reducer;
