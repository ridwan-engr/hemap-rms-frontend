import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    fetchDashboard,
    fetchDashboardCards,
    fetchDashboardKPIs,
    fetchDashboardMap,
    refreshDashboard
} from "../../../store/slices/dashboardSlice.js";

/**
 * ============================================================================
 * Dashboard Hook
 * ============================================================================
 * Central hook used by every Dashboard component.
 * No Dashboard component should dispatch Redux actions directly.
 * ============================================================================
 */

export default function useDashboard(filters = {}) {

    const dispatch = useDispatch();

    const dashboard = useSelector(
        (state) => state.dashboard.dashboard
    );

    const cards = useSelector(
        (state) => state.dashboard.cards
    );

    const kpis = useSelector(
        (state) => state.dashboard.kpis
    );

    const map = useSelector(
        (state) => state.dashboard.map
    );

    const loading = useSelector(
        (state) => state.dashboard.loading
    );

    const refreshing = useSelector(
        (state) => state.dashboard.refreshing
    );

    const error = useSelector(
        (state) => state.dashboard.error
    );

    /**
     * Load complete dashboard
     */

    const loadDashboard = useCallback(() => {

        dispatch(fetchDashboard(filters));

    }, [dispatch, filters]);

    /**
     * Load KPI cards
     */

    const loadCards = useCallback(() => {

        dispatch(fetchDashboardCards(filters));

    }, [dispatch, filters]);

    /**
     * Load KPIs
     */

    const loadKPIs = useCallback(() => {

        dispatch(fetchDashboardKPIs(filters));

    }, [dispatch, filters]);

    /**
     * Load map
     */

    const loadMap = useCallback(() => {

        dispatch(fetchDashboardMap(filters));

    }, [dispatch, filters]);

    /**
     * Refresh dashboard
     */

    const refresh = useCallback(() => {

        dispatch(refreshDashboard(filters));

    }, [dispatch, filters]);

    /**
     * Initial load
     */

    useEffect(() => {

        loadDashboard();
        loadCards();
        loadKPIs();
        loadMap();

    }, [
        loadDashboard,
        loadCards,
        loadKPIs,
        loadMap
    ]);

    return {

        dashboard,

        cards,

        kpis,

        map,

        loading,

        refreshing,

        error,

        refresh,

        reload: loadDashboard

    };

}