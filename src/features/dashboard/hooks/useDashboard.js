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
    fetchDashboard,
    fetchDashboardCards,
    fetchDashboardKPIs,
    fetchDashboardMap,
    fetchDashboardCharts,
    refreshDashboard
} from "../../../store/slices/dashboardSlice.js";

/*
|--------------------------------------------------------------------------
| Stable Empty Filters
|--------------------------------------------------------------------------
*/

const EMPTY_FILTERS = {};

/*
|--------------------------------------------------------------------------
| Dashboard Hook
|--------------------------------------------------------------------------
*/

export default function useDashboard(filters = EMPTY_FILTERS) {

    const dispatch = useDispatch();

    /*
    |--------------------------------------------------------------------------
    | Redux State
    |--------------------------------------------------------------------------
    */

    const dashboardState = useSelector(
        state => state.dashboard
    );

    const {

        dashboard = null,

        cards = null,

        kpis = null,

        charts = null,

        map = [],

        loading = false,

        refreshing = false,

        error = null,

        lastUpdated = null

    } = dashboardState || {};

    /*
    |--------------------------------------------------------------------------
    | Stable Filters
    |--------------------------------------------------------------------------
    */

    const normalizedFilters = useMemo(
        () => filters || {},
        [filters]
    );

    /*
    |--------------------------------------------------------------------------
    | Derived Dashboard Data
    |--------------------------------------------------------------------------
    */

    const telemetry =
        dashboard?.telemetry ?? {};

    const statistics =
        dashboard?.statistics ?? {};

    const optimization =
        dashboard?.optimization ?? {};

    const reliability =
        dashboard?.reliability ?? {};

    const alarms =
        dashboard?.alarms ?? [];

    const sites =
        dashboard?.sites ?? [];

    const forecast =
        dashboard?.forecast ?? {};

    const weather =
        dashboard?.weather ?? {};

    /*
    |--------------------------------------------------------------------------
    | Initial Dashboard Load
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        dispatch(
            fetchDashboard(
                normalizedFilters
            )
        );

        dispatch(
            fetchDashboardCards(
                normalizedFilters
            )
        );

        dispatch(
            fetchDashboardKPIs(
                normalizedFilters
            )
        );

        dispatch(
            fetchDashboardMap(
                normalizedFilters
            )
        );

        dispatch(
            fetchDashboardCharts(
                normalizedFilters
            )
        );

    }, [
        dispatch,
        normalizedFilters
    ]);

    /*
    |--------------------------------------------------------------------------
    | Manual Reload
    |--------------------------------------------------------------------------
    */

    const reload = useCallback(() => {

        dispatch(
            fetchDashboard(
                normalizedFilters
            )
        );

        dispatch(
            fetchDashboardCards(
                normalizedFilters
            )
        );

        dispatch(
            fetchDashboardKPIs(
                normalizedFilters
            )
        );

        dispatch(
            fetchDashboardMap(
                normalizedFilters
            )
        );

        dispatch(
            fetchDashboardCharts(
                normalizedFilters
            )
        );

    }, [
        dispatch,
        normalizedFilters
    ]);

    /*
    |--------------------------------------------------------------------------
    | Manual Refresh
    |--------------------------------------------------------------------------
    */

    const refresh = useCallback(() => {

        return dispatch(
            refreshDashboard(
                normalizedFilters
            )
        );

    }, [
        dispatch,
        normalizedFilters
    ]);

    /*
    |--------------------------------------------------------------------------
    | Return
    |--------------------------------------------------------------------------
    */

    return {

        dashboard,

        cards,

        kpis,

        charts,

        map,

        telemetry,

        statistics,

        optimization,

        reliability,

        alarms,

        sites,

        forecast,

        weather,

        loading,

        refreshing,

        error,

        lastUpdated,

        reload,

        refresh

    };

}