import {
    useCallback
} from "react";

import {
    useDispatch,
    useSelector
} from "react-redux";

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
} from "../api/optimizationApi.js";

import {
    startOptimization,
    optimizationSucceeded,
    optimizationFailed,
    setOptimizationHistory,
    clearOptimization,
    updateOptimizationRealtime
} from "../../../store/slices/optimizationSlice.js";

/*
|--------------------------------------------------------------------------
| Optimization Hook
|--------------------------------------------------------------------------
|
| Central hook for Optimization Management.
|
| Components should NEVER:
|
| - dispatch Redux optimization actions directly
| - call optimization API functions directly
|
| This hook provides the complete public interface between:
|
| Components
|      ↓
| useOptimization
|      ↓
| Redux + Optimization API
|
|--------------------------------------------------------------------------
*/

export default function useOptimization() {

    const dispatch = useDispatch();

    /*
    |--------------------------------------------------------------------------
    | Redux State
    |--------------------------------------------------------------------------
    */

    const {

        currentRun,

        history,

        recommendations,

        progress,

        solver,

        objectives,

        dispatch: dispatchSchedule,

        status,

        loading,

        error,

        lastUpdated

    } = useSelector(

        state => state.optimization

    );

    /*
    |--------------------------------------------------------------------------
    | Get Latest Optimization
    |--------------------------------------------------------------------------
    */

    const loadLatestOptimization = useCallback(

        async siteId => {

            if (!siteId) {

                const error =
                    new Error(
                        "siteId is required"
                    );

                dispatch(
                    optimizationFailed(
                        error.message
                    )
                );

                return null;

            }

            try {

                const result =
                    await getLatestOptimization(
                        siteId
                    );

                dispatch(
                    optimizationSucceeded(
                        result
                    )
                );

                return result;

            }

            catch (error) {

                const message =
                    error.response?.data?.message ||
                    error.response?.data ||
                    error.message ||
                    "Failed to load latest optimization.";

                dispatch(
                    optimizationFailed(
                        message
                    )
                );

                throw error;

            }

        },

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Load Optimization History
    |--------------------------------------------------------------------------
    */

    const loadOptimizationHistory = useCallback(

        async (params = {}) => {

            try {

                const result =
                    await getOptimizationHistory(
                        params
                    );

                const historyData =

                    Array.isArray(result)

                        ? result

                        : result?.rows ||

                          result?.optimizations ||

                          result?.data ||

                          [];

                dispatch(
                    setOptimizationHistory(
                        historyData
                    )
                );

                return result;

            }

            catch (error) {

                const message =
                    error.response?.data?.message ||
                    error.response?.data ||
                    error.message ||
                    "Failed to load optimization history.";

                dispatch(
                    optimizationFailed(
                        message
                    )
                );

                throw error;

            }

        },

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Load Optimization By ID
    |--------------------------------------------------------------------------
    */

    const loadOptimization = useCallback(

        async optimizationId => {

            if (!optimizationId) {

                const error =
                    new Error(
                        "optimizationId is required"
                    );

                dispatch(
                    optimizationFailed(
                        error.message
                    )
                );

                return null;

            }

            try {

                const result =
                    await getOptimization(
                        optimizationId
                    );

                dispatch(
                    optimizationSucceeded(
                        result
                    )
                );

                return result;

            }

            catch (error) {

                const message =
                    error.response?.data?.message ||
                    error.response?.data ||
                    error.message ||
                    "Failed to load optimization.";

                dispatch(
                    optimizationFailed(
                        message
                    )
                );

                throw error;

            }

        },

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Load Dispatch Schedule
    |--------------------------------------------------------------------------
    */

    const loadDispatchSchedule = useCallback(

        async optimizationId => {

            if (!optimizationId) {

                throw new Error(
                    "optimizationId is required"
                );

            }

            try {

                const result =
                    await getDispatchSchedule(
                        optimizationId
                    );

                dispatch(

                    updateOptimizationRealtime({

                        dispatch:
                            Array.isArray(result)

                                ? result

                                : result?.dispatch ||

                                  result?.data ||

                                  []

                    })

                );

                return result;

            }

            catch (error) {

                const message =
                    error.response?.data?.message ||
                    error.response?.data ||
                    error.message ||
                    "Failed to load dispatch schedule.";

                dispatch(
                    optimizationFailed(
                        message
                    )
                );

                throw error;

            }

        },

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Load Energy Summary
    |--------------------------------------------------------------------------
    */

    const loadEnergySummary = useCallback(

        async optimizationId => {

            if (!optimizationId) {

                throw new Error(
                    "optimizationId is required"
                );

            }

            try {

                return await getEnergySummary(
                    optimizationId
                );

            }

            catch (error) {

                const message =
                    error.response?.data?.message ||
                    error.response?.data ||
                    error.message ||
                    "Failed to load energy summary.";

                dispatch(
                    optimizationFailed(
                        message
                    )
                );

                throw error;

            }

        },

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Load Economics
    |--------------------------------------------------------------------------
    */

    const loadEconomics = useCallback(

        async optimizationId => {

            if (!optimizationId) {

                throw new Error(
                    "optimizationId is required"
                );

            }

            try {

                return await getEconomics(
                    optimizationId
                );

            }

            catch (error) {

                const message =
                    error.response?.data?.message ||
                    error.response?.data ||
                    error.message ||
                    "Failed to load optimization economics.";

                dispatch(
                    optimizationFailed(
                        message
                    )
                );

                throw error;

            }

        },

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Load Emissions
    |--------------------------------------------------------------------------
    */

    const loadEmissions = useCallback(

        async optimizationId => {

            if (!optimizationId) {

                throw new Error(
                    "optimizationId is required"
                );

            }

            try {

                return await getEmissions(
                    optimizationId
                );

            }

            catch (error) {

                const message =
                    error.response?.data?.message ||
                    error.response?.data ||
                    error.message ||
                    "Failed to load emissions.";

                dispatch(
                    optimizationFailed(
                        message
                    )
                );

                throw error;

            }

        },

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Load Reliability Metrics
    |--------------------------------------------------------------------------
    */

    const loadReliability = useCallback(

        async optimizationId => {

            if (!optimizationId) {

                throw new Error(
                    "optimizationId is required"
                );

            }

            try {

                return await getReliability(
                    optimizationId
                );

            }

            catch (error) {

                const message =
                    error.response?.data?.message ||
                    error.response?.data ||
                    error.message ||
                    "Failed to load reliability metrics.";

                dispatch(
                    optimizationFailed(
                        message
                    )
                );

                throw error;

            }

        },

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Load Solver Information
    |--------------------------------------------------------------------------
    */

    const loadSolver = useCallback(

        async optimizationId => {

            if (!optimizationId) {

                throw new Error(
                    "optimizationId is required"
                );

            }

            try {

                const result =
                    await getSolver(
                        optimizationId
                    );

                dispatch(

                    updateOptimizationRealtime({

                        solver: result

                    })

                );

                return result;

            }

            catch (error) {

                const message =
                    error.response?.data?.message ||
                    error.response?.data ||
                    error.message ||
                    "Failed to load solver information.";

                dispatch(
                    optimizationFailed(
                        message
                    )
                );

                throw error;

            }

        },

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Start Optimization State
    |--------------------------------------------------------------------------
    |
    | This only changes Redux state to "running".
    |
    | It does NOT call a backend optimization endpoint because
    | optimizationApi.js currently does not expose one.
    |
    */

    const start = useCallback(

        () => {

            dispatch(
                startOptimization()
            );

        },

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Mark Optimization Successful
    |--------------------------------------------------------------------------
    */

    const succeed = useCallback(

        result => {

            dispatch(

                optimizationSucceeded(
                    result
                )

            );

            return result;

        },

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Mark Optimization Failed
    |--------------------------------------------------------------------------
    */

    const fail = useCallback(

        error => {

            const message =

                error?.response?.data?.message ||

                error?.response?.data ||

                error?.message ||

                error ||

                "Optimization failed.";

            dispatch(

                optimizationFailed(
                    message
                )

            );

            return message;

        },

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Update Optimization Realtime
    |--------------------------------------------------------------------------
    |
    | Useful for:
    |
    | Socket.IO
    | WebSocket
    | Server-Sent Events
    | Background optimization workers
    |
    */

    const updateRealtime = useCallback(

        payload => {

            if (!payload) {

                return;

            }

            dispatch(

                updateOptimizationRealtime(
                    payload
                )

            );

        },

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Clear Optimization
    |--------------------------------------------------------------------------
    */

    const clear = useCallback(

        () => {

            dispatch(
                clearOptimization()
            );

        },

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Public Hook API
    |--------------------------------------------------------------------------
    */

    return {

        /*
        |----------------------------------------------------------------------
        | State
        |----------------------------------------------------------------------
        */

        currentRun,

        history,

        recommendations,

        progress,

        solver,

        objectives,

        dispatchSchedule,

        status,

        loading,

        error,

        lastUpdated,

        /*
        |----------------------------------------------------------------------
        | Loaders
        |----------------------------------------------------------------------
        */

        loadLatestOptimization,

        loadOptimizationHistory,

        loadOptimization,

        loadDispatchSchedule,

        loadEnergySummary,

        loadEconomics,

        loadEmissions,

        loadReliability,

        loadSolver,

        /*
        |----------------------------------------------------------------------
        | Lifecycle
        |----------------------------------------------------------------------
        */

        startOptimization:
            start,

        optimizationSucceeded:
            succeed,

        optimizationFailed:
            fail,

        /*
        |----------------------------------------------------------------------
        | Realtime
        |----------------------------------------------------------------------
        */

        updateOptimizationRealtime:
            updateRealtime,

        /*
        |----------------------------------------------------------------------
        | Reset
        |----------------------------------------------------------------------
        */

        clearOptimization:
            clear

    };

}