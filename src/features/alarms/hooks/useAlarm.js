import { useCallback, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {

    fetchAlarms,

    fetchActiveSummary,

    fetchAlarmStatistics,

    fetchSeverityDistribution,

    fetchAlarmTrends,

    fetchAlarmDetails,

    acknowledgeAlarm as acknowledgeAlarmAction,

    resolveAlarm as resolveAlarmAction,

    deleteAlarm as deleteAlarmAction,

    setFilters,

    setPaginationModel

} from "../../../store/slices/alarmSlice";

/*
|--------------------------------------------------------------------------
| Alarm Hook
|--------------------------------------------------------------------------
|
| Central hook used by every Alarm component.
| Components must NEVER dispatch Redux actions directly.
|
*/

export default function useAlarm(initialFilters = {}) {

    const dispatch = useDispatch();

    /*
    |--------------------------------------------------------------------------
    | Redux State
    |--------------------------------------------------------------------------
    */

    const alarms = useSelector(

        state => state.alarms.alarms

    );

    const total = useSelector(

        state => state.alarms.total

    );

    const activeSummary = useSelector(

        state => state.alarms.activeSummary

    );

    const statistics = useSelector(

        state => state.alarms.statistics

    );

    const severity = useSelector(

        state => state.alarms.severity

    );

    const trends = useSelector(

        state => state.alarms.trends

    );

    const selectedAlarm = useSelector(

        state => state.alarms.selectedAlarm

    );

    const filters = useSelector(

        state => state.alarms.filters

    );

    const paginationModel = useSelector(

        state => state.alarms.paginationModel

    );

    const loading = useSelector(

        state => state.alarms.loading

    );

    const error = useSelector(

        state => state.alarms.error

    );

    /*
    |--------------------------------------------------------------------------
    | Loaders
    |--------------------------------------------------------------------------
    */

    const reload = useCallback(

        (

            query = filters

        ) => {

            dispatch(

                fetchAlarms({

                    ...query,

                    page:

                        paginationModel.page + 1,

                    limit:

                        paginationModel.pageSize

                })

            );

        },

        [

            dispatch,

            filters,

            paginationModel

        ]

    );

    const loadSummary = useCallback(

        () => {

            dispatch(

                fetchActiveSummary(filters)

            );

        },

        [

            dispatch,

            filters

        ]

    );

    const loadStatistics = useCallback(

        () => {

            dispatch(

                fetchAlarmStatistics(filters)

            );

        },

        [

            dispatch,

            filters

        ]

    );

    const loadSeverity = useCallback(

        () => {

            dispatch(

                fetchSeverityDistribution(filters)

            );

        },

        [

            dispatch,

            filters

        ]

    );

    const loadTrends = useCallback(

        () => {

            dispatch(

                fetchAlarmTrends(filters)

            );

        },

        [

            dispatch,

            filters

        ]

    );

    /*
    |--------------------------------------------------------------------------
    | Actions
    |--------------------------------------------------------------------------
    */

    const viewAlarm = useCallback(

        id => {

            dispatch(

                fetchAlarmDetails(id)

            );

        },

        [dispatch]

    );

    const acknowledgeAlarm = useCallback(

        async id => {

            await dispatch(

                acknowledgeAlarmAction(id)

            );

            reload();

            loadSummary();

        },

        [

            dispatch,

            reload,

            loadSummary

        ]

    );

    const resolveAlarm = useCallback(

        async (

            id,

            payload

        ) => {

            await dispatch(

                resolveAlarmAction({

                    id,

                    payload

                })

            );

            reload();

            loadSummary();

        },

        [

            dispatch,

            reload,

            loadSummary

        ]

    );

    const deleteAlarm = useCallback(

        async id => {

            await dispatch(

                deleteAlarmAction(id)

            );

            reload();

        },

        [

            dispatch,

            reload

        ]

    );

    const updateFilters = useCallback(

        nextFilters => {

            dispatch(

                setFilters(nextFilters)

            );

        },

        [dispatch]

    );

    const updatePagination = useCallback(

        model => {

            dispatch(

                setPaginationModel(model)

            );

        },

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Initial Load
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (

            Object.keys(initialFilters)

                .length > 0

        ) {

            dispatch(

                setFilters(initialFilters)

            );

        }

    }, [

        dispatch,

        initialFilters

    ]);

    useEffect(() => {

        reload();

        loadSummary();

        loadStatistics();

        loadSeverity();

        loadTrends();

    }, [

        reload,

        loadSummary,

        loadStatistics,

        loadSeverity,

        loadTrends

    ]);

    /*
    |--------------------------------------------------------------------------
    | Exposed API
    |--------------------------------------------------------------------------
    */

    return {

        alarms,

        total,

        activeSummary,

        statistics,

        severity,

        trends,

        selectedAlarm,

        filters,

        paginationModel,

        loading,

        error,

        reload,

        viewAlarm,

        acknowledgeAlarm,

        resolveAlarm,

        deleteAlarm,

        updateFilters,

        updatePagination

    };

}