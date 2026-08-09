import {
    useCallback,
    useEffect
} from "react";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    fetchSites,
    
    fetchSite,

    createSite as createSiteAction,
    updateSite as updateSiteAction,
    deleteSite as deleteSiteAction,

    setSiteFilters,
    setPaginationModel,
    clearSelectedSite
} from "../../../store/slices/siteSlice.js";

/*
|--------------------------------------------------------------------------
| Site Hook
|--------------------------------------------------------------------------
|
| Central hook for Site Management.
| Components should not dispatch Redux actions directly.
|
|--------------------------------------------------------------------------
*/

export default function useSites(initialFilters = {}) {

    const dispatch = useDispatch();

    /*
    |--------------------------------------------------------------------------
    | Redux State
    |--------------------------------------------------------------------------
    */

    const {

        sites = [],

        total = 0,

        selectedSite = null,

        filters = {},

        paginationModel = {
            page: 0,
            pageSize: 25
        },

        loading = false,

        refreshing = false,

        error = null,

        lastUpdated = null

    } = useSelector(
        state => state.sites
    );

    /*
    |--------------------------------------------------------------------------
    | Load Sites
    |--------------------------------------------------------------------------
    */

    const reload = useCallback(

        (query = filters) => {

            return dispatch(

                fetchSites({

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
            paginationModel.page,
            paginationModel.pageSize
        ]

    );

    /*
    |--------------------------------------------------------------------------
    | Load Single Site
    |--------------------------------------------------------------------------
    */

    const viewSite = useCallback(

        siteId => {

            if (!siteId) {

                return Promise.reject(
                    new Error(
                        "siteId is required"
                    )
                );

            }

            return dispatch(
                fetchSite(siteId)
            );

        },

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Create Site
    |--------------------------------------------------------------------------
    */

    const createSite = useCallback(

        async payload => {

            const result =
                await dispatch(

                    createSiteAction(
                        payload
                    )

                );

            if (
                createSiteAction.fulfilled
                    .match(result)
            ) {

                await reload();

            }

            return result;

        },

        [
            dispatch,
            reload
        ]

    );

    /*
    |--------------------------------------------------------------------------
    | Update Site
    |--------------------------------------------------------------------------
    */

    const updateSite = useCallback(

        async (
            siteId,
            payload
        ) => {

            if (!siteId) {

                return Promise.reject(
                    new Error(
                        "siteId is required"
                    )
                );

            }

            const result =
                await dispatch(

                    updateSiteAction({

                        siteId,

                        payload

                    })

                );

            if (
                updateSiteAction.fulfilled
                    .match(result)
            ) {

                await reload();

            }

            return result;

        },

        [
            dispatch,
            reload
        ]

    );

    /*
    |--------------------------------------------------------------------------
    | Delete Site
    |--------------------------------------------------------------------------
    */

    const deleteSite = useCallback(

        async siteId => {

            if (!siteId) {

                return Promise.reject(
                    new Error(
                        "siteId is required"
                    )
                );

            }

            const result =
                await dispatch(

                    deleteSiteAction(
                        siteId
                    )

                );

            return result;

        },

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Filters
    |--------------------------------------------------------------------------
    */

    const updateFilters = useCallback(

        nextFilters => {

            dispatch(

                setSiteFilters(
                    nextFilters
                )

            );

        },

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Pagination
    |--------------------------------------------------------------------------
    */

    const updatePagination = useCallback(

        model => {

            dispatch(

                setPaginationModel(
                    model
                )

            );

        },

        [dispatch]

    );

    /*
    |--------------------------------------------------------------------------
    | Clear Selected Site
    |--------------------------------------------------------------------------
    */

    const clearSite = useCallback(

        () => {

            dispatch(
                clearSelectedSite()
            );

        },

        [dispatch]

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
                Object.keys(
                    initialFilters
                ).length > 0
            ) {

                dispatch(

                    setSiteFilters(
                        initialFilters
                    )

                );

            }

        },

        [dispatch, initialFilters]

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

        [reload]

    );

    /*
    |--------------------------------------------------------------------------
    | Public Hook API
    |--------------------------------------------------------------------------
    */

    return {

        /* Data */

        sites,

        total,

        selectedSite,

        /* Query */

        filters,

        paginationModel,

        /* Request */

        loading,

        refreshing,

        error,

        lastUpdated,

        /* Actions */

        reload,

        viewSite,

        createSite,

        updateSite,

        deleteSite,

        /* UI */

        updateFilters,

        updatePagination,

        clearSite

    };

}