import {
    useCallback,
    useEffect,
    useMemo
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
| Stable Empty Values
|--------------------------------------------------------------------------
|
| IMPORTANT:
| Never use:
|
|     state => state.statistics?.filters || {}
|
| because {} creates a new object reference every selector evaluation.
|
|--------------------------------------------------------------------------
*/

const EMPTY_FILTERS = {};

/*
|--------------------------------------------------------------------------
| Statistics Hook
|--------------------------------------------------------------------------
|
| Central data-access layer for Statistics components.
|
| Components should:
|
| - NOT call Axios
| - NOT dispatch Redux actions directly
| - NOT access the statistics slice directly
|
| Components consume this hook only.
|
|--------------------------------------------------------------------------
*/

export default function useStatistics(initialFilters = EMPTY_FILTERS) {
    const dispatch = useDispatch();

    /*
    |--------------------------------------------------------------------------
    | Normalize Initial Filters
    |--------------------------------------------------------------------------
    |
    | Keep the filters reference stable.
    |
    */

    const normalizedInitialFilters = useMemo(
        () => {
            if (
                !initialFilters ||
                typeof initialFilters !== "object"
            ) {
                return EMPTY_FILTERS;
            }

            return initialFilters;
        },
        [initialFilters]
    );

    /*
    |--------------------------------------------------------------------------
    | Redux State
    |--------------------------------------------------------------------------
    */

    const dashboard = useSelector(
        state => state.statistics?.dashboard ?? null
    );

    const energy = useSelector(
        state => state.statistics?.energy ?? null
    );

    const battery = useSelector(
        state => state.statistics?.battery ?? null
    );

    const solar = useSelector(
        state => state.statistics?.solar ?? null
    );

    const generator = useSelector(
        state => state.statistics?.generator ?? null
    );

    const grid = useSelector(
        state => state.statistics?.grid ?? null
    );

    const kpis = useSelector(
        state => state.statistics?.kpis ?? null
    );

    const locations = useSelector(
        state => state.statistics?.locations ?? []
    );

    /*
    |--------------------------------------------------------------------------
    | Filters
    |--------------------------------------------------------------------------
    */

    const filters = useSelector(
        state =>
            state.statistics?.filters ??
            EMPTY_FILTERS
    );

    /*
    |--------------------------------------------------------------------------
    | Request State
    |--------------------------------------------------------------------------
    */

    const loading = useSelector(
        state =>
            state.statistics?.loading ??
            false
    );

    const refreshing = useSelector(
        state =>
            state.statistics?.refreshing ??
            false
    );

    const error = useSelector(
        state =>
            state.statistics?.error ??
            null
    );

    const lastUpdated = useSelector(
        state =>
            state.statistics?.lastUpdated ??
            null
    );

    /*
    |--------------------------------------------------------------------------
    | Query Resolver
    |--------------------------------------------------------------------------
    */

    const resolveQuery = useCallback(
        query => {
            if (
                query &&
                typeof query === "object"
            ) {
                return query;
            }

            return filters;
        },
        [filters]
    );

    /*
    |--------------------------------------------------------------------------
    | Dashboard
    |--------------------------------------------------------------------------
    */

    const loadDashboard = useCallback(
        query => {
            return dispatch(
                fetchDashboardStatistics(
                    resolveQuery(query)
                )
            );
        },
        [
            dispatch,
            resolveQuery
        ]
    );

    /*
    |--------------------------------------------------------------------------
    | Energy
    |--------------------------------------------------------------------------
    */

    const loadEnergy = useCallback(
        query => {
            return dispatch(
                fetchEnergyStatistics(
                    resolveQuery(query)
                )
            );
        },
        [
            dispatch,
            resolveQuery
        ]
    );

    /*
    |--------------------------------------------------------------------------
    | Battery
    |--------------------------------------------------------------------------
    */

    const loadBattery = useCallback(
        query => {
            return dispatch(
                fetchBatteryStatistics(
                    resolveQuery(query)
                )
            );
        },
        [
            dispatch,
            resolveQuery
        ]
    );

    /*
    |--------------------------------------------------------------------------
    | Solar
    |--------------------------------------------------------------------------
    */

    const loadSolar = useCallback(
        query => {
            return dispatch(
                fetchSolarStatistics(
                    resolveQuery(query)
                )
            );
        },
        [
            dispatch,
            resolveQuery
        ]
    );

    /*
    |--------------------------------------------------------------------------
    | Generator
    |--------------------------------------------------------------------------
    */

    const loadGenerator = useCallback(
        query => {
            return dispatch(
                fetchGeneratorStatistics(
                    resolveQuery(query)
                )
            );
        },
        [
            dispatch,
            resolveQuery
        ]
    );

    /*
    |--------------------------------------------------------------------------
    | Grid
    |--------------------------------------------------------------------------
    */

    const loadGrid = useCallback(
        query => {
            return dispatch(
                fetchGridStatistics(
                    resolveQuery(query)
                )
            );
        },
        [
            dispatch,
            resolveQuery
        ]
    );

    /*
    |--------------------------------------------------------------------------
    | KPIs
    |--------------------------------------------------------------------------
    */

    const loadKPIs = useCallback(
        query => {
            return dispatch(
                fetchKPIs(
                    resolveQuery(query)
                )
            );
        },
        [
            dispatch,
            resolveQuery
        ]
    );

    /*
    |--------------------------------------------------------------------------
    | Site Locations
    |--------------------------------------------------------------------------
    */

    const loadLocations = useCallback(
        query => {
            return dispatch(
                fetchSiteLocations(
                    resolveQuery(query)
                )
            );
        },
        [
            dispatch,
            resolveQuery
        ]
    );

    /*
    |--------------------------------------------------------------------------
    | Reload All Statistics
    |--------------------------------------------------------------------------
    */

    const reload = useCallback(
        query => {
            const resolvedQuery =
                resolveQuery(query);

            return Promise.all([
                dispatch(
                    fetchDashboardStatistics(
                        resolvedQuery
                    )
                ),

                dispatch(
                    fetchEnergyStatistics(
                        resolvedQuery
                    )
                ),

                dispatch(
                    fetchBatteryStatistics(
                        resolvedQuery
                    )
                ),

                dispatch(
                    fetchSolarStatistics(
                        resolvedQuery
                    )
                ),

                dispatch(
                    fetchGeneratorStatistics(
                        resolvedQuery
                    )
                ),

                dispatch(
                    fetchGridStatistics(
                        resolvedQuery
                    )
                ),

                dispatch(
                    fetchKPIs(
                        resolvedQuery
                    )
                ),

                dispatch(
                    fetchSiteLocations(
                        resolvedQuery
                    )
                )
            ]);
        },
        [
            dispatch,
            resolveQuery
        ]
    );

    /*
    |--------------------------------------------------------------------------
    | Initial Statistics Load
    |--------------------------------------------------------------------------
    |
    | ONE initial load only.
    |
    | This replaces the previous two useEffects that could cause:
    |
    |     reload()
    |     reload(initialFilters)
    |
    | and therefore duplicate API requests.
    |
    */

    useEffect(
        () => {
            reload(normalizedInitialFilters);
        },
        [
            reload,
            normalizedInitialFilters
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

        dashboard,
        energy,
        battery,
        solar,
        generator,
        grid,
        kpis,
        locations,

        /*
        | Filters
        */

        filters,

        /*
        | Status
        */

        loading,
        refreshing,
        error,
        lastUpdated,

        /*
        | Individual Loaders
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
        | Reload
        */

        reload
    };
}