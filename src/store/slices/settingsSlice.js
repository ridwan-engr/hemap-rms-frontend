import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";

import {
    getSettings,
    getSetting,
    createSetting as createSettingApi,
    updateSetting as updateSettingApi,
    deleteSetting as deleteSettingApi
} from "../../features/settings/api/settingsApi.js";

/*
|--------------------------------------------------------------------------
| Async Thunks
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Fetch All Settings
|--------------------------------------------------------------------------
*/

export const fetchSettings = createAsyncThunk(

    "settings/fetchSettings",

    async (_, { rejectWithValue }) => {

        try {

            return await getSettings();

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

/*
|--------------------------------------------------------------------------
| Fetch Single Setting
|--------------------------------------------------------------------------
*/

export const fetchSetting = createAsyncThunk(

    "settings/fetchSetting",

    async (settingId, { rejectWithValue }) => {

        try {

            return await getSetting(settingId);

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

/*
|--------------------------------------------------------------------------
| Create Setting
|--------------------------------------------------------------------------
*/

export const createNewSetting = createAsyncThunk(

    "settings/create",

    async (payload, { rejectWithValue }) => {

        try {

            return await createSettingApi(payload);

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

/*
|--------------------------------------------------------------------------
| Update Setting
|--------------------------------------------------------------------------
*/

export const updateExistingSetting = createAsyncThunk(

    "settings/update",

    async (

        {
            settingId,
            payload
        },

        { rejectWithValue }

    ) => {

        try {

            return await updateSettingApi(

                settingId,

                payload

            );

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

/*
|--------------------------------------------------------------------------
| Delete Setting
|--------------------------------------------------------------------------
*/

export const deleteExistingSetting = createAsyncThunk(

    "settings/delete",

    async (settingId, { rejectWithValue }) => {

        try {

            await deleteSettingApi(settingId);

            return settingId;

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

/*
|--------------------------------------------------------------------------
| Initial State
|--------------------------------------------------------------------------
*/

const initialState = {

    settings: [],

    selectedSetting: null,

    loading: false,

    refreshing: false,

    error: null,

    lastUpdated: null,

    category: "ALL"

};

/*
|--------------------------------------------------------------------------
| Slice
|--------------------------------------------------------------------------
*/

const settingsSlice = createSlice({

    name: "settings",

    initialState,

    reducers: {

        /*
        |--------------------------------------------------------------------------
        | Category
        |--------------------------------------------------------------------------
        */

        setCategory(state, action) {

            state.category = action.payload;

        },

        /*
        |--------------------------------------------------------------------------
        | Clear Selected Setting
        |--------------------------------------------------------------------------
        */

        clearSelectedSetting(state) {

            state.selectedSetting = null;

        }

    },

    extraReducers: builder => {

        /*
        |--------------------------------------------------------------------------
        | Fetch All Settings
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(

                fetchSettings.pending,

                state => {

                    state.loading = true;

                    state.error = null;

                }

            )

            .addCase(

                fetchSettings.fulfilled,

                (state, action) => {

                    state.loading = false;

                    state.refreshing = false;

                    /*
                    | API already returns:
                    |
                    | response.data?.data ?? response.data
                    |
                    */

                    state.settings =

                        Array.isArray(action.payload)

                            ? action.payload

                            : action.payload?.settings || [];

                    state.lastUpdated =

                        new Date().toISOString();

                }

            )

            .addCase(

                fetchSettings.rejected,

                (state, action) => {

                    state.loading = false;

                    state.refreshing = false;

                    state.error = action.payload;

                }

            );

        /*
        |--------------------------------------------------------------------------
        | Fetch Single Setting
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(

                fetchSetting.pending,

                state => {

                    state.loading = true;

                    state.error = null;

                }

            )

            .addCase(

                fetchSetting.fulfilled,

                (state, action) => {

                    state.loading = false;

                    state.selectedSetting =

                        action.payload;

                }

            )

            .addCase(

                fetchSetting.rejected,

                (state, action) => {

                    state.loading = false;

                    state.error = action.payload;

                }

            );

        /*
        |--------------------------------------------------------------------------
        | Create Setting
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(

                createNewSetting.pending,

                state => {

                    state.loading = true;

                    state.error = null;

                }

            )

            .addCase(

                createNewSetting.fulfilled,

                (state, action) => {

                    state.loading = false;

                    const createdSetting =

                        action.payload;

                    /*
                    | Add the newly created setting
                    | when the API returns the object.
                    */

                    if (

                        createdSetting &&

                        typeof createdSetting === "object"

                    ) {

                        state.settings.push(

                            createdSetting

                        );

                    }

                    state.lastUpdated =

                        new Date().toISOString();

                }

            )

            .addCase(

                createNewSetting.rejected,

                (state, action) => {

                    state.loading = false;

                    state.error = action.payload;

                }

            );

        /*
        |--------------------------------------------------------------------------
        | Update Setting
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(

                updateExistingSetting.pending,

                state => {

                    state.loading = true;

                    state.error = null;

                }

            )

            .addCase(

                updateExistingSetting.fulfilled,

                (state, action) => {

                    state.loading = false;

                    const updatedSetting =

                        action.payload;

                    if (

                        updatedSetting &&

                        typeof updatedSetting === "object"

                    ) {

                        const settingId =

                            updatedSetting._id ||

                            updatedSetting.id;

                        const index =

                            state.settings.findIndex(

                                setting =>

                                    setting._id === settingId ||

                                    setting.id === settingId

                            );

                        if (index !== -1) {

                            state.settings[index] =

                                updatedSetting;

                        }

                        if (

                            state.selectedSetting &&

                            (

                                state.selectedSetting._id === settingId ||

                                state.selectedSetting.id === settingId

                            )

                        ) {

                            state.selectedSetting =

                                updatedSetting;

                        }

                    }

                    state.lastUpdated =

                        new Date().toISOString();

                }

            )

            .addCase(

                updateExistingSetting.rejected,

                (state, action) => {

                    state.loading = false;

                    state.error = action.payload;

                }

            );

        /*
        |--------------------------------------------------------------------------
        | Delete Setting
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(

                deleteExistingSetting.pending,

                state => {

                    state.loading = true;

                    state.error = null;

                }

            )

            .addCase(

                deleteExistingSetting.fulfilled,

                (state, action) => {

                    state.loading = false;

                    state.settings =

                        state.settings.filter(

                            setting =>

                                setting._id !== action.payload &&

                                setting.id !== action.payload

                        );

                    if (

                        state.selectedSetting &&

                        (

                            state.selectedSetting._id === action.payload ||

                            state.selectedSetting.id === action.payload

                        )

                    ) {

                        state.selectedSetting = null;

                    }

                    state.lastUpdated =

                        new Date().toISOString();

                }

            )

            .addCase(

                deleteExistingSetting.rejected,

                (state, action) => {

                    state.loading = false;

                    state.error = action.payload;

                }

            );

    }

});

/*
|--------------------------------------------------------------------------
| Actions
|--------------------------------------------------------------------------
*/

export const {

    setCategory,

    clearSelectedSetting

} = settingsSlice.actions;

/*
|--------------------------------------------------------------------------
| Reducer
|--------------------------------------------------------------------------
*/

export default settingsSlice.reducer;