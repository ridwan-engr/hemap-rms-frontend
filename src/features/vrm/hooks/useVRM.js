import {
    useCallback,
    useEffect
} from "react";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    fetchVRMInstallation,
    fetchVRMDashboard,
    fetchVRMStatistics,
    clearVRMError,

    selectVRMInstallation,
    selectVRMDashboard,
    selectVRMStatistics,
    selectVRMLoading,
    selectVRMRefreshing,
    selectVRMError,
    selectVRMLastUpdated
} from "../../../store/slices/vrmSlice.js";

/*
|--------------------------------------------------------------------------
| VRM Hook
|--------------------------------------------------------------------------
|
| Components must consume VRM through this hook.
|
| Components should NOT:
|
| - call Axios directly
| - call vrmApi.js directly
| - dispatch Redux actions directly
| - access state.vrm directly
|
|--------------------------------------------------------------------------
*/

export default function useVRM({
    autoLoad = true,
    statisticsParams = {}
} = {}) {

    const dispatch = useDispatch();

    /*
    |--------------------------------------------------------------------------
    | Redux State
    |--------------------------------------------------------------------------
    */

    const installation =
        useSelector(selectVRMInstallation);

    const dashboard =
        useSelector(selectVRMDashboard);

    const statistics =
        useSelector(selectVRMStatistics);

    const loading =
        useSelector(selectVRMLoading);

    const refreshing =
        useSelector(selectVRMRefreshing);

    const error =
        useSelector(selectVRMError);

    const lastUpdated =
        useSelector(selectVRMLastUpdated);

    /*
    |--------------------------------------------------------------------------
    | Load Installation
    |--------------------------------------------------------------------------
    */

    const loadInstallation =
        useCallback(
            () => {

                return dispatch(
                    fetchVRMInstallation()
                );

            },
            [dispatch]
        );

    /*
    |--------------------------------------------------------------------------
    | Load Dashboard
    |--------------------------------------------------------------------------
    */

    const loadDashboard =
        useCallback(
            () => {

                return dispatch(
                    fetchVRMDashboard()
                );

            },
            [dispatch]
        );

    /*
    |--------------------------------------------------------------------------
    | Load Statistics
    |--------------------------------------------------------------------------
    */

    const loadStatistics =
        useCallback(
            (params = statisticsParams) => {

                return dispatch(
                    fetchVRMStatistics(
                        params
                    )
                );

            },
            [
                dispatch,
                statisticsParams
            ]
        );

    /*
    |--------------------------------------------------------------------------
    | Refresh
    |--------------------------------------------------------------------------
    |
    | Refresh all VRM data from the HEMAP backend.
    |
    */

    const refresh =
        useCallback(
            async () => {

                const results =
                    await Promise.all([
                        dispatch(
                            fetchVRMInstallation()
                        ),

                        dispatch(
                            fetchVRMDashboard()
                        ),

                        dispatch(
                            fetchVRMStatistics(
                                statisticsParams
                            )
                        )
                    ]);

                return results;

            },
            [
                dispatch,
                statisticsParams
            ]
        );

    /*
    |--------------------------------------------------------------------------
    | Clear Error
    |--------------------------------------------------------------------------
    */

    const dismissError =
        useCallback(
            () => {

                dispatch(
                    clearVRMError()
                );

            },
            [dispatch]
        );

    /*
    |--------------------------------------------------------------------------
    | Initial Load
    |--------------------------------------------------------------------------
    */

    useEffect(
        () => {

            if (!autoLoad) {

                return;

            }

            /*
            |--------------------------------------------------------------
            | Do not reload continuously.
            |--------------------------------------------------------------
            |
            | The hook loads the configured VRM installation once.
            | Manual refresh is available through refresh().
            |
            */

            loadInstallation();

            loadDashboard();

            loadStatistics(
                statisticsParams
            );

        },
        [
            autoLoad,
            loadInstallation,
            loadDashboard,
            loadStatistics,
            statisticsParams
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

        installation,

        dashboard,

        statistics,

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
        | Actions
        |--------------------------------------------------------------------------
        */

        loadInstallation,

        loadDashboard,

        loadStatistics,

        refresh,

        dismissError

    };

}