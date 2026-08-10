import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";

import {
    getVRMInstallation,
    getVRMDashboard,
    getVRMStatistics
} from "../../features/vrm/api/vrmApi.js";

/*
|--------------------------------------------------------------------------
| VRM Async Thunks
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Fetch VRM Installation
|--------------------------------------------------------------------------
*/

export const fetchVRMInstallation =
    createAsyncThunk(
        "vrm/fetchInstallation",

        async (_, thunkAPI) => {

            try {

                const response =
                    await getVRMInstallation();

                return response;

            } catch (error) {

                return thunkAPI.rejectWithValue(
                    error?.response?.data ||
                    error?.message ||
                    "Failed to load VRM installation."
                );

            }

        }
    );

/*
|--------------------------------------------------------------------------
| Fetch Live VRM Dashboard
|--------------------------------------------------------------------------
*/

export const fetchVRMDashboard =
    createAsyncThunk(
        "vrm/fetchDashboard",

        async (_, thunkAPI) => {

            try {

                const response =
                    await getVRMDashboard();

                return response;

            } catch (error) {

                return thunkAPI.rejectWithValue(
                    error?.response?.data ||
                    error?.message ||
                    "Failed to load VRM dashboard."
                );

            }

        }
    );

/*
|--------------------------------------------------------------------------
| Fetch VRM Statistics
|--------------------------------------------------------------------------
*/

export const fetchVRMStatistics =
    createAsyncThunk(
        "vrm/fetchStatistics",

        async (params = {}, thunkAPI) => {

            try {

                const response =
                    await getVRMStatistics(
                        params
                    );

                return response;

            } catch (error) {

                return thunkAPI.rejectWithValue(
                    error?.response?.data ||
                    error?.message ||
                    "Failed to load VRM statistics."
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

    installation: null,

    dashboard: null,

    statistics: null,

    loading: false,

    refreshing: false,

    error: null,

    lastUpdated: null

};

/*
|--------------------------------------------------------------------------
| VRM Slice
|--------------------------------------------------------------------------
*/

const vrmSlice = createSlice({

    name: "vrm",

    initialState,

    reducers: {

        /*
        |--------------------------------------------------------------------------
        | Clear Error
        |--------------------------------------------------------------------------
        */

        clearVRMError(state) {

            state.error = null;

        },

        /*
        |--------------------------------------------------------------------------
        | Clear VRM State
        |--------------------------------------------------------------------------
        */

        clearVRMState(state) {

            state.installation = null;

            state.dashboard = null;

            state.statistics = null;

            state.loading = false;

            state.refreshing = false;

            state.error = null;

            state.lastUpdated = null;

        }

    },

    extraReducers: builder => {

        /*
        |--------------------------------------------------------------------------
        | Installation
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                fetchVRMInstallation.pending,
                state => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                fetchVRMInstallation.fulfilled,
                (state, action) => {

                    state.loading = false;

                    /*
                    | Backend response:
                    |
                    | {
                    |     success: true,
                    |     data: {
                    |         installationId,
                    |         dashboard
                    |     }
                    | }
                    |
                    */

                    const response =
                        action.payload;

                    state.installation =
                        response?.data ||
                        response ||
                        null;

                    state.lastUpdated =
                        new Date().toISOString();

                }
            )

            .addCase(
                fetchVRMInstallation.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        normalizeError(
                            action.payload
                        );

                }
            );

        /*
        |--------------------------------------------------------------------------
        | Dashboard
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                fetchVRMDashboard.pending,
                state => {

                    state.refreshing = true;

                    state.error = null;

                }
            )

            .addCase(
                fetchVRMDashboard.fulfilled,
                (state, action) => {

                    state.refreshing = false;

                    const response =
                        action.payload;

                    state.dashboard =
                        response?.data ||
                        response ||
                        null;

                    state.lastUpdated =
                        new Date().toISOString();

                }
            )

            .addCase(
                fetchVRMDashboard.rejected,
                (state, action) => {

                    state.refreshing = false;

                    state.error =
                        normalizeError(
                            action.payload
                        );

                }
            );

        /*
        |--------------------------------------------------------------------------
        | Statistics
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                fetchVRMStatistics.pending,
                state => {

                    state.refreshing = true;

                    state.error = null;

                }
            )

            .addCase(
                fetchVRMStatistics.fulfilled,
                (state, action) => {

                    state.refreshing = false;

                    const response =
                        action.payload;

                    state.statistics =
                        response?.data ||
                        response ||
                        null;

                    state.lastUpdated =
                        new Date().toISOString();

                }
            )

            .addCase(
                fetchVRMStatistics.rejected,
                (state, action) => {

                    state.refreshing = false;

                    state.error =
                        normalizeError(
                            action.payload
                        );

                }
            );

    }

});

/*
|--------------------------------------------------------------------------
| Error Normalization
|--------------------------------------------------------------------------
*/

function normalizeError(error) {

    if (!error) {

        return "VRM request failed.";

    }

    if (typeof error === "string") {

        return error;

    }

    if (error?.message) {

        return error.message;

    }

    if (error?.error) {

        return typeof error.error === "string"
            ? error.error
            : error.error?.message ||
              "VRM request failed.";

    }

    return "VRM request failed.";

}

/*
|--------------------------------------------------------------------------
| Actions
|--------------------------------------------------------------------------
*/

export const {
    clearVRMError,
    clearVRMState
} = vrmSlice.actions;

/*
|--------------------------------------------------------------------------
| Selectors
|--------------------------------------------------------------------------
*/

export const selectVRM =
    state =>
        state.vrm;

export const selectVRMInstallation =
    state =>
        state.vrm?.installation;

export const selectVRMDashboard =
    state =>
        state.vrm?.dashboard;

export const selectVRMStatistics =
    state =>
        state.vrm?.statistics;

export const selectVRMLoading =
    state =>
        state.vrm?.loading ?? false;

export const selectVRMRefreshing =
    state =>
        state.vrm?.refreshing ?? false;

export const selectVRMError =
    state =>
        state.vrm?.error ?? null;

export const selectVRMLastUpdated =
    state =>
        state.vrm?.lastUpdated ?? null;

/*
|--------------------------------------------------------------------------
| Export
|--------------------------------------------------------------------------
*/

export default vrmSlice.reducer;