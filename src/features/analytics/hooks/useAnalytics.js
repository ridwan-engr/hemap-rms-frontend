import {
    useCallback,
    useEffect,
    useMemo,
    useRef
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
| Components should NEVER call the Analytics API directly.
| Components should NEVER dispatch Analytics actions directly.
|
|--------------------------------------------------------------------------
*/

export default function useAnalytics(initialFilters = {}) {

    const dispatch = useDispatch();

    /*
    |--------------------------------------------------------------------------
    | Initialisation Guard
    |--------------------------------------------------------------------------
    */

    const initializedRef = useRef(false);


    /*
    |--------------------------------------------------------------------------
    | Redux State
    |--------------------------------------------------------------------------
    */

    const {
        dashboard,
        energy,
        battery,
        solar,
        generator,
        grid,
        reliability,
        filters,
        loading: loadingState,
        error: errorState,
        lastUpdated: lastUpdatedState
    } = useSelector(
        state => state.analytics
    );


    /*
    |--------------------------------------------------------------------------
    | Global Loading State
    |--------------------------------------------------------------------------
    |
    | Redux stores loading state independently for each endpoint.
    |
    | Global loading becomes true when ANY analytics request is running.
    |
    */

    const loading = useMemo(
        () =>
            Object.values(
                loadingState || {}
            ).some(Boolean),
        [
            loadingState
        ]
    );


    /*
    |--------------------------------------------------------------------------
    | Global Error
    |--------------------------------------------------------------------------
    */

    const error = useMemo(
        () => {

            const errors =
                Object.values(
                    errorState || {}
                );

            return (
                errors.find(
                    value => Boolean(value)
                ) || null
            );

        },
        [
            errorState
        ]
    );


    /*
    |--------------------------------------------------------------------------
    | Latest Updated Timestamp
    |--------------------------------------------------------------------------
    */

    const lastUpdated = useMemo(
        () => {

            const timestamps =
                Object.values(
                    lastUpdatedState || {}
                )
                    .filter(Boolean)
                    .map(
                        timestamp =>
                            new Date(
                                timestamp
                            ).getTime()
                    )
                    .filter(
                        timestamp =>
                            !Number.isNaN(
                                timestamp
                            )
                    );

            if (!timestamps.length) {
                return null;
            }

            return new Date(
                Math.max(
                    ...timestamps
                )
            ).toISOString();

        },
        [
            lastUpdatedState
        ]
    );


    /*
    |--------------------------------------------------------------------------
    | Load Dashboard Analytics
    |--------------------------------------------------------------------------
    */

    const loadDashboard = useCallback(
        (query = filters) => {

            return dispatch(
                fetchDashboardAnalytics(
                    query || {}
                )
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
        (query = filters) => {

            return dispatch(
                fetchEnergyAnalytics(
                    query || {}
                )
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
        (query = filters) => {

            return dispatch(
                fetchBatteryAnalytics(
                    query || {}
                )
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
        (query = filters) => {

            return dispatch(
                fetchSolarAnalytics(
                    query || {}
                )
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
        (query = filters) => {

            return dispatch(
                fetchGeneratorAnalytics(
                    query || {}
                )
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
        (query = filters) => {

            return dispatch(
                fetchGridAnalytics(
                    query || {}
                )
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
        (query = filters) => {

            return dispatch(
                fetchReliabilityAnalytics(
                    query || {}
                )
            );

        },
        [
            dispatch,
            filters
        ]
    );


    /*
    |--------------------------------------------------------------------------
    | Reload All Analytics
    |--------------------------------------------------------------------------
    */

    const reload = useCallback(
        (query = filters) => {

            const requestFilters =
                query || {};

            return Promise.all([

                dispatch(
                    fetchDashboardAnalytics(
                        requestFilters
                    )
                ),

                dispatch(
                    fetchEnergyAnalytics(
                        requestFilters
                    )
                ),

                dispatch(
                    fetchBatteryAnalytics(
                        requestFilters
                    )
                ),

                dispatch(
                    fetchSolarAnalytics(
                        requestFilters
                    )
                ),

                dispatch(
                    fetchGeneratorAnalytics(
                        requestFilters
                    )
                ),

                dispatch(
                    fetchGridAnalytics(
                        requestFilters
                    )
                ),

                dispatch(
                    fetchReliabilityAnalytics(
                        requestFilters
                    )
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
    | Update Filters
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
    | Initial Filters + Initial Load
    |--------------------------------------------------------------------------
    |
    | IMPORTANT:
    |
    | Do NOT call reload() here.
    |
    | The initial load is intentionally independent of the reload callback
    | so Redux filter updates cannot cause the initialization effect to
    | become coupled to the request callback.
    |
    */

    useEffect(
        () => {

            if (
                initializedRef.current
            ) {
                return;
            }

            initializedRef.current = true;

            const startingFilters =
                initialFilters &&
                typeof initialFilters === "object"
                    ? initialFilters
                    : {};


            /*
            |------------------------------------------------------------------
            | Save initial filters
            |------------------------------------------------------------------
            */

            if (
                Object.keys(
                    startingFilters
                ).length > 0
            ) {

                dispatch(
                    setAnalyticsFilters(
                        startingFilters
                    )
                );

            }


            /*
            |------------------------------------------------------------------
            | Initial Analytics Requests
            |------------------------------------------------------------------
            */

            dispatch(
                fetchDashboardAnalytics(
                    startingFilters
                )
            );

            dispatch(
                fetchEnergyAnalytics(
                    startingFilters
                )
            );

            dispatch(
                fetchBatteryAnalytics(
                    startingFilters
                )
            );

            dispatch(
                fetchSolarAnalytics(
                    startingFilters
                )
            );

            dispatch(
                fetchGeneratorAnalytics(
                    startingFilters
                )
            );

            dispatch(
                fetchGridAnalytics(
                    startingFilters
                )
            );

            dispatch(
                fetchReliabilityAnalytics(
                    startingFilters
                )
            );

        },
        [
            dispatch
        ]
    );


    /*
    |--------------------------------------------------------------------------
    | Public Hook API
    |--------------------------------------------------------------------------
    */

    return {

        /*
        |--------------------------------------------------------------------------
        | Analytics Data
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
        | Request State
        |--------------------------------------------------------------------------
        */

        loading,

        error,

        lastUpdated,


        /*
        |--------------------------------------------------------------------------
        | Detailed Request State
        |--------------------------------------------------------------------------
        */

        loadingState,

        errorState,

        lastUpdatedState,


        /*
        |--------------------------------------------------------------------------
        | Individual Requests
        |--------------------------------------------------------------------------
        */

        loadDashboard,

        loadEnergy,

        loadBattery,

        loadSolar,

        loadGenerator,

        loadGrid,

        loadReliability,


        /*
        |--------------------------------------------------------------------------
        | Global Requests
        |--------------------------------------------------------------------------
        */

        reload,


        /*
        |--------------------------------------------------------------------------
        | Filter Management
        |--------------------------------------------------------------------------
        */

        updateFilters

    };

}