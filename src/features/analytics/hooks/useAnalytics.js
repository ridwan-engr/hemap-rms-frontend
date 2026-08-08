import {
    useCallback,
    useEffect
} from "react";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    fetchDashboardAnalytics,
    fetchEnergyAnalytics,
    fetchBatteryAnalytics,
    fetchSolarAnalytics,
    fetchGeneratorAnalytics,
    fetchGridAnalytics,
    fetchReliabilityAnalytics,
    setAnalyticsFilters
} from "../../../store/slices/analyticsSlice.js";

/*
|--------------------------------------------------------------------------
| Analytics Hook
|--------------------------------------------------------------------------
|
| Central hook used by Analytics components.
|
| Components should NEVER dispatch Redux actions directly.
|
| Backend contract:
|
| GET /analytics/dashboard
| GET /analytics/energy
| GET /analytics/battery
| GET /analytics/solar
| GET /analytics/generator
| GET /analytics/grid
| GET /analytics/reliability
|
|--------------------------------------------------------------------------
*/

export default function useAnalytics(
    initialFilters = {}
) {

    const dispatch = useDispatch();

    /*
    |--------------------------------------------------------------------------
    | Redux State
    |--------------------------------------------------------------------------
    */

    const dashboard = useSelector(
        state => state.analytics.dashboard
    );

    const energy = useSelector(
        state => state.analytics.energy
    );

    const battery = useSelector(
        state => state.analytics.battery
    );

    const solar = useSelector(
        state => state.analytics.solar
    );

    const generator = useSelector(
        state => state.analytics.generator
    );

    const grid = useSelector(
        state => state.analytics.grid
    );

    const reliability = useSelector(
        state => state.analytics.reliability
    );

    const filters = useSelector(
        state => state.analytics.filters
    );

    const loading = useSelector(
        state => state.analytics.loading
    );

    const error = useSelector(
        state => state.analytics.error
    );

    const lastUpdated = useSelector(
        state => state.analytics.lastUpdated
    );

    /*
    |--------------------------------------------------------------------------
    | Load Dashboard Analytics
    |--------------------------------------------------------------------------
    */

    const loadDashboard = useCallback(
        (
            query = filters
        ) => {

            return dispatch(
                fetchDashboardAnalytics(query)
            );

        },
        [
            dispatch,
            filters
        ]
    );

    /*
    |--------------------------------------------------------------------------
    | Load Energy Analytics
    |--------------------------------------------------------------------------
    */

    const loadEnergy = useCallback(
        (
            query = filters
        ) => {

            return dispatch(
                fetchEnergyAnalytics(query)
            );

        },
        [
            dispatch,
            filters
        ]
    );

    /*
    |--------------------------------------------------------------------------
    | Load Battery Analytics
    |--------------------------------------------------------------------------
    */

    const loadBattery = useCallback(
        (
            query = filters
        ) => {

            return dispatch(
                fetchBatteryAnalytics(query)
            );

        },
        [
            dispatch,
            filters
        ]
    );

    /*
    |--------------------------------------------------------------------------
    | Load Solar Analytics
    |--------------------------------------------------------------------------
    */

    const loadSolar = useCallback(
        (
            query = filters
        ) => {

            return dispatch(
                fetchSolarAnalytics(query)
            );

        },
        [
            dispatch,
            filters
        ]
    );

    /*
    |--------------------------------------------------------------------------
    | Load Generator Analytics
    |--------------------------------------------------------------------------
    */

    const loadGenerator = useCallback(
        (
            query = filters
        ) => {

            return dispatch(
                fetchGeneratorAnalytics(query)
            );

        },
        [
            dispatch,
            filters
        ]
    );

    /*
    |--------------------------------------------------------------------------
    | Load Grid Analytics
    |--------------------------------------------------------------------------
    */

    const loadGrid = useCallback(
        (
            query = filters
        ) => {

            return dispatch(
                fetchGridAnalytics(query)
            );

        },
        [
            dispatch,
            filters
        ]
    );

    /*
    |--------------------------------------------------------------------------
    | Load Reliability Analytics
    |--------------------------------------------------------------------------
    */

    const loadReliability = useCallback(
        (
            query = filters
        ) => {

            return dispatch(
                fetchReliabilityAnalytics(query)
            );

        },
        [
            dispatch,
            filters
        ]
    );

    /*
    |--------------------------------------------------------------------------
    | Load All Analytics
    |--------------------------------------------------------------------------
    */

    const reload = useCallback(
        (
            query = filters
        ) => {

            return Promise.all([

                dispatch(
                    fetchDashboardAnalytics(query)
                ),

                dispatch(
                    fetchEnergyAnalytics(query)
                ),

                dispatch(
                    fetchBatteryAnalytics(query)
                ),

                dispatch(
                    fetchSolarAnalytics(query)
                ),

                dispatch(
                    fetchGeneratorAnalytics(query)
                ),

                dispatch(
                    fetchGridAnalytics(query)
                ),

                dispatch(
                    fetchReliabilityAnalytics(query)
                )

            ]);

        },
        [
            dispatch,
            filters
        ]
    );

    /*
    |--------------------------------------------------------------------------
    | Filters
    |--------------------------------------------------------------------------
    */

    const updateFilters = useCallback(
        nextFilters => {

            dispatch(
                setAnalyticsFilters(
                    nextFilters || {}
                )
            );

        },
        [
            dispatch
        ]
    );

    /*
    |--------------------------------------------------------------------------
    | Initial Filters
    |--------------------------------------------------------------------------
    */

    useEffect(
        () => {

            if (
                initialFilters &&
                Object.keys(initialFilters).length > 0
            ) {

                dispatch(
                    setAnalyticsFilters(
                        initialFilters
                    )
                );

            }

        },
        [
            dispatch,
            initialFilters
        ]
    );

    /*
    |--------------------------------------------------------------------------
    | Initial Load
    |--------------------------------------------------------------------------
    */

    useEffect(
        () => {

            reload();

        },
        [
            reload
        ]
    );

    /*
    |--------------------------------------------------------------------------
    | Public API
    |--------------------------------------------------------------------------
    */

    return {

        /*
        |--------------------------------------------------------------------------
        | Data
        |--------------------------------------------------------------------------
        */

        dashboard,

        energy,

        battery,

        solar,

        generator,

        grid,

        reliability,

        /*
        |--------------------------------------------------------------------------
        | Filters
        |--------------------------------------------------------------------------
        */

        filters,

        /*
        |--------------------------------------------------------------------------
        | Status
        |--------------------------------------------------------------------------
        */

        loading,

        error,

        lastUpdated,

        /*
        |--------------------------------------------------------------------------
        | Actions
        |--------------------------------------------------------------------------
        */

        reload,

        loadDashboard,

        loadEnergy,

        loadBattery,

        loadSolar,

        loadGenerator,

        loadGrid,

        loadReliability,

        updateFilters

    };

}