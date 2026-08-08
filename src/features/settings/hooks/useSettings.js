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
    clearSelectedSetting

} from "../../../store/slices/settingsSlice.js";

/*
|--------------------------------------------------------------------------
| useSettings
|--------------------------------------------------------------------------
|
| Central hook for System Settings.
|
| Components should NEVER dispatch Redux actions directly.
|
|--------------------------------------------------------------------------
*/

export default function useSettings() {

    const dispatch = useDispatch();

    /*
    |--------------------------------------------------------------------------
    | Redux State
    |--------------------------------------------------------------------------
    */

    const {

        settings,

        selectedSetting,

        loading,

        refreshing,

        error,

        lastUpdated,

        category

    } = useSelector(

        state => state.settings

    );

    /*
    |--------------------------------------------------------------------------
    | Reload
    |--------------------------------------------------------------------------
    */

    const reload = useCallback(

        () => {

            return dispatch(

                fetchSettings()

            );

        },

        [

            dispatch

        ]

    );

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

        [

            dispatch

        ]

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

        [

            dispatch

        ]

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

        [

            dispatch

        ]

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

        [

            dispatch

        ]

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

                clearSelectedSetting()

            );

        },

        [

            dispatch

        ]

    );

    /*
    |--------------------------------------------------------------------------
    | Category Filter
    |--------------------------------------------------------------------------
    |
    | Category filtering happens locally because
    | the API exposes only GET /settings.
    |
    */

    const filteredSettings =

        category === "ALL"

            ? settings

            : settings.filter(

                setting =>

                    setting.category === category

            );

    /*
    |--------------------------------------------------------------------------
    | Public Hook API
    |--------------------------------------------------------------------------
    */

    return {

        /*
        | State
        */

        settings,

        filteredSettings,

        selectedSetting,

        loading,

        refreshing,

        error,

        lastUpdated,

        category,

        /*
        | Operations
        */

        reload,

        loadSetting,

        createSetting,

        updateSetting,

        deleteSetting,

        /*
        | Local Redux Controls
        */

        updateCategory,

        clearSelection

    };

}