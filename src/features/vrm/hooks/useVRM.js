import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    fetchVRMInstallation,
    fetchVRMDashboard,
    fetchVRMStatistics,

    selectVRMInstallation,
    selectVRMDashboard,
    selectVRMStatistics,
    selectVRMLoading,
    selectVRMRefreshing,
    selectVRMError,
    selectVRMLastUpdated,

    clearVRMError
} from "../../../store/slices/vrmSlice.js";

/**
 * ============================================================================
 * HEMAP RMS
 * VRM - useVRM Hook
 * ============================================================================
 *
 * Purpose:
 * ----------------------------------------------------------------------------
 * Central React hook for consuming VRM state.
 *
 * Architecture:
 *
 * VRMInstallationPage
 *        ↓
 * useVRM()
 *        ↓
 * vrmSlice
 *        ↓
 * vrmApi
 *        ↓
 * HEMAP Backend
 *        ↓
 * Victron VRM
 *
 * Responsibilities:
 * ----------------------------------------------------------------------------
 * - Read normalized VRM state from Redux.
 * - Trigger VRM Redux thunks.
 * - Provide the initial VRM data load.
 * - Provide a single refresh() operation.
 * - Expose request and synchronization state.
 *
 * This hook does NOT:
 * ----------------------------------------------------------------------------
 * - call Axios
 * - call vrmApi directly
 * - parse raw VRM responses
 * - normalize VRM data
 * - contain UI markup
 * - access VRM credentials
 *
 * ============================================================================
 */

export default function useVRM() {

    const dispatch = useDispatch();

    /*
    |--------------------------------------------------------------------------
    | Redux State
    |--------------------------------------------------------------------------
    */

    const installation =
        useSelector(
            selectVRMInstallation
        );

    const dashboard =
        useSelector(
            selectVRMDashboard
        );

    const statistics =
        useSelector(
            selectVRMStatistics
        );

    const loading =
        useSelector(
            selectVRMLoading
        );

    const refreshing =
        useSelector(
            selectVRMRefreshing
        );

    const error =
        useSelector(
            selectVRMError
        );

    const lastUpdated =
        useSelector(
            selectVRMLastUpdated
        );

    /*
    |--------------------------------------------------------------------------
    | Initial VRM Load
    |--------------------------------------------------------------------------
    |
    | Load installation information, dashboard telemetry and statistics
    | when the VRM feature is first mounted.
    |
    | Existing Redux data is preserved and will not be unnecessarily
    | requested again.
    |
    */

    useEffect(() => {

        if (
            !installation &&
            !dashboard
        ) {

            dispatch(
                fetchVRMInstallation()
            );

            dispatch(
                fetchVRMDashboard()
            );

            dispatch(
                fetchVRMStatistics()
            );

        }

    }, [
        dispatch,
        installation,
        dashboard
    ]);

    /*
    |--------------------------------------------------------------------------
    | Refresh Dashboard + Statistics
    |--------------------------------------------------------------------------
    |
    | Refresh intentionally excludes installation identity.
    |
    | Installation information is relatively static while dashboard and
    | statistics represent the live/historical telemetry layer.
    |
    */

    const refresh =
        useCallback(
            async () => {

                const results =
                    await Promise.allSettled([

                        dispatch(
                            fetchVRMDashboard()
                        ).unwrap(),

                        dispatch(
                            fetchVRMStatistics()
                        ).unwrap()

                    ]);

                const rejected =
                    results.find(
                        result =>
                            result.status ===
                            "rejected"
                    );

                if (rejected) {

                    throw rejected.reason;

                }

                return results.map(
                    result =>
                        result.value
                );

            },
            [dispatch]
        );

    /*
    |--------------------------------------------------------------------------
    | Reload Installation
    |--------------------------------------------------------------------------
    |
    | Explicitly reload installation identity/configuration.
    |
    */

    const reloadInstallation =
        useCallback(
            async () => {

                return dispatch(
                    fetchVRMInstallation()
                ).unwrap();

            },
            [dispatch]
        );

    /*
    |--------------------------------------------------------------------------
    | Refresh Statistics
    |--------------------------------------------------------------------------
    |
    | Allows statistics to be requested independently.
    |
    */

    const refreshStatistics =
        useCallback(
            async (
                params = {}
            ) => {

                return dispatch(
                    fetchVRMStatistics(
                        params
                    )
                ).unwrap();

            },
            [dispatch]
        );

    /*
    |--------------------------------------------------------------------------
    | Clear VRM Error
    |--------------------------------------------------------------------------
    */

    const clearError =
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
    | Derived State
    |--------------------------------------------------------------------------
    */

    const hasInstallation =
        Boolean(
            installation
        );

    const hasDashboard =
        Boolean(
            dashboard
        );

    const hasStatistics =
        Boolean(
            statistics
        );

    const hasData =
        hasInstallation ||
        hasDashboard ||
        hasStatistics;

    /*
    |--------------------------------------------------------------------------
    | Hook Contract
    |--------------------------------------------------------------------------
    |
    | This is the only interface the VRM page needs.
    |
    */

    return {

        /*
        |--------------------------------------------------------------------------
        | Normalized VRM Data
        |--------------------------------------------------------------------------
        */

        installation,
        dashboard,
        statistics,

        /*
        |--------------------------------------------------------------------------
        | Request State
        |--------------------------------------------------------------------------
        */

        loading,
        refreshing,
        error,
        lastUpdated,

        /*
        |--------------------------------------------------------------------------
        | Derived State
        |--------------------------------------------------------------------------
        */

        hasInstallation,
        hasDashboard,
        hasStatistics,
        hasData,

        /*
        |--------------------------------------------------------------------------
        | Actions
        |--------------------------------------------------------------------------
        */

        refresh,
        reloadInstallation,
        refreshStatistics,
        clearError

    };

}