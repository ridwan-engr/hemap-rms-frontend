import { useCallback } from "react";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    fetchSettings,
    fetchSetting,
    createNewSetting,
    updateExistingSetting,
    deleteExistingSetting,
    setCategory,
    clearSelectedSetting,
    clearSettingsError
} from "../../../store/slices/settingsSlice.js";

const DEFAULT_SETTINGS_STATE = {
    settings: [],
    selectedSetting: null,
    loading: false,
    refreshing: false,
    error: null,
    lastUpdated: null,
    category: "ALL"
};

export default function useSettings() {
    const dispatch = useDispatch();

    /*
    |--------------------------------------------------------------------------
    | Redux State
    |--------------------------------------------------------------------------
    */

    const settingsState = useSelector(
        state =>
            state?.settings ??
            DEFAULT_SETTINGS_STATE
    );

    const {
        settings,
        selectedSetting,
        loading,
        refreshing,
        error,
        lastUpdated,
        category
    } = settingsState;

    /*
    |--------------------------------------------------------------------------
    | Reload
    |--------------------------------------------------------------------------
    */

    const reload = useCallback(() => {
        return dispatch(
            fetchSettings()
        );
    }, [dispatch]);

    /*
    |--------------------------------------------------------------------------
    | Load Single Setting
    |--------------------------------------------------------------------------
    */

    const loadSetting = useCallback(
        settingId => {
            return dispatch(
                fetchSetting(settingId)
            );
        },
        [dispatch]
    );

    /*
    |--------------------------------------------------------------------------
    | Create
    |--------------------------------------------------------------------------
    */

    const createSetting = useCallback(
        payload => {
            return dispatch(
                createNewSetting(payload)
            );
        },
        [dispatch]
    );

    /*
    |--------------------------------------------------------------------------
    | Update
    |--------------------------------------------------------------------------
    */

    const updateSetting = useCallback(
        (
            settingId,
            payload
        ) => {
            return dispatch(
                updateExistingSetting({
                    settingId,
                    payload
                })
            );
        },
        [dispatch]
    );

    /*
    |--------------------------------------------------------------------------
    | Delete
    |--------------------------------------------------------------------------
    */

    const deleteSetting = useCallback(
        settingId => {
            return dispatch(
                deleteExistingSetting(
                    settingId
                )
            );
        },
        [dispatch]
    );

    /*
    |--------------------------------------------------------------------------
    | Category
    |--------------------------------------------------------------------------
    */

    const updateCategory = useCallback(
        value => {
            dispatch(
                setCategory(value)
            );
        },
        [dispatch]
    );

    /*
    |--------------------------------------------------------------------------
    | Clear Selection
    |--------------------------------------------------------------------------
    */

    const clearSelection = useCallback(() => {
        dispatch(
            clearSelectedSetting()
        );
    }, [dispatch]);

    /*
    |--------------------------------------------------------------------------
    | Clear Error
    |--------------------------------------------------------------------------
    */

    const clearError = useCallback(() => {
        dispatch(
            clearSettingsError()
        );
    }, [dispatch]);

    /*
    |--------------------------------------------------------------------------
    | Local Category Filtering
    |--------------------------------------------------------------------------
    */

    const filteredSettings =
        category === "ALL"
            ? settings
            : settings.filter(
                setting =>
                    setting?.category ===
                    category
            );

    /*
    |--------------------------------------------------------------------------
    | Public API
    |--------------------------------------------------------------------------
    */

    return {
        settings,

        filteredSettings,

        selectedSetting,

        loading,

        refreshing,

        error,

        lastUpdated,

        category,

        reload,

        loadSetting,

        createSetting,

        updateSetting,

        deleteSetting,

        updateCategory,

        clearSelection,

        clearError
    };
}