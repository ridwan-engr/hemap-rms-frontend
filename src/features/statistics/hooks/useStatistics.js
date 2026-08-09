import {
    useCallback,
    useEffect
} from "react";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    fetchDashboardStatistics,
    fetchEnergyStatistics,
    fetchBatteryStatistics,
    fetchSolarStatistics,
    fetchGeneratorStatistics,
    fetchGridStatistics,
    fetchKPIs,
    fetchSiteLocations
} from "../../../store/slices/statisticsSlice.js";

/*
|--------------------------------------------------------------------------
| Statistics Hook
|--------------------------------------------------------------------------
|
| Central hook used by Statistics components.
|
| Components should NEVER:
|
| - call Axios directly
| - dispatch Redux actions directly
| - access the statistics slice directly
|
| Components should consume this hook only.
|
|--------------------------------------------------------------------------
|
| Backend contract:
|
| GET /statistics/dashboard
| GET /statistics/energy
| GET /statistics/battery
| GET /statistics/solar
| GET /statistics/generator
| GET /statistics/grid
| GET /statistics/kpis
| GET /statistics/locations
|
|--------------------------------------------------------------------------
*/

export default function useStatistics(initialFilters = {}) {

    const dispatch = useDispatch();

    /*
    |--------------------------------------------------------------------------
    | Redux State
    |--------------------------------------------------------------------------
    */

    const dashboard = useSelector(
        state => state.statistics?.dashboard
    );

    const energy = useSelector(
        state => state.statistics?.energy
    );

    const battery = useSelector(
        state => state.statistics?.battery
    );

    const solar = useSelector(
        state => state.statistics?.solar
    );

    const generator = useSelector(
        state => state.statistics?.generator
    );

    const grid = useSelector(
        state => state.statistics?.grid
    );

    const kpis = useSelector(
        state => state.statistics?.kpis
    );

    const locations = useSelector(
        state => state.statistics?.locations
    );

    const filters = useSelector(
        state => state.statistics?.filters || {}
    );

    const loading = useSelector(
        state => state.statistics?.loading ?? false
    );

    const refreshing = useSelector(
        state => state.statistics?.refreshing ?? false
    );

    const error = useSelector(
        state => state.statistics?.error ?? null
    );

    const lastUpdated = useSelector(
        state => state.statistics?.lastUpdated ?? null
    );

    /*
    |--------------------------------------------------------------------------
    | Dashboard Statistics
    |--------------------------------------------------------------------------
    */

    const loadDashboard = useCallback(
        (query = filters) => {

            return dispatch(
                fetchDashboardStatistics(query)
            );

        },
        [
            dispatch,
            filters
        ]
    );

    /*
    |--------------------------------------------------------------------------
    | Energy Statistics
    |--------------------------------------------------------------------------
    */

    const loadEnergy = useCallback(
        (query = filters) => {

            return dispatch(
                fetchEnergyStatistics(query)
            );

        },
        [
            dispatch,
            filters
        ]
    );

    /*
    |--------------------------------------------------------------------------
    | Battery Statistics
    |--------------------------------------------------------------------------
    */

    const loadBattery = useCallback(
        (query = filters) => {

            return dispatch(
                fetchBatteryStatistics(query)
            );

        },
        [
            dispatch,
            filters
        ]
    );

    /*
    |--------------------------------------------------------------------------
    | Solar Statistics
    |--------------------------------------------------------------------------
    */

    const loadSolar = useCallback(
        (query = filters) => {

            return dispatch(
                fetchSolarStatistics(query)
            );

        },
        [
            dispatch,
            filters
        ]
    );

    /*
    |--------------------------------------------------------------------------
    | Generator Statistics
    |--------------------------------------------------------------------------
    */

    const loadGenerator = useCallback(
        (query = filters) => {

            return dispatch(
                fetchGeneratorStatistics(query)
            );

        },
        [
            dispatch,
            filters
        ]
    );

    /*
    |--------------------------------------------------------------------------
    | Grid Statistics
    |--------------------------------------------------------------------------
    */

    const loadGrid = useCallback(
        (query = filters) => {

            return dispatch(
                fetchGridStatistics(query)
            );

        },
        [
            dispatch,
            filters
        ]
    );

    /*
    |--------------------------------------------------------------------------
    | KPI Statistics
    |--------------------------------------------------------------------------
    */

    const loadKPIs = useCallback(
        (query = filters) => {

            return dispatch(
                fetchKPIs(query)
            );

        },
        [
            dispatch,
            filters
        ]
    );

    /*
    |--------------------------------------------------------------------------
    | Site Locations
    |--------------------------------------------------------------------------
    */

    const loadLocations = useCallback(
        (query = filters) => {

            return dispatch(
                fetchSiteLocations(query)
            );

        },
        [
            dispatch,
            filters
        ]
    );

    /*
    |--------------------------------------------------------------------------
    | Reload All Statistics
    |--------------------------------------------------------------------------
    */

    const reload = useCallback(
        (query = filters) => {

            return Promise.all([
                dispatch(
                    fetchDashboardStatistics(query)
                ),

                dispatch(
                    fetchEnergyStatistics(query)
                ),

                dispatch(
                    fetchBatteryStatistics(query)
                ),

                dispatch(
                    fetchSolarStatistics(query)
                ),

                dispatch(
                    fetchGeneratorStatistics(query)
                ),

                dispatch(
                    fetchGridStatistics(query)
                ),

                dispatch(
                    fetchKPIs(query)
                ),

                dispatch(
                    fetchSiteLocations(query)
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
    | Initial Statistics Load
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
    | Initial Filters Load
    |--------------------------------------------------------------------------
    |
    | Initial filters are passed to the individual thunk requests.
    | This avoids requiring components to know Redux implementation details.
    |
    */

    useEffect(
        () => {

            if (
                initialFilters &&
                Object.keys(initialFilters).length > 0
            ) {

                reload(initialFilters);

            }

        },
        [
            initialFilters,
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

        kpis,

        locations,

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

        refreshing,

        error,

        lastUpdated,

        /*
        |--------------------------------------------------------------------------
        | Individual Loaders
        |--------------------------------------------------------------------------
        */

        loadDashboard,

        loadEnergy,

        loadBattery,

        loadSolar,

        loadGenerator,

        loadGrid,

        loadKPIs,

        loadLocations,

        /*
        |--------------------------------------------------------------------------
        | Reload Everything
        |--------------------------------------------------------------------------
        */

        reload
    };
}