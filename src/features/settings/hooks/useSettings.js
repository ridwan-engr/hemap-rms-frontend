import { useCallback } from "react";

import {

    useDispatch,
    useSelector

} from "react-redux";

import {

    fetchSettings,
    fetchSetting,
    fetchSettingByKey,

    createNewSetting,
    updateExistingSetting,
    updateExistingSettingByKey,

    deleteExistingSetting,
    initializeSystemDefaults,

    setCategory,
    clearSelectedSetting

} from "../../../store/slices/settingsSlice";

/*
|--------------------------------------------------------------------------
| useSettings
|--------------------------------------------------------------------------
*/

export default function useSettings() {

    const dispatch = useDispatch();

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

        () => dispatch(

            fetchSettings()

        ),

        [

            dispatch

        ]

    );

    /*
    |--------------------------------------------------------------------------
    | Single Setting
    |--------------------------------------------------------------------------
    */

    const loadSetting = useCallback(

        settingId => dispatch(

            fetchSetting(settingId)

        ),

        [

            dispatch

        ]

    );

    /*
    |--------------------------------------------------------------------------
    | Load By Key
    |--------------------------------------------------------------------------
    */

    const loadSettingByKey = useCallback(

        key => dispatch(

            fetchSettingByKey(key)

        ),

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

        payload => dispatch(

            createNewSetting(payload)

        ),

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

            id,

            payload

        ) => dispatch(

            updateExistingSetting({

                id,

                payload

            })

        ),

        [

            dispatch

        ]

    );

    /*
    |--------------------------------------------------------------------------
    | Update By Key
    |--------------------------------------------------------------------------
    */

    const updateSettingByKey = useCallback(

        (

            key,

            payload

        ) => dispatch(

            updateExistingSettingByKey({

                key,

                payload

            })

        ),

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

        id => dispatch(

            deleteExistingSetting(id)

        ),

        [

            dispatch

        ]

    );

    /*
    |--------------------------------------------------------------------------
    | Initialize Defaults
    |--------------------------------------------------------------------------
    */

    const initializeDefaults = useCallback(

        () => dispatch(

            initializeSystemDefaults()

        ),

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

        value => dispatch(

            setCategory(value)

        ),

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

        () => dispatch(

            clearSelectedSetting()

        ),

        [

            dispatch

        ]

    );

    /*
    |--------------------------------------------------------------------------
    | Category Filter
    |--------------------------------------------------------------------------
    */

    const filteredSettings =

        category === "ALL"

            ? settings

            : settings.filter(

                setting =>

                    setting.category === category

            );

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

        loadSettingByKey,

        createSetting,

        updateSetting,

        updateSettingByKey,

        deleteSetting,

        initializeDefaults,

        updateCategory,

        clearSelection

    };

}