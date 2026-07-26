import {

    createSlice,
    createAsyncThunk

} from "@reduxjs/toolkit";

import {

    getSettings,
    getSetting,
    getSettingByKey,

    createSetting,
    updateSetting,
    updateSettingByKey,
    deleteSetting,

    initializeDefaults

} from "../../features/settings/api/settingsApi";

/*
|--------------------------------------------------------------------------
| Async Thunks
|--------------------------------------------------------------------------
*/

export const fetchSettings = createAsyncThunk(

    "settings/fetchSettings",

    async (_, thunkAPI) => {

        try {

            return await getSettings();

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const fetchSetting = createAsyncThunk(

    "settings/fetchSetting",

    async (settingId, thunkAPI) => {

        try {

            return await getSetting(settingId);

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const fetchSettingByKey = createAsyncThunk(

    "settings/fetchSettingByKey",

    async (key, thunkAPI) => {

        try {

            return await getSettingByKey(key);

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const createNewSetting = createAsyncThunk(

    "settings/create",

    async (payload, thunkAPI) => {

        try {

            return await createSetting(payload);

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const updateExistingSetting = createAsyncThunk(

    "settings/update",

    async (

        {

            id,

            payload

        },

        thunkAPI

    ) => {

        try {

            return await updateSetting(

                id,

                payload

            );

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const updateExistingSettingByKey = createAsyncThunk(

    "settings/updateByKey",

    async (

        {

            key,

            payload

        },

        thunkAPI

    ) => {

        try {

            return await updateSettingByKey(

                key,

                payload

            );

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const deleteExistingSetting = createAsyncThunk(

    "settings/delete",

    async (id, thunkAPI) => {

        try {

            await deleteSetting(id);

            return id;

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const initializeSystemDefaults = createAsyncThunk(

    "settings/initializeDefaults",

    async (_, thunkAPI) => {

        try {

            return await initializeDefaults();

        }

        catch (error) {

            return thunkAPI.rejectWithValue(

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

        setCategory(state, action) {

            state.category = action.payload;

        },

        clearSelectedSetting(state) {

            state.selectedSetting = null;

        }

    },

    extraReducers: builder => {

        builder

            .addCase(fetchSettings.pending, state => {

                state.loading = true;

                state.error = null;

            })

            .addCase(fetchSettings.fulfilled, (state, action) => {

                state.loading = false;

                state.refreshing = false;

                state.settings = action.payload.data || [];

                state.lastUpdated = Date.now();

            })

            .addCase(fetchSettings.rejected, (state, action) => {

                state.loading = false;

                state.refreshing = false;

                state.error = action.payload;

            })

            .addCase(fetchSetting.fulfilled, (state, action) => {

                state.selectedSetting = action.payload.data;

            })

            .addCase(fetchSettingByKey.fulfilled, (state, action) => {

                state.selectedSetting = action.payload.data;

            })

            .addCase(createNewSetting.fulfilled, state => {

                state.lastUpdated = Date.now();

            })

            .addCase(updateExistingSetting.fulfilled, state => {

                state.lastUpdated = Date.now();

            })

            .addCase(updateExistingSettingByKey.fulfilled, state => {

                state.lastUpdated = Date.now();

            })

            .addCase(deleteExistingSetting.fulfilled, (state, action) => {

                state.settings = state.settings.filter(

                    setting => setting._id !== action.payload

                );

            })

            .addCase(initializeSystemDefaults.fulfilled, state => {

                state.lastUpdated = Date.now();

            });

    }

});

export const {

    setCategory,

    clearSelectedSetting

} = settingsSlice.actions;

export default settingsSlice.reducer;