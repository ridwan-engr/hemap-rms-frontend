import {

    createSlice,
    createAsyncThunk

} from "@reduxjs/toolkit";

import {

    getUsers,
    getUserById,
    getUserSummary,
    getUserStatistics,
    createUser as createUserApi,
    updateUser as updateUserApi,
    deleteUser as deleteUserApi,
    refreshUsers as refreshUsersApi

} from "../../features/users/api/userApi";

/*
|--------------------------------------------------------------------------
| Async Thunks
|--------------------------------------------------------------------------
*/

export const fetchUsers = createAsyncThunk(

    "users/fetchUsers",

    async (params = {}, { rejectWithValue }) => {

        try {

            return await getUsers(params);

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const fetchUser = createAsyncThunk(

    "users/fetchUser",

    async (userId, { rejectWithValue }) => {

        try {

            return await getUserById(userId);

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const fetchUserSummary = createAsyncThunk(

    "users/fetchUserSummary",

    async (_, { rejectWithValue }) => {

        try {

            return await getUserSummary();

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const fetchUserStatistics = createAsyncThunk(

    "users/fetchUserStatistics",

    async (_, { rejectWithValue }) => {

        try {

            return await getUserStatistics();

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const createUser = createAsyncThunk(

    "users/createUser",

    async (payload, { rejectWithValue }) => {

        try {

            return await createUserApi(payload);

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const updateUser = createAsyncThunk(

    "users/updateUser",

    async (

        {

            userId,

            payload

        },

        {

            rejectWithValue

        }

    ) => {

        try {

            return await updateUserApi(

                userId,

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

export const deleteUser = createAsyncThunk(

    "users/deleteUser",

    async (userId, { rejectWithValue }) => {

        try {

            await deleteUserApi(userId);

            return userId;

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const refreshUsers = createAsyncThunk(

    "users/refreshUsers",

    async (_, { rejectWithValue }) => {

        try {

            return await refreshUsersApi();

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

    users: [],

    total: 0,

    selectedUser: null,

    summary: {},

    statistics: {},

    filters: {

        search: "",

        role: "",

        site: "",

        isActive: ""

    },

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

const userSlice = createSlice({

    name: "users",

    initialState,

    reducers: {

        setUserFilters(state, action) {

            state.filters = action.payload;

        },

        setPaginationModel(state, action) {

            state.paginationModel = action.payload;

        },

        clearSelectedUser(state) {

            state.selectedUser = null;

        }

    },

    extraReducers: builder => {

        builder

            .addCase(fetchUsers.pending, state => {

                state.loading = true;

                state.error = null;

            })

            .addCase(fetchUsers.fulfilled, (state, action) => {

                state.loading = false;

                state.users = action.payload.rows ?? [];

                state.total = action.payload.total ?? 0;

                state.lastUpdated = new Date().toISOString();

            })

            .addCase(fetchUsers.rejected, (state, action) => {

                state.loading = false;

                state.error = action.payload;

            })

            .addCase(fetchUser.fulfilled, (state, action) => {

                state.selectedUser = action.payload;

            })

            .addCase(fetchUserSummary.fulfilled, (state, action) => {

                state.summary = action.payload;

            })

            .addCase(fetchUserStatistics.fulfilled, (state, action) => {

                state.statistics = action.payload;

            })

            .addCase(createUser.fulfilled, state => {

                state.lastUpdated = new Date().toISOString();

            })

            .addCase(updateUser.fulfilled, state => {

                state.lastUpdated = new Date().toISOString();

            })

            .addCase(deleteUser.fulfilled, (state, action) => {

                state.users = state.users.filter(

                    user => user.id !== action.payload

                );

                state.total--;

                state.lastUpdated = new Date().toISOString();

            })

            .addCase(refreshUsers.pending, state => {

                state.refreshing = true;

            })

            .addCase(refreshUsers.fulfilled, state => {

                state.refreshing = false;

                state.lastUpdated = new Date().toISOString();

            })

            .addCase(refreshUsers.rejected, (state, action) => {

                state.refreshing = false;

                state.error = action.payload;

            });

    }

});

export const {

    setUserFilters,

    setPaginationModel,

    clearSelectedUser

} = userSlice.actions;

export default userSlice.reducer;