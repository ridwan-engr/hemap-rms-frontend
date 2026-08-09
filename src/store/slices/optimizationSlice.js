import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";

import {
    getLatestOptimization,
    getOptimizationHistory,
    getOptimization,
    getDispatchSchedule,
    getEnergySummary,
    getEconomics,
    getEmissions,
    getReliability,
    getSolver
} from "../../features/optimization/api/optimizationApi.js";

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

/**
 * Normalize API errors into a predictable string/object.
 */
function getErrorPayload(error) {

    return (
        error?.response?.data ||
        error?.message ||
        "Optimization request failed."
    );

}

/**
 * Extract the useful payload from common API response formats.
 *
 * Supports:
 * {
 *     data: ...
 * }
 *
 * {
 *     result: ...
 * }
 *
 * {
 *     data: {
 *         ...
 *     }
 * }
 */
function unwrapResponse(response) {

    if (
        response &&
        typeof response === "object" &&
        !Array.isArray(response)
    ) {

        if (
            response.data !== undefined
        ) {

            return response.data;

        }

        if (
            response.result !== undefined
        ) {

            return response.result;

        }

    }

    return response;

}

/*
|--------------------------------------------------------------------------
| Async Thunks
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Get Latest Optimization
|--------------------------------------------------------------------------
*/

export const fetchLatestOptimization =
    createAsyncThunk(

        "optimization/fetchLatestOptimization",

        async (
            siteId,
            { rejectWithValue }
        ) => {

            try {

                if (!siteId) {

                    throw new Error(
                        "siteId is required"
                    );

                }

                return await getLatestOptimization(
                    siteId
                );

            }

            catch (error) {

                return rejectWithValue(
                    getErrorPayload(error)
                );

            }

        }

    );

/*
|--------------------------------------------------------------------------
| Get Optimization History
|--------------------------------------------------------------------------
*/

export const fetchOptimizationHistory =
    createAsyncThunk(

        "optimization/fetchOptimizationHistory",

        async (
            params = {},
            { rejectWithValue }
        ) => {

            try {

                return await getOptimizationHistory(
                    params
                );

            }

            catch (error) {

                return rejectWithValue(
                    getErrorPayload(error)
                );

            }

        }

    );

/*
|--------------------------------------------------------------------------
| Get Optimization By ID
|--------------------------------------------------------------------------
*/

export const fetchOptimization =
    createAsyncThunk(

        "optimization/fetchOptimization",

        async (
            optimizationId,
            { rejectWithValue }
        ) => {

            try {

                if (!optimizationId) {

                    throw new Error(
                        "optimizationId is required"
                    );

                }

                return await getOptimization(
                    optimizationId
                );

            }

            catch (error) {

                return rejectWithValue(
                    getErrorPayload(error)
                );

            }

        }

    );

/*
|--------------------------------------------------------------------------
| Get Dispatch Schedule
|--------------------------------------------------------------------------
*/

export const fetchDispatchSchedule =
    createAsyncThunk(

        "optimization/fetchDispatchSchedule",

        async (
            optimizationId,
            { rejectWithValue }
        ) => {

            try {

                if (!optimizationId) {

                    throw new Error(
                        "optimizationId is required"
                    );

                }

                return await getDispatchSchedule(
                    optimizationId
                );

            }

            catch (error) {

                return rejectWithValue(
                    getErrorPayload(error)
                );

            }

        }

    );

/*
|--------------------------------------------------------------------------
| Get Energy Summary
|--------------------------------------------------------------------------
*/

export const fetchEnergySummary =
    createAsyncThunk(

        "optimization/fetchEnergySummary",

        async (
            optimizationId,
            { rejectWithValue }
        ) => {

            try {

                if (!optimizationId) {

                    throw new Error(
                        "optimizationId is required"
                    );

                }

                return await getEnergySummary(
                    optimizationId
                );

            }

            catch (error) {

                return rejectWithValue(
                    getErrorPayload(error)
                );

            }

        }

    );

/*
|--------------------------------------------------------------------------
| Get Economics
|--------------------------------------------------------------------------
*/

export const fetchEconomics =
    createAsyncThunk(

        "optimization/fetchEconomics",

        async (
            optimizationId,
            { rejectWithValue }
        ) => {

            try {

                if (!optimizationId) {

                    throw new Error(
                        "optimizationId is required"
                    );

                }

                return await getEconomics(
                    optimizationId
                );

            }

            catch (error) {

                return rejectWithValue(
                    getErrorPayload(error)
                );

            }

        }

    );

/*
|--------------------------------------------------------------------------
| Get Emissions
|--------------------------------------------------------------------------
*/

export const fetchEmissions =
    createAsyncThunk(

        "optimization/fetchEmissions",

        async (
            optimizationId,
            { rejectWithValue }
        ) => {

            try {

                if (!optimizationId) {

                    throw new Error(
                        "optimizationId is required"
                    );

                }

                return await getEmissions(
                    optimizationId
                );

            }

            catch (error) {

                return rejectWithValue(
                    getErrorPayload(error)
                );

            }

        }

    );

/*
|--------------------------------------------------------------------------
| Get Reliability
|--------------------------------------------------------------------------
*/

export const fetchReliability =
    createAsyncThunk(

        "optimization/fetchReliability",

        async (
            optimizationId,
            { rejectWithValue }
        ) => {

            try {

                if (!optimizationId) {

                    throw new Error(
                        "optimizationId is required"
                    );

                }

                return await getReliability(
                    optimizationId
                );

            }

            catch (error) {

                return rejectWithValue(
                    getErrorPayload(error)
                );

            }

        }

    );

/*
|--------------------------------------------------------------------------
| Get Solver Information
|--------------------------------------------------------------------------
*/

export const fetchSolver =
    createAsyncThunk(

        "optimization/fetchSolver",

        async (
            optimizationId,
            { rejectWithValue }
        ) => {

            try {

                if (!optimizationId) {

                    throw new Error(
                        "optimizationId is required"
                    );

                }

                return await getSolver(
                    optimizationId
                );

            }

            catch (error) {

                return rejectWithValue(
                    getErrorPayload(error)
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

    /*
    |--------------------------------------------------------------------------
    | Current Optimization
    |--------------------------------------------------------------------------
    */

    currentRun: null,

    /*
    |--------------------------------------------------------------------------
    | History
    |--------------------------------------------------------------------------
    */

    history: [],

    historyTotal: 0,

    /*
    |--------------------------------------------------------------------------
    | Optimization Result Data
    |--------------------------------------------------------------------------
    */

    recommendations: [],

    objectives: null,

    progress: 0,

    dispatch: [],

    energy: null,

    economics: null,

    emissions: null,

    reliability: null,

    solver: null,

    /*
    |--------------------------------------------------------------------------
    | Status
    |--------------------------------------------------------------------------
    */

    status: "idle",

    loading: false,

    loadingLatest: false,

    loadingHistory: false,

    loadingOptimization: false,

    loadingDispatch: false,

    loadingEnergy: false,

    loadingEconomics: false,

    loadingEmissions: false,

    loadingReliability: false,

    loadingSolver: false,

    /*
    |--------------------------------------------------------------------------
    | Error
    |--------------------------------------------------------------------------
    */

    error: null,

    /*
    |--------------------------------------------------------------------------
    | Metadata
    |--------------------------------------------------------------------------
    */

    lastUpdated: null

};

/*
|--------------------------------------------------------------------------
| Slice
|--------------------------------------------------------------------------
*/

const optimizationSlice = createSlice({

    name: "optimization",

    initialState,

    reducers: {

        /*
        |--------------------------------------------------------------------------
        | Start Optimization State
        |--------------------------------------------------------------------------
        */

        startOptimization(state) {

            state.loading = true;

            state.status = "running";

            state.progress = 0;

            state.error = null;

        },

        /*
        |--------------------------------------------------------------------------
        | Optimization Succeeded
        |--------------------------------------------------------------------------
        */

        optimizationSucceeded(
            state,
            action
        ) {

            state.loading = false;

            state.status = "completed";

            state.progress = 100;

            state.currentRun =
                action.payload;

            state.lastUpdated =
                new Date().toISOString();

        },

        /*
        |--------------------------------------------------------------------------
        | Optimization Failed
        |--------------------------------------------------------------------------
        */

        optimizationFailed(
            state,
            action
        ) {

            state.loading = false;

            state.status = "failed";

            state.error =
                action.payload;

        },

        /*
        |--------------------------------------------------------------------------
        | Set History
        |--------------------------------------------------------------------------
        */

        setOptimizationHistory(
            state,
            action
        ) {

            const payload =
                action.payload;

            if (
                Array.isArray(payload)
            ) {

                state.history =
                    payload;

                state.historyTotal =
                    payload.length;

                return;

            }

            state.history =
                payload?.rows ||
                payload?.results ||
                payload?.data ||
                payload?.history ||
                [];

            state.historyTotal =
                payload?.total ??
                payload?.count ??
                state.history.length;

        },

        /*
        |--------------------------------------------------------------------------
        | Clear Optimization
        |--------------------------------------------------------------------------
        */

        clearOptimization(state) {

            Object.assign(
                state,
                initialState
            );

        },

        /*
        |--------------------------------------------------------------------------
        | Update Progress
        |--------------------------------------------------------------------------
        */

        updateOptimizationProgress(
            state,
            action
        ) {

            const progress =
                action.payload;

            if (
                typeof progress === "number"
            ) {

                state.progress =
                    Math.min(
                        100,
                        Math.max(
                            0,
                            progress
                        )
                    );

            }

        },

        /*
        |--------------------------------------------------------------------------
        | Realtime Optimization Update
        |--------------------------------------------------------------------------
        */

        updateOptimizationRealtime(
            state,
            action
        ) {

            const payload =
                action.payload;

            if (!payload) {

                return;

            }

            if (
                payload.progress !==
                undefined
            ) {

                state.progress =
                    payload.progress;

            }

            if (
                payload.status
            ) {

                state.status =
                    payload.status;

            }

            if (
                payload.dispatch
            ) {

                state.dispatch =
                    payload.dispatch;

            }

            if (
                payload.objectives
            ) {

                state.objectives =
                    payload.objectives;

            }

            if (
                payload.solver
            ) {

                state.solver =
                    payload.solver;

            }

            if (
                payload.recommendations
            ) {

                state.recommendations =
                    payload.recommendations;

            }

            if (
                payload.currentRun
            ) {

                state.currentRun =
                    payload.currentRun;

            }

            if (
                payload.energy
            ) {

                state.energy =
                    payload.energy;

            }

            if (
                payload.economics
            ) {

                state.economics =
                    payload.economics;

            }

            if (
                payload.emissions
            ) {

                state.emissions =
                    payload.emissions;

            }

            if (
                payload.reliability
            ) {

                state.reliability =
                    payload.reliability;

            }

            state.lastUpdated =
                new Date().toISOString();

        },

        /*
        |--------------------------------------------------------------------------
        | Clear Error
        |--------------------------------------------------------------------------
        */

        clearOptimizationError(
            state
        ) {

            state.error = null;

        }

    },

    /*
    |--------------------------------------------------------------------------
    | Async Reducers
    |--------------------------------------------------------------------------
    */

    extraReducers: builder => {

        /*
        |--------------------------------------------------------------------------
        | Latest Optimization
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                fetchLatestOptimization.pending,
                state => {

                    state.loading = true;

                    state.loadingLatest = true;

                    state.error = null;

                }
            )

            .addCase(
                fetchLatestOptimization.fulfilled,
                (
                    state,
                    action
                ) => {

                    state.loading = false;

                    state.loadingLatest =
                        false;

                    const payload =
                        unwrapResponse(
                            action.payload
                        );

                    state.currentRun =
                        payload;

                    state.status =
                        payload?.status ||
                        "completed";

                    state.progress =
                        payload?.progress ??
                        100;

                    state.recommendations =
                        payload?.recommendations ||
                        [];

                    state.objectives =
                        payload?.objectives ||
                        null;

                    state.dispatch =
                        payload?.dispatch ||
                        [];

                    state.lastUpdated =
                        new Date().toISOString();

                }
            )

            .addCase(
                fetchLatestOptimization.rejected,
                (
                    state,
                    action
                ) => {

                    state.loading = false;

                    state.loadingLatest =
                        false;

                    state.error =
                        action.payload;

                }
            );

        /*
        |--------------------------------------------------------------------------
        | Optimization History
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                fetchOptimizationHistory.pending,
                state => {

                    state.loading = true;

                    state.loadingHistory =
                        true;

                    state.error = null;

                }
            )

            .addCase(
                fetchOptimizationHistory.fulfilled,
                (
                    state,
                    action
                ) => {

                    state.loading = false;

                    state.loadingHistory =
                        false;

                    const payload =
                        unwrapResponse(
                            action.payload
                        );

                    if (
                        Array.isArray(
                            payload
                        )
                    ) {

                        state.history =
                            payload;

                        state.historyTotal =
                            payload.length;

                    }

                    else {

                        state.history =
                            payload?.rows ||
                            payload?.results ||
                            payload?.history ||
                            [];

                        state.historyTotal =
                            payload?.total ??
                            payload?.count ??
                            state.history.length;

                    }

                    state.lastUpdated =
                        new Date().toISOString();

                }
            )

            .addCase(
                fetchOptimizationHistory.rejected,
                (
                    state,
                    action
                ) => {

                    state.loading = false;

                    state.loadingHistory =
                        false;

                    state.error =
                        action.payload;

                }
            );

        /*
        |--------------------------------------------------------------------------
        | Optimization Details
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                fetchOptimization.pending,
                state => {

                    state.loadingOptimization =
                        true;

                    state.error = null;

                }
            )

            .addCase(
                fetchOptimization.fulfilled,
                (
                    state,
                    action
                ) => {

                    state.loadingOptimization =
                        false;

                    const payload =
                        unwrapResponse(
                            action.payload
                        );

                    state.currentRun =
                        payload;

                    state.status =
                        payload?.status ||
                        state.status;

                    state.progress =
                        payload?.progress ??
                        state.progress;

                    state.lastUpdated =
                        new Date().toISOString();

                }
            )

            .addCase(
                fetchOptimization.rejected,
                (
                    state,
                    action
                ) => {

                    state.loadingOptimization =
                        false;

                    state.error =
                        action.payload;

                }
            );

        /*
        |--------------------------------------------------------------------------
        | Dispatch
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                fetchDispatchSchedule.pending,
                state => {

                    state.loadingDispatch =
                        true;

                    state.error = null;

                }
            )

            .addCase(
                fetchDispatchSchedule.fulfilled,
                (
                    state,
                    action
                ) => {

                    state.loadingDispatch =
                        false;

                    const payload =
                        unwrapResponse(
                            action.payload
                        );

                    state.dispatch =
                        Array.isArray(
                            payload
                        )
                            ? payload
                            : (
                                payload?.dispatch ||
                                payload?.schedule ||
                                payload?.rows ||
                                payload?.data ||
                                []
                            );

                    state.lastUpdated =
                        new Date().toISOString();

                }
            )

            .addCase(
                fetchDispatchSchedule.rejected,
                (
                    state,
                    action
                ) => {

                    state.loadingDispatch =
                        false;

                    state.error =
                        action.payload;

                }
            );

        /*
        |--------------------------------------------------------------------------
        | Energy
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                fetchEnergySummary.pending,
                state => {

                    state.loadingEnergy =
                        true;

                    state.error = null;

                }
            )

            .addCase(
                fetchEnergySummary.fulfilled,
                (
                    state,
                    action
                ) => {

                    state.loadingEnergy =
                        false;

                    state.energy =
                        unwrapResponse(
                            action.payload
                        );

                }
            )

            .addCase(
                fetchEnergySummary.rejected,
                (
                    state,
                    action
                ) => {

                    state.loadingEnergy =
                        false;

                    state.error =
                        action.payload;

                }
            );

        /*
        |--------------------------------------------------------------------------
        | Economics
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                fetchEconomics.pending,
                state => {

                    state.loadingEconomics =
                        true;

                    state.error = null;

                }
            )

            .addCase(
                fetchEconomics.fulfilled,
                (
                    state,
                    action
                ) => {

                    state.loadingEconomics =
                        false;

                    state.economics =
                        unwrapResponse(
                            action.payload
                        );

                }
            )

            .addCase(
                fetchEconomics.rejected,
                (
                    state,
                    action
                ) => {

                    state.loadingEconomics =
                        false;

                    state.error =
                        action.payload;

                }
            );

        /*
        |--------------------------------------------------------------------------
        | Emissions
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                fetchEmissions.pending,
                state => {

                    state.loadingEmissions =
                        true;

                    state.error = null;

                }
            )

            .addCase(
                fetchEmissions.fulfilled,
                (
                    state,
                    action
                ) => {

                    state.loadingEmissions =
                        false;

                    state.emissions =
                        unwrapResponse(
                            action.payload
                        );

                }
            )

            .addCase(
                fetchEmissions.rejected,
                (
                    state,
                    action
                ) => {

                    state.loadingEmissions =
                        false;

                    state.error =
                        action.payload;

                }
            );

        /*
        |--------------------------------------------------------------------------
        | Reliability
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                fetchReliability.pending,
                state => {

                    state.loadingReliability =
                        true;

                    state.error = null;

                }
            )

            .addCase(
                fetchReliability.fulfilled,
                (
                    state,
                    action
                ) => {

                    state.loadingReliability =
                        false;

                    state.reliability =
                        unwrapResponse(
                            action.payload
                        );

                }
            )

            .addCase(
                fetchReliability.rejected,
                (
                    state,
                    action
                ) => {

                    state.loadingReliability =
                        false;

                    state.error =
                        action.payload;

                }
            );

        /*
        |--------------------------------------------------------------------------
        | Solver
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                fetchSolver.pending,
                state => {

                    state.loadingSolver =
                        true;

                    state.error = null;

                }
            )

            .addCase(
                fetchSolver.fulfilled,
                (
                    state,
                    action
                ) => {

                    state.loadingSolver =
                        false;

                    state.solver =
                        unwrapResponse(
                            action.payload
                        );

                }
            )

            .addCase(
                fetchSolver.rejected,
                (
                    state,
                    action
                ) => {

                    state.loadingSolver =
                        false;

                    state.error =
                        action.payload;

                }
            );

    }

});

/*
|--------------------------------------------------------------------------
| Synchronous Actions
|--------------------------------------------------------------------------
*/

export const {

    startOptimization,

    optimizationSucceeded,

    optimizationFailed,

    setOptimizationHistory,

    clearOptimization,

    updateOptimizationProgress,

    updateOptimizationRealtime,

    clearOptimizationError

} = optimizationSlice.actions;

/*
|--------------------------------------------------------------------------
| Reducer
|--------------------------------------------------------------------------
*/

export default optimizationSlice.reducer;