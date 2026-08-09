import { useCallback } from "react";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    fetchActiveAlarms,
    fetchAlarmHistory,
    fetchAlarmStatistics,
    fetchAlarmSummary,
    fetchAlarm,

    acknowledgeAlarm as acknowledgeAlarmAction,
    resolveAlarm as resolveAlarmAction,
    deleteAlarm as deleteAlarmAction,

    setAlarmFilters,
    setPaginationModel,

    clearSelectedAlarm,
    clearAlarmError,
    clearAlarms

} from "../../../store/slices/alarmSlice.js";

/*
|--------------------------------------------------------------------------
| useAlarm
|--------------------------------------------------------------------------
|
| Central hook for Alarm Management.
|
| Components should NEVER dispatch Redux actions directly.
|
|--------------------------------------------------------------------------
*/

export default function useAlarm() {

    const dispatch = useDispatch();

    /*
    |--------------------------------------------------------------------------
    | Redux State
    |--------------------------------------------------------------------------
    */

    const {

        active,
        history,

        total,

        statistics,
        summary,

        severity,
        trends,

        selectedAlarm,

        filters,
        paginationModel,

        loading,
        loadingActive,
        loadingHistory,
        loadingStatistics,
        loadingSummary,
        loadingAlarm,

        processing,

        error,
        lastUpdated

    } = useSelector(
        state => state.alarms
    );

    /*
    |--------------------------------------------------------------------------
    | Derived Compatibility Values
    |--------------------------------------------------------------------------
    */

    const activeSummary =
        summary?.active ||
        summary?.activeSummary ||
        summary;

    const alarms = history;

    /*
    |--------------------------------------------------------------------------
    | Load Active Alarms
    |--------------------------------------------------------------------------
    */

    const loadActiveAlarms = useCallback(

        (params = {}) => {

            return dispatch(
                fetchActiveAlarms(params)
            );

        },

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Load Alarm History
    |--------------------------------------------------------------------------
    */

    const loadAlarmHistory = useCallback(

        (params = {}) => {

            return dispatch(
                fetchAlarmHistory(params)
            );

        },

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Load Statistics
    |--------------------------------------------------------------------------
    */

    const loadAlarmStatistics = useCallback(

        (params = {}) => {

            return dispatch(
                fetchAlarmStatistics(params)
            );

        },

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Load Summary
    |--------------------------------------------------------------------------
    */

    const loadAlarmSummary = useCallback(

        (params = {}) => {

            return dispatch(
                fetchAlarmSummary(params)
            );

        },

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Load Alarm
    |--------------------------------------------------------------------------
    */

    const loadAlarm = useCallback(

        alarmId => {

            if (!alarmId) {
                return Promise.reject(
                    new Error(
                        "Alarm ID is required."
                    )
                );
            }

            return dispatch(
                fetchAlarm(alarmId)
            );

        },

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Acknowledge Alarm
    |--------------------------------------------------------------------------
    */

    const acknowledge = useCallback(

        alarmId => {

            return dispatch(
                acknowledgeAlarmAction(
                    alarmId
                )
            );

        },

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Resolve Alarm
    |--------------------------------------------------------------------------
    */

    const resolve = useCallback(

        (
            alarmId,
            payload = {}
        ) => {

            return dispatch(

                resolveAlarmAction({

                    alarmId,

                    payload

                })

            );

        },

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Delete Alarm
    |--------------------------------------------------------------------------
    */

    const removeAlarm = useCallback(

        alarmId => {

            return dispatch(
                deleteAlarmAction(
                    alarmId
                )
            );

        },

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Filters
    |--------------------------------------------------------------------------
    */

    const updateFilters = useCallback(

        newFilters => {

            dispatch(
                setAlarmFilters(
                    newFilters
                )
            );

        },

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Pagination
    |--------------------------------------------------------------------------
    */

    const updatePagination = useCallback(

        model => {

            dispatch(
                setPaginationModel(
                    model
                )
            );

        },

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Refresh
    |--------------------------------------------------------------------------
    */

    const refresh = useCallback(

        async () => {

            const params = {

                ...filters,

                page:
                    paginationModel.page + 1,

                limit:
                    paginationModel.pageSize

            };

            await Promise.all([

                dispatch(
                    fetchActiveAlarms(
                        params
                    )
                ),

                dispatch(
                    fetchAlarmHistory(
                        params
                    )
                ),

                dispatch(
                    fetchAlarmStatistics(
                        filters
                    )
                ),

                dispatch(
                    fetchAlarmSummary(
                        filters
                    )
                )

            ]);

        },

        [
            dispatch,
            filters,
            paginationModel
        ]

    );

    /*
    |--------------------------------------------------------------------------
    | Public API
    |--------------------------------------------------------------------------
    */

    return {

        /*
        | Data
        */

        active,

        activeSummary,

        history,

        alarms,

        total,

        statistics,

        summary,

        severity,

        trends,

        selectedAlarm,

        /*
        | Filters
        */

        filters,

        updateFilters,

        /*
        | Pagination
        */

        paginationModel,

        updatePagination,

        /*
        | Loading
        */

        loading,

        loadingActive,

        loadingHistory,

        loadingStatistics,

        loadingSummary,

        loadingAlarm,

        processing,

        /*
        | Status
        */

        error,

        lastUpdated,

        /*
        | Loaders
        */

        loadActiveAlarms,

        loadAlarmHistory,

        loadAlarmStatistics,

        loadAlarmSummary,

        loadAlarm,

        /*
        | Compatibility aliases
        */

        viewAlarm: loadAlarm,

        acknowledgeAlarm:
            acknowledge,

        resolveAlarm:
            resolve,

        deleteAlarm:
            removeAlarm,

        /*
        | Refresh
        */

        refresh,

        refreshing:
            processing,

        /*
        | State controls
        */

        clearSelectedAlarm: () =>
            dispatch(
                clearSelectedAlarm()
            ),

        clearError: () =>
            dispatch(
                clearAlarmError()
            ),

        clearAll: () =>
            dispatch(
                clearAlarms()
            )

    };

}