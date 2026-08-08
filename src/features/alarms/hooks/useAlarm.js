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

        statistics,

        summary,

        selectedAlarm,

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
    | Active Alarms
    |--------------------------------------------------------------------------
    */

    const loadActiveAlarms = useCallback(

        (params = {}) => {

            return dispatch(

                fetchActiveAlarms(params)

            );

        },

        [

            dispatch

        ]

    );

    /*
    |--------------------------------------------------------------------------
    | Alarm History
    |--------------------------------------------------------------------------
    */

    const loadAlarmHistory = useCallback(

        (params = {}) => {

            return dispatch(

                fetchAlarmHistory(params)

            );

        },

        [

            dispatch

        ]

    );

    /*
    |--------------------------------------------------------------------------
    | Alarm Statistics
    |--------------------------------------------------------------------------
    */

    const loadAlarmStatistics = useCallback(

        (params = {}) => {

            return dispatch(

                fetchAlarmStatistics(params)

            );

        },

        [

            dispatch

        ]

    );

    /*
    |--------------------------------------------------------------------------
    | Alarm Summary
    |--------------------------------------------------------------------------
    */

    const loadAlarmSummary = useCallback(

        (params = {}) => {

            return dispatch(

                fetchAlarmSummary(params)

            );

        },

        [

            dispatch

        ]

    );

    /*
    |--------------------------------------------------------------------------
    | Alarm Details
    |--------------------------------------------------------------------------
    */

    const loadAlarm = useCallback(

        alarmId => {

            return dispatch(

                fetchAlarm(alarmId)

            );

        },

        [

            dispatch

        ]

    );

    /*
    |--------------------------------------------------------------------------
    | Acknowledge
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

        [

            dispatch

        ]

    );

    /*
    |--------------------------------------------------------------------------
    | Resolve
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

        [

            dispatch

        ]

    );

    /*
    |--------------------------------------------------------------------------
    | Delete
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

        [

            dispatch

        ]

    );

    /*
    |--------------------------------------------------------------------------
    | Clear Selected Alarm
    |--------------------------------------------------------------------------
    */

    const clearSelection = useCallback(

        () => {

            dispatch(

                clearSelectedAlarm()

            );

        },

        [

            dispatch

        ]

    );

    /*
    |--------------------------------------------------------------------------
    | Clear Error
    |--------------------------------------------------------------------------
    */

    const clearError = useCallback(

        () => {

            dispatch(

                clearAlarmError()

            );

        },

        [

            dispatch

        ]

    );

    /*
    |--------------------------------------------------------------------------
    | Clear All Alarm State
    |--------------------------------------------------------------------------
    */

    const clearAll = useCallback(

        () => {

            dispatch(

                clearAlarms()

            );

        },

        [

            dispatch

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

        history,

        statistics,

        summary,

        selectedAlarm,

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
        | Alarm Actions
        */

        acknowledge,

        resolve,

        deleteAlarm: removeAlarm,

        /*
        | State Controls
        */

        clearSelection,

        clearError,

        clearAll

    };

}