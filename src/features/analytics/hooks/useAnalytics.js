import { useCallback, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {

    fetchDashboardAnalytics,

    fetchReliabilityMetrics,

    fetchEnergyForecast,

    fetchEnergyTrends,

    fetchOptimizationSummary,

    fetchKPIComparison,

    fetchAvailability,

    fetchBatteryHealth,

    fetchSolarPerformance,

    fetchGeneratorPerformance,

    fetchWeatherImpact,

    refreshAnalytics,

    setAnalyticsFilters

} from "../../../store/slices/analyticsSlice";

/*
|--------------------------------------------------------------------------
| Analytics Hook
|--------------------------------------------------------------------------
|
| Central hook used by every Analytics component.
| Components should NEVER dispatch Redux actions directly.
|
*/

export default function useAnalytics(initialFilters = {}) {

    const dispatch = useDispatch();

    /*
    |--------------------------------------------------------------------------
    | Redux State
    |--------------------------------------------------------------------------
    */

    const dashboard = useSelector(

        state => state.analytics.dashboard

    );

    const reliability = useSelector(

        state => state.analytics.reliability

    );

    const forecast = useSelector(

        state => state.analytics.forecast

    );

    const trends = useSelector(

        state => state.analytics.trends

    );

    const optimization = useSelector(

        state => state.analytics.optimization

    );

    const kpis = useSelector(

        state => state.analytics.kpis

    );

    const availability = useSelector(

        state => state.analytics.availability

    );

    const batteryHealth = useSelector(

        state => state.analytics.batteryHealth

    );

    const solarPerformance = useSelector(

        state => state.analytics.solarPerformance

    );

    const generatorPerformance = useSelector(

        state => state.analytics.generatorPerformance

    );

    const weatherImpact = useSelector(

        state => state.analytics.weatherImpact

    );

    const filters = useSelector(

        state => state.analytics.filters

    );

    const loading = useSelector(

        state => state.analytics.loading

    );

    const refreshing = useSelector(

        state => state.analytics.refreshing

    );

    const error = useSelector(

        state => state.analytics.error

    );

    const lastUpdated = useSelector(

        state => state.analytics.lastUpdated

    );

    /*
    |--------------------------------------------------------------------------
    | Loaders
    |--------------------------------------------------------------------------
    */

    const loadDashboard = useCallback(() => {

        dispatch(fetchDashboardAnalytics(filters));

    }, [dispatch, filters]);

    const loadReliability = useCallback(() => {

        dispatch(fetchReliabilityMetrics(filters));

    }, [dispatch, filters]);

    const loadForecast = useCallback(() => {

        dispatch(fetchEnergyForecast(filters));

    }, [dispatch, filters]);

    const loadTrends = useCallback(() => {

        dispatch(fetchEnergyTrends(filters));

    }, [dispatch, filters]);

    const loadOptimization = useCallback(() => {

        dispatch(fetchOptimizationSummary(filters));

    }, [dispatch, filters]);

    const loadKPIs = useCallback(() => {

        dispatch(fetchKPIComparison(filters));

    }, [dispatch, filters]);

    const loadAvailability = useCallback(() => {

        dispatch(fetchAvailability(filters));

    }, [dispatch, filters]);

    const loadBatteryHealth = useCallback(() => {

        dispatch(fetchBatteryHealth(filters));

    }, [dispatch, filters]);

    const loadSolarPerformance = useCallback(() => {

        dispatch(fetchSolarPerformance(filters));

    }, [dispatch, filters]);

    const loadGeneratorPerformance = useCallback(() => {

        dispatch(fetchGeneratorPerformance(filters));

    }, [dispatch, filters]);

    const loadWeatherImpact = useCallback(() => {

        dispatch(fetchWeatherImpact(filters));

    }, [dispatch, filters]);

    /*
    |--------------------------------------------------------------------------
    | Refresh
    |--------------------------------------------------------------------------
    */

    const refresh = useCallback(() => {

        dispatch(refreshAnalytics(filters));

    }, [dispatch, filters]);

    /*
    |--------------------------------------------------------------------------
    | Filters
    |--------------------------------------------------------------------------
    */

    const updateFilters = useCallback(

        nextFilters => {

            dispatch(

                setAnalyticsFilters(nextFilters)

            );

        },

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Initial Filters
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (

            Object.keys(initialFilters).length > 0

        ) {

            dispatch(

                setAnalyticsFilters(initialFilters)

            );

        }

    }, [

        dispatch,

        initialFilters

    ]);

    /*
    |--------------------------------------------------------------------------
    | Initial Load
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        loadDashboard();

        loadReliability();

        loadForecast();

        loadTrends();

        loadOptimization();

        loadKPIs();

        loadAvailability();

        loadBatteryHealth();

        loadSolarPerformance();

        loadGeneratorPerformance();

        loadWeatherImpact();

    }, [

        loadDashboard,

        loadReliability,

        loadForecast,

        loadTrends,

        loadOptimization,

        loadKPIs,

        loadAvailability,

        loadBatteryHealth,

        loadSolarPerformance,

        loadGeneratorPerformance,

        loadWeatherImpact

    ]);

    /*
    |--------------------------------------------------------------------------
    | Public API
    |--------------------------------------------------------------------------
    */

    return {

        dashboard,

        reliability,

        forecast,

        trends,

        optimization,

        kpis,

        availability,

        batteryHealth,

        solarPerformance,

        generatorPerformance,

        weatherImpact,

        filters,

        loading,

        refreshing,

        error,

        lastUpdated,

        refresh,

        updateFilters,

        reload: loadDashboard,

        loadReliability,

        loadForecast,

        loadTrends,

        loadOptimization,

        loadKPIs,

        loadAvailability,

        loadBatteryHealth,

        loadSolarPerformance,

        loadGeneratorPerformance,

        loadWeatherImpact

    };

}