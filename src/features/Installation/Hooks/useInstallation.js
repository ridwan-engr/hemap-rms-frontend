import {
    useCallback,
    useEffect,
    useRef
} from "react";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    fetchInstallations,
    fetchInstallation,
    addInstallation,
    editInstallation,
    removeInstallation,
    syncInstallation,
    fetchInstallationStatistics,
    setInstallationFilters,
    setSelectedInstallation,
    clearSelectedInstallation,
    clearInstallationStatistics,
    clearInstallationErrors
} from "../../../store/slices/installationSlice.js";


/*
|--------------------------------------------------------------------------
| Stable fallback references
|--------------------------------------------------------------------------
*/

const EMPTY_ARRAY = [];
const EMPTY_OBJECT = {};


/*
|--------------------------------------------------------------------------
| Installation Hook
|--------------------------------------------------------------------------
*/

export default function useInstallations(
    initialFilters = {},
    options = {}
) {

    const dispatch = useDispatch();

    /*
    |--------------------------------------------------------------------------
    | Options
    |--------------------------------------------------------------------------
    */

    const {
        autoLoad = true
    } = options;


    /*
    |--------------------------------------------------------------------------
    | Initialization Guard
    |--------------------------------------------------------------------------
    */

    const initializedRef = useRef(false);


    /*
    |--------------------------------------------------------------------------
    | Redux State
    |--------------------------------------------------------------------------
    */

    const installations = useSelector(
        state =>
            state.installations?.items ?? EMPTY_ARRAY
    );

    const total = useSelector(
        state =>
            state.installations?.total ?? 0
    );

    const pagination = useSelector(
        state =>
            state.installations?.pagination ?? null
    );

    const selected = useSelector(
        state =>
            state.installations?.selected ?? null
    );

    const statistics = useSelector(
        state =>
            state.installations?.statistics ?? null
    );

    const filters = useSelector(
        state =>
            state.installations?.filters ?? EMPTY_OBJECT
    );


    /*
    |--------------------------------------------------------------------------
    | Loading State
    |--------------------------------------------------------------------------
    */

    const loading = useSelector(
        state =>
            state.installations?.loading ?? false
    );

    const detailsLoading = useSelector(
        state =>
            state.installations?.detailsLoading ?? false
    );

    const createLoading = useSelector(
        state =>
            state.installations?.createLoading ?? false
    );

    const updateLoading = useSelector(
        state =>
            state.installations?.updateLoading ?? false
    );

    const deleteLoading = useSelector(
        state =>
            state.installations?.deleteLoading ?? false
    );

    const syncLoading = useSelector(
        state =>
            state.installations?.syncLoading ?? false
    );

    const statisticsLoading = useSelector(
        state =>
            state.installations?.statisticsLoading ?? false
    );


    /*
    |--------------------------------------------------------------------------
    | Error State
    |--------------------------------------------------------------------------
    */

    const error = useSelector(
        state =>
            state.installations?.error ?? null
    );

    const detailsError = useSelector(
        state =>
            state.installations?.detailsError ?? null
    );

    const createError = useSelector(
        state =>
            state.installations?.createError ?? null
    );

    const updateError = useSelector(
        state =>
            state.installations?.updateError ?? null
    );

    const deleteError = useSelector(
        state =>
            state.installations?.deleteError ?? null
    );

    const syncError = useSelector(
        state =>
            state.installations?.syncError ?? null
    );

    const statisticsError = useSelector(
        state =>
            state.installations?.statisticsError ?? null
    );


    /*
    |--------------------------------------------------------------------------
    | Timestamps
    |--------------------------------------------------------------------------
    */

    const lastUpdated = useSelector(
        state =>
            state.installations?.lastUpdated ?? null
    );

    const lastSynchronized = useSelector(
        state =>
            state.installations?.lastSynchronized ?? null
    );


    /*
    |--------------------------------------------------------------------------
    | Load Installations
    |--------------------------------------------------------------------------
    */

    const loadInstallations = useCallback(
        (query = filters) => {

            return dispatch(
                fetchInstallations(
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
    | Load Single Installation
    |--------------------------------------------------------------------------
    */

    const loadInstallation = useCallback(
        id => {

            if (!id) {

                return Promise.reject(
                    new Error(
                        "Installation ID is required"
                    )
                );

            }

            return dispatch(
                fetchInstallation(id)
            );

        },
        [
            dispatch
        ]
    );


    /*
    |--------------------------------------------------------------------------
    | Create Installation
    |--------------------------------------------------------------------------
    */

    const create = useCallback(
        payload => {

            if (
                !payload ||
                typeof payload !== "object"
            ) {

                return Promise.reject(
                    new Error(
                        "Installation data is required"
                    )
                );

            }

            return dispatch(
                addInstallation(payload)
            );

        },
        [
            dispatch
        ]
    );


    /*
    |--------------------------------------------------------------------------
    | Update Installation
    |--------------------------------------------------------------------------
    */

    const update = useCallback(
        (
            id,
            data
        ) => {

            if (!id) {

                return Promise.reject(
                    new Error(
                        "Installation ID is required"
                    )
                );

            }

            if (
                !data ||
                typeof data !== "object"
            ) {

                return Promise.reject(
                    new Error(
                        "Installation update data is required"
                    )
                );

            }

            return dispatch(
                editInstallation({
                    id,
                    data
                })
            );

        },
        [
            dispatch
        ]
    );


    /*
    |--------------------------------------------------------------------------
    | Delete Installation
    |--------------------------------------------------------------------------
    */

    const remove = useCallback(
        id => {

            if (!id) {

                return Promise.reject(
                    new Error(
                        "Installation ID is required"
                    )
                );

            }

            return dispatch(
                removeInstallation(id)
            );

        },
        [
            dispatch
        ]
    );


    /*
    |--------------------------------------------------------------------------
    | Synchronize Installation
    |--------------------------------------------------------------------------
    */

    const synchronize = useCallback(
        id => {

            if (!id) {

                return Promise.reject(
                    new Error(
                        "Installation ID is required"
                    )
                );

            }

            return dispatch(
                syncInstallation(id)
            );

        },
        [
            dispatch
        ]
    );


    /*
    |--------------------------------------------------------------------------
    | Load Installation Statistics
    |--------------------------------------------------------------------------
    */

    const loadStatistics = useCallback(
        id => {

            if (!id) {

                return Promise.reject(
                    new Error(
                        "Installation ID is required"
                    )
                );

            }

            return dispatch(
                fetchInstallationStatistics(id)
            );

        },
        [
            dispatch
        ]
    );


    /*
    |--------------------------------------------------------------------------
    | Refresh / Reload
    |--------------------------------------------------------------------------
    */

    const reload = useCallback(
        (
            query = filters
        ) => {

            return loadInstallations(
                query || {}
            );

        },
        [
            loadInstallations,
            filters
        ]
    );


    /*
    |--------------------------------------------------------------------------
    | Optional Compatibility Alias
    |--------------------------------------------------------------------------
    |
    | This prevents existing pages using refreshInstallations()
    | from breaking.
    |
    */

    const refreshInstallations = useCallback(
        (
            query = filters
        ) => {

            return reload(
                query || {}
            );

        },
        [
            reload,
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
                setInstallationFilters(
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
    | Selection
    |--------------------------------------------------------------------------
    */

    const selectInstallation = useCallback(
        installation => {

            dispatch(
                setSelectedInstallation(
                    installation || null
                )
            );

        },
        [
            dispatch
        ]
    );


    /*
    |--------------------------------------------------------------------------
    | Clear Selection
    |--------------------------------------------------------------------------
    */

    const clearSelection = useCallback(
        () => {

            dispatch(
                clearSelectedInstallation()
            );

        },
        [
            dispatch
        ]
    );


    /*
    |--------------------------------------------------------------------------
    | Clear Statistics
    |--------------------------------------------------------------------------
    */

    const clearStatistics = useCallback(
        () => {

            dispatch(
                clearInstallationStatistics()
            );

        },
        [
            dispatch
        ]
    );


    /*
    |--------------------------------------------------------------------------
    | Clear Errors
    |--------------------------------------------------------------------------
    */

    const clearErrors = useCallback(
        () => {

            dispatch(
                clearInstallationErrors()
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
    */

    useEffect(
        () => {

            if (initializedRef.current) {
                return;
            }

            initializedRef.current = true;

            const startingFilters =
                initialFilters &&
                typeof initialFilters === "object"
                    ? initialFilters
                    : {};

            if (
                Object.keys(
                    startingFilters
                ).length > 0
            ) {

                dispatch(
                    setInstallationFilters(
                        startingFilters
                    )
                );

            }

            if (autoLoad) {

                dispatch(
                    fetchInstallations(
                        startingFilters
                    )
                );

            }

        },
        [
            dispatch,
            autoLoad,
            initialFilters
        ]
    );


    /*
    |--------------------------------------------------------------------------
    | Public API
    |--------------------------------------------------------------------------
    */

    return {

        installations,

        total,

        pagination,

        selected,

        statistics,

        filters,

        loading,

        detailsLoading,

        createLoading,

        updateLoading,

        deleteLoading,

        syncLoading,

        statisticsLoading,

        error,

        detailsError,

        createError,

        updateError,

        deleteError,

        syncError,

        statisticsError,

        lastUpdated,

        lastSynchronized,

        loadInstallations,

        reload,

        /*
        | Compatibility with InstallationPage
        */

        refreshInstallations,

        loadInstallation,

        create,

        update,

        remove,

        synchronize,

        loadStatistics,

        clearStatistics,

        selectInstallation,

        clearSelection,

        updateFilters,

        clearErrors

    };

}