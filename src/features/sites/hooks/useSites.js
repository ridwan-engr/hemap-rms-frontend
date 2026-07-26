import { useCallback, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import {

    fetchSites,

    fetchSite,

    fetchSiteSummary,

    fetchSiteStatistics,

    fetchSiteHealth,

    fetchSiteLocations,

    createSite as createSiteAction,

    updateSite as updateSiteAction,

    deleteSite as deleteSiteAction,

    refreshSites as refreshSitesAction,

    setSiteFilters,

    setPaginationModel

} from "../../../store/slices/siteSlice";

/*
|--------------------------------------------------------------------------
| Site Hook
|--------------------------------------------------------------------------
|
| Central hook for Site Management.
| Components should NEVER dispatch Redux actions directly.
|
*/

export default function useSite(initialFilters = {}) {

    const dispatch = useDispatch();

    /*
    |--------------------------------------------------------------------------
    | Redux State
    |--------------------------------------------------------------------------
    */

    const sites = useSelector(

        state => state.sites.sites

    );

    const total = useSelector(

        state => state.sites.total

    );

    const selectedSite = useSelector(

        state => state.sites.selectedSite

    );

    const summary = useSelector(

        state => state.sites.summary

    );

    const statistics = useSelector(

        state => state.sites.statistics

    );

    const health = useSelector(

        state => state.sites.health

    );

    const locations = useSelector(

        state => state.sites.locations

    );

    const filters = useSelector(

        state => state.sites.filters

    );

    const paginationModel = useSelector(

        state => state.sites.paginationModel

    );

    const loading = useSelector(

        state => state.sites.loading

    );

    const refreshing = useSelector(

        state => state.sites.refreshing

    );

    const error = useSelector(

        state => state.sites.error

    );

    const lastUpdated = useSelector(

        state => state.sites.lastUpdated

    );

    /*
    |--------------------------------------------------------------------------
    | Loaders
    |--------------------------------------------------------------------------
    */

    const reload = useCallback(

        (query = filters) => {

            dispatch(

                fetchSites({

                    ...query,

                    page: paginationModel.page + 1,

                    limit: paginationModel.pageSize

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

                fetchSiteSummary(filters)

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

                fetchSiteStatistics(filters)

            );

        },

        [

            dispatch,

            filters

        ]

    );

    const loadHealth = useCallback(

        () => {

            dispatch(

                fetchSiteHealth(filters)

            );

        },

        [

            dispatch,

            filters

        ]

    );

    const loadLocations = useCallback(

        () => {

            dispatch(

                fetchSiteLocations(filters)

            );

        },

        [

            dispatch,

            filters

        ]

    );

    /*
    |--------------------------------------------------------------------------
    | CRUD Operations
    |--------------------------------------------------------------------------
    */

    const viewSite = useCallback(

        id => {

            dispatch(

                fetchSite(id)

            );

        },

        [dispatch]

    );

    const createSite = useCallback(

        async payload => {

            await dispatch(

                createSiteAction(payload)

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

    const updateSite = useCallback(

        async (

            siteId,

            payload

        ) => {

            await dispatch(

                updateSiteAction({

                    siteId,

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

    const deleteSite = useCallback(

        async siteId => {

            await dispatch(

                deleteSiteAction(siteId)

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

    /*
    |--------------------------------------------------------------------------
    | Refresh
    |--------------------------------------------------------------------------
    */

    const refresh = useCallback(

        async () => {

            await dispatch(

                refreshSitesAction(filters)

            );

            reload();

            loadSummary();

            loadStatistics();

            loadHealth();

            loadLocations();

        },

        [

            dispatch,

            filters,

            reload,

            loadSummary,

            loadStatistics,

            loadHealth,

            loadLocations

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

                setSiteFilters(nextFilters)

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
    | Initial Filters
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (

            Object.keys(initialFilters).length > 0

        ) {

            dispatch(

                setSiteFilters(initialFilters)

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

        reload();

        loadSummary();

        loadStatistics();

        loadHealth();

        loadLocations();

    }, [

        reload,

        loadSummary,

        loadStatistics,

        loadHealth,

        loadLocations

    ]);

    /*
    |--------------------------------------------------------------------------
    | Public API
    |--------------------------------------------------------------------------
    */

    return {

        sites,

        total,

        selectedSite,

        summary,

        statistics,

        health,

        locations,

        filters,

        paginationModel,

        loading,

        refreshing,

        error,

        lastUpdated,

        reload,

        refresh,

        viewSite,

        createSite,

        updateSite,

        deleteSite,

        updateFilters,

        updatePagination

    };

}