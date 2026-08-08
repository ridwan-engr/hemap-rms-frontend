import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";

import {
    getUsers,
    getUserById,
    createUser as createUserApi,
    updateUser as updateUserApi,
    activateUser as activateUserApi,
    deactivateUser as deactivateUserApi,
    deleteUser as deleteUserApi
} from "../../features/users/api/userApi.js";


/*
|--------------------------------------------------------------------------
| Async Thunks
|--------------------------------------------------------------------------
*/


/**
 * Get All Users
 *
 * Backend:
 * GET /users
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


/**
 * Get User By ID
 *
 * Backend:
 * GET /users/:id
 */
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


/**
 * Create User
 *
 * Backend:
 * POST /users
 */
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


/**
 * Update User
 *
 * Backend:
 * PUT /users/:id
 */
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


/**
 * Activate User
 *
 * Backend:
 * PATCH /users/:id/activate
 */
export const activateUser = createAsyncThunk(

    "users/activateUser",

    async (userId, { rejectWithValue }) => {

        try {

            return await activateUserApi(userId);

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
 * Deactivate User
 *
 * Backend:
 * PATCH /users/:id/deactivate
 */
export const deactivateUser = createAsyncThunk(

    "users/deactivateUser",

    async (userId, { rejectWithValue }) => {

        try {

            return await deactivateUserApi(userId);

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
 * Delete User
 *
 * Backend:
 * DELETE /users/:id
 */
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


/*
|--------------------------------------------------------------------------
| Initial State
|--------------------------------------------------------------------------
*/

const initialState = {

    users: [],

    total: 0,

    selectedUser: null,

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

    creating: false,

    updating: false,

    activating: false,

    deactivating: false,

    deleting: false,

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

        /*
        |--------------------------------------------------------------------------
        | Filters
        |--------------------------------------------------------------------------
        */

        setUserFilters(state, action) {

            state.filters = action.payload;

        },


        /*
        |--------------------------------------------------------------------------
        | Pagination
        |--------------------------------------------------------------------------
        */

        setPaginationModel(state, action) {

            state.paginationModel = action.payload;

        },


        /*
        |--------------------------------------------------------------------------
        | Selected User
        |--------------------------------------------------------------------------
        */

        clearSelectedUser(state) {

            state.selectedUser = null;

        },


        /*
        |--------------------------------------------------------------------------
        | Error
        |--------------------------------------------------------------------------
        */

        clearUserError(state) {

            state.error = null;

        },


        /*
        |--------------------------------------------------------------------------
        | Reset
        |--------------------------------------------------------------------------
        */

        clearUsers(state) {

            state.users = [];

            state.total = 0;

            state.selectedUser = null;

            state.error = null;

        }

    },


    /*
    |--------------------------------------------------------------------------
    | Extra Reducers
    |--------------------------------------------------------------------------
    */

    extraReducers: builder => {

        builder


        /*
        |--------------------------------------------------------------------------
        | Fetch Users
        |--------------------------------------------------------------------------
        */

        .addCase(

            fetchUsers.pending,

            state => {

                state.loading = true;

                state.error = null;

            }

        )

        .addCase(

            fetchUsers.fulfilled,

            (state, action) => {

                state.loading = false;

                /*
                 * Supports common backend response formats:
                 *
                 * {
                 *     rows: [],
                 *     total: 100
                 * }
                 *
                 * {
                 *     users: [],
                 *     total: 100
                 * }
                 *
                 * []
                 */

                if (Array.isArray(action.payload)) {

                    state.users =
                        action.payload;

                    state.total =
                        action.payload.length;

                }

                else {

                    state.users =
                        action.payload?.rows ??
                        action.payload?.users ??
                        action.payload?.items ??
                        [];

                    state.total =
                        action.payload?.total ??
                        state.users.length;

                }

                state.lastUpdated =
                    new Date().toISOString();

            }

        )

        .addCase(

            fetchUsers.rejected,

            (state, action) => {

                state.loading = false;

                state.error = action.payload;

            }

        )


        /*
        |--------------------------------------------------------------------------
        | Fetch Single User
        |--------------------------------------------------------------------------
        */

        .addCase(

            fetchUser.pending,

            state => {

                state.loading = true;

                state.error = null;

            }

        )

        .addCase(

            fetchUser.fulfilled,

            (state, action) => {

                state.loading = false;

                state.selectedUser =
                    action.payload;

            }

        )

        .addCase(

            fetchUser.rejected,

            (state, action) => {

                state.loading = false;

                state.error = action.payload;

            }

        )


        /*
        |--------------------------------------------------------------------------
        | Create User
        |--------------------------------------------------------------------------
        */

        .addCase(

            createUser.pending,

            state => {

                state.creating = true;

                state.error = null;

            }

        )

        .addCase(

            createUser.fulfilled,

            (state, action) => {

                state.creating = false;

                /*
                 * If the backend returns the newly
                 * created user, add it to the list.
                 */

                const user =
                    action.payload;

                if (user) {

                    state.users.unshift(user);

                    state.total += 1;

                }

                state.lastUpdated =
                    new Date().toISOString();

            }

        )

        .addCase(

            createUser.rejected,

            (state, action) => {

                state.creating = false;

                state.error = action.payload;

            }

        )


        /*
        |--------------------------------------------------------------------------
        | Update User
        |--------------------------------------------------------------------------
        */

        .addCase(

            updateUser.pending,

            state => {

                state.updating = true;

                state.error = null;

            }

        )

        .addCase(

            updateUser.fulfilled,

            (state, action) => {

                state.updating = false;

                const updatedUser =
                    action.payload;

                if (updatedUser) {

                    const userId =
                        updatedUser._id ??
                        updatedUser.id;

                    const index =
                        state.users.findIndex(

                            user =>
                                (
                                    user._id ??
                                    user.id
                                ) === userId

                        );

                    if (index !== -1) {

                        state.users[index] =
                            updatedUser;

                    }

                    if (

                        (
                            state.selectedUser?._id ??
                            state.selectedUser?.id
                        ) === userId

                    ) {

                        state.selectedUser =
                            updatedUser;

                    }

                }

                state.lastUpdated =
                    new Date().toISOString();

            }

        )

        .addCase(

            updateUser.rejected,

            (state, action) => {

                state.updating = false;

                state.error = action.payload;

            }

        )


        /*
        |--------------------------------------------------------------------------
        | Activate User
        |--------------------------------------------------------------------------
        */

        .addCase(

            activateUser.pending,

            state => {

                state.activating = true;

                state.error = null;

            }

        )

        .addCase(

            activateUser.fulfilled,

            (state, action) => {

                state.activating = false;

                const activatedUser =
                    action.payload;

                if (activatedUser) {

                    const userId =
                        activatedUser._id ??
                        activatedUser.id;

                    const index =
                        state.users.findIndex(

                            user =>
                                (
                                    user._id ??
                                    user.id
                                ) === userId

                        );

                    if (index !== -1) {

                        state.users[index] =
                            activatedUser;

                    }

                    if (

                        (
                            state.selectedUser?._id ??
                            state.selectedUser?.id
                        ) === userId

                    ) {

                        state.selectedUser =
                            activatedUser;

                    }

                }

                state.lastUpdated =
                    new Date().toISOString();

            }

        )

        .addCase(

            activateUser.rejected,

            (state, action) => {

                state.activating = false;

                state.error = action.payload;

            }

        )


        /*
        |--------------------------------------------------------------------------
        | Deactivate User
        |--------------------------------------------------------------------------
        */

        .addCase(

            deactivateUser.pending,

            state => {

                state.deactivating = true;

                state.error = null;

            }

        )

        .addCase(

            deactivateUser.fulfilled,

            (state, action) => {

                state.deactivating = false;

                const deactivatedUser =
                    action.payload;

                if (deactivatedUser) {

                    const userId =
                        deactivatedUser._id ??
                        deactivatedUser.id;

                    const index =
                        state.users.findIndex(

                            user =>
                                (
                                    user._id ??
                                    user.id
                                ) === userId

                        );

                    if (index !== -1) {

                        state.users[index] =
                            deactivatedUser;

                    }

                    if (

                        (
                            state.selectedUser?._id ??
                            state.selectedUser?.id
                        ) === userId

                    ) {

                        state.selectedUser =
                            deactivatedUser;

                    }

                }

                state.lastUpdated =
                    new Date().toISOString();

            }

        )

        .addCase(

            deactivateUser.rejected,

            (state, action) => {

                state.deactivating = false;

                state.error = action.payload;

            }

        )


        /*
        |--------------------------------------------------------------------------
        | Delete User
        |--------------------------------------------------------------------------
        */

        .addCase(

            deleteUser.pending,

            state => {

                state.deleting = true;

                state.error = null;

            }

        )

        .addCase(

            deleteUser.fulfilled,

            (state, action) => {

                state.deleting = false;

                const userId =
                    action.payload;

                state.users =
                    state.users.filter(

                        user =>
                            (
                                user._id ??
                                user.id
                            ) !== userId

                    );

                if (state.total > 0) {

                    state.total -= 1;

                }

                if (

                    (
                        state.selectedUser?._id ??
                        state.selectedUser?.id
                    ) === userId

                ) {

                    state.selectedUser = null;

                }

                state.lastUpdated =
                    new Date().toISOString();

            }

        )

        .addCase(

            deleteUser.rejected,

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

    setUserFilters,

    setPaginationModel,

    clearSelectedUser,

    clearUserError,

    clearUsers

} = userSlice.actions;


/*
|--------------------------------------------------------------------------
| Selectors
|--------------------------------------------------------------------------
*/

export const selectUsers =
    state => state.users.users;

export const selectUserTotal =
    state => state.users.total;

export const selectSelectedUser =
    state => state.users.selectedUser;

export const selectUserFilters =
    state => state.users.filters;

export const selectUserPagination =
    state => state.users.paginationModel;

export const selectUserLoading =
    state => state.users.loading;

export const selectUserCreating =
    state => state.users.creating;

export const selectUserUpdating =
    state => state.users.updating;

export const selectUserActivating =
    state => state.users.activating;

export const selectUserDeactivating =
    state => state.users.deactivating;

export const selectUserDeleting =
    state => state.users.deleting;

export const selectUserError =
    state => state.users.error;

export const selectUserLastUpdated =
    state => state.users.lastUpdated;


/*
|--------------------------------------------------------------------------
| Default Export
|--------------------------------------------------------------------------
*/

export default userSlice.reducer;