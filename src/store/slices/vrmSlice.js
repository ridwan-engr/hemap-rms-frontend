import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";

import {
    getVRMInstallation,
    getVRMDashboard,
    getVRMStatistics
} from "../../features/vrm/api/vrmApi.js";

import {
    normalizeVRMInstallation,
    normalizeVRMDashboard,
    normalizeVRMStatistics
} from "../../features/vrm/api/normalizeVRM.js";


/*
|--------------------------------------------------------------------------
| Initial State
|--------------------------------------------------------------------------
*/

const initialState = {

    /*
    |----------------------------------------------------------------------
    | Normalized VRM installation identity
    |----------------------------------------------------------------------
    */

    installation: null,


    /*
    |----------------------------------------------------------------------
    | Normalized live dashboard
    |----------------------------------------------------------------------
    */

    dashboard: null,


    /*
    |----------------------------------------------------------------------
    | Normalized historical statistics
    |----------------------------------------------------------------------
    */

    statistics: null,


    /*
    |----------------------------------------------------------------------
    | Loading
    |----------------------------------------------------------------------
    */

    loading: false,


    /*
    |----------------------------------------------------------------------
    | Refreshing
    |----------------------------------------------------------------------
    */

    refreshing: false,


    /*
    |----------------------------------------------------------------------
    | Error
    |----------------------------------------------------------------------
    */

    error: null,


    /*
    |----------------------------------------------------------------------
    | Last successful update
    |----------------------------------------------------------------------
    */

    lastUpdated: null

};


/*
|--------------------------------------------------------------------------
| Fetch Installation
|--------------------------------------------------------------------------
*/

export const fetchVRMInstallation =
    createAsyncThunk(
        "vrm/fetchInstallation",

        async (
            _,
            { rejectWithValue }
        ) => {

            try {

                const response =
                    await getVRMInstallation();


                const normalized =
                    normalizeVRMInstallation(
                        response
                    );


                return normalized;

            } catch (error) {

                return rejectWithValue(
                    normalizeThunkError(
                        error
                    )
                );

            }

        }
    );


/*
|--------------------------------------------------------------------------
| Fetch Dashboard
|--------------------------------------------------------------------------
*/

export const fetchVRMDashboard =
    createAsyncThunk(
        "vrm/fetchDashboard",

        async (
            _,
            { rejectWithValue }
        ) => {

            try {

                const response =
                    await getVRMDashboard();


                const normalized =
                    normalizeVRMDashboard(
                        response
                    );


                return normalized;

            } catch (error) {

                return rejectWithValue(
                    normalizeThunkError(
                        error
                    )
                );

            }

        }
    );


/*
|--------------------------------------------------------------------------
| Fetch Statistics
|--------------------------------------------------------------------------
*/

export const fetchVRMStatistics =
    createAsyncThunk(
        "vrm/fetchStatistics",

        async (
            params = {},
            { rejectWithValue }
        ) => {

            try {

                const response =
                    await getVRMStatistics(
                        params
                    );


                const normalized =
                    normalizeVRMStatistics(
                        response
                    );


                return normalized;

            } catch (error) {

                return rejectWithValue(
                    normalizeThunkError(
                        error
                    )
                );

            }

        }
    );


/*
|--------------------------------------------------------------------------
| Slice
|--------------------------------------------------------------------------
*/

const vrmSlice =
    createSlice({

        name: "vrm",

        initialState,

        reducers: {

            /*
            |--------------------------------------------------------------
            | Clear error
            |--------------------------------------------------------------
            */

            clearVRMError(
                state
            ) {

                state.error = null;

            },


            /*
            |--------------------------------------------------------------
            | Clear all VRM state
            |--------------------------------------------------------------
            */

            clearVRMState(
                state
            ) {

                state.installation = null;

                state.dashboard = null;

                state.statistics = null;

                state.loading = false;

                state.refreshing = false;

                state.error = null;

                state.lastUpdated = null;

            }

        },


        extraReducers: (
            builder
        ) => {

            /*
            |==============================================================
            | INSTALLATION
            |==============================================================
            */

            builder

                .addCase(
                    fetchVRMInstallation.pending,
                    (
                        state
                    ) => {

                        state.loading =
                            true;

                        state.error =
                            null;

                    }
                )


                .addCase(
                    fetchVRMInstallation.fulfilled,
                    (
                        state,
                        action
                    ) => {

                        state.installation =
                            action.payload;

                        state.loading =
                            false;

                        state.lastUpdated =
                            new Date().toISOString();

                    }
                )


                .addCase(
                    fetchVRMInstallation.rejected,
                    (
                        state,
                        action
                    ) => {

                        state.loading =
                            false;

                        state.error =
                            action.payload ??
                            "Unable to load VRM installation.";

                    }
                );


            /*
            |==============================================================
            | DASHBOARD
            |==============================================================
            */

            builder

                .addCase(
                    fetchVRMDashboard.pending,
                    (
                        state
                    ) => {

                        /*
                         * If dashboard already exists, this is a refresh.
                         */

                        state.refreshing =
                            Boolean(
                                state.dashboard
                            );

                        state.error =
                            null;

                        /*
                         * Only use initial loading when there is no
                         * dashboard yet.
                         */

                        if (
                            !state.dashboard
                        ) {

                            state.loading =
                                true;

                        }

                    }
                )


                .addCase(
                    fetchVRMDashboard.fulfilled,
                    (
                        state,
                        action
                    ) => {

                        state.dashboard =
                            action.payload;

                        state.loading =
                            false;

                        state.refreshing =
                            false;

                        state.lastUpdated =
                            new Date().toISOString();

                    }
                )


                .addCase(
                    fetchVRMDashboard.rejected,
                    (
                        state,
                        action
                    ) => {

                        state.loading =
                            false;

                        state.refreshing =
                            false;

                        state.error =
                            action.payload ??
                            "Unable to load VRM dashboard.";

                    }
                );


            /*
            |==============================================================
            | STATISTICS
            |==============================================================
            */

            builder

                .addCase(
                    fetchVRMStatistics.pending,
                    (
                        state
                    ) => {

                        /*
                         * Statistics are part of the refresh operation,
                         * but should not blank existing statistics.
                         */

                        state.error =
                            null;

                    }
                )


                .addCase(
                    fetchVRMStatistics.fulfilled,
                    (
                        state,
                        action
                    ) => {

                        state.statistics =
                            action.payload;

                        state.refreshing =
                            false;

                        state.lastUpdated =
                            new Date().toISOString();

                    }
                )


                .addCase(
                    fetchVRMStatistics.rejected,
                    (
                        state,
                        action
                    ) => {

                        state.refreshing =
                            false;

                        state.error =
                            action.payload ??
                            "Unable to load VRM statistics.";

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
    clearVRMError,
    clearVRMState
} = vrmSlice.actions;


/*
|--------------------------------------------------------------------------
| Selectors
|--------------------------------------------------------------------------
*/

export const selectVRMInstallation =
    state =>
        state.vrm?.installation ??
        null;


export const selectVRMDashboard =
    state =>
        state.vrm?.dashboard ??
        null;


export const selectVRMStatistics =
    state =>
        state.vrm?.statistics ??
        null;


export const selectVRMLoading =
    state =>
        Boolean(
            state.vrm?.loading
        );


export const selectVRMRefreshing =
    state =>
        Boolean(
            state.vrm?.refreshing
        );


export const selectVRMError =
    state =>
        state.vrm?.error ??
        null;


export const selectVRMLastUpdated =
    state =>
        state.vrm?.lastUpdated ??
        null;


/*
|--------------------------------------------------------------------------
| Error Normalization
|--------------------------------------------------------------------------
*/

function normalizeThunkError(
    error
) {

    if (
        error?.response?.data
    ) {

        return (
            error.response.data.message ??
            error.response.data.error ??
            "VRM request failed."
        );

    }


    if (
        error?.message
    ) {

        return error.message;

    }


    return "VRM request failed.";

}


/*
|--------------------------------------------------------------------------
| Export
|--------------------------------------------------------------------------
*/

export default vrmSlice.reducer;