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
| Error Normalizer
|--------------------------------------------------------------------------
*/

const getErrorMessage = error => {
    return (
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "An unexpected error occurred."
    );
};

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
        } catch (error) {
            return rejectWithValue(
                getErrorMessage(error)
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
            if (!settingId) {
                throw new Error("settingId is required");
            }

            return await getSetting(settingId);
        } catch (error) {
            return rejectWithValue(
                getErrorMessage(error)
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
    "settings/createSetting",

    async (payload, { rejectWithValue }) => {
        try {
            return await createSettingApi(payload);
        } catch (error) {
            return rejectWithValue(
                getErrorMessage(error)
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
    "settings/updateSetting",

    async (
        {
            settingId,
            payload
        },
        { rejectWithValue }
    ) => {
        try {
            if (!settingId) {
                throw new Error(
                    "settingId is required"
                );
            }

            return await updateSettingApi(
                settingId,
                payload
            );
        } catch (error) {
            return rejectWithValue(
                getErrorMessage(error)
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
    "settings/deleteSetting",

    async (settingId, { rejectWithValue }) => {
        try {
            if (!settingId) {
                throw new Error(
                    "settingId is required"
                );
            }

            await deleteSettingApi(settingId);

            return settingId;
        } catch (error) {
            return rejectWithValue(
                getErrorMessage(error)
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
        },

        clearSettingsError(state) {
            state.error = null;
        }
    },

    extraReducers: builder => {
        /*
        |--------------------------------------------------------------------------
        | Fetch Settings
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

                    const payload = action.payload;

                    if (Array.isArray(payload)) {
                        state.settings = payload;
                    } else if (
                        Array.isArray(
                            payload?.settings
                        )
                    ) {
                        state.settings =
                            payload.settings;
                    } else {
                        state.settings = [];
                    }

                    state.lastUpdated =
                        new Date().toISOString();
                }
            )

            .addCase(
                fetchSettings.rejected,
                (state, action) => {
                    state.loading = false;
                    state.refreshing = false;
                    state.error =
                        action.payload ||
                        "Failed to load settings.";
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
                    state.error =
                        action.payload ||
                        "Failed to load setting.";
                }
            );

        /*
        |--------------------------------------------------------------------------
        | Create
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

                    if (
                        createdSetting &&
                        typeof createdSetting ===
                            "object"
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
                    state.error =
                        action.payload ||
                        "Failed to create setting.";
                }
            );

        /*
        |--------------------------------------------------------------------------
        | Update
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
                        !updatedSetting ||
                        typeof updatedSetting !==
                            "object"
                    ) {
                        return;
                    }

                    const settingId =
                        updatedSetting._id ||
                        updatedSetting.id;

                    const index =
                        state.settings.findIndex(
                            setting =>
                                setting._id ===
                                    settingId ||
                                setting.id ===
                                    settingId
                        );

                    if (index !== -1) {
                        state.settings[index] =
                            updatedSetting;
                    } else {
                        state.settings.push(
                            updatedSetting
                        );
                    }

                    if (
                        state.selectedSetting &&
                        (
                            state.selectedSetting._id ===
                                settingId ||
                            state.selectedSetting.id ===
                                settingId
                        )
                    ) {
                        state.selectedSetting =
                            updatedSetting;
                    }

                    state.lastUpdated =
                        new Date().toISOString();
                }
            )

            .addCase(
                updateExistingSetting.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error =
                        action.payload ||
                        "Failed to update setting.";
                }
            );

        /*
        |--------------------------------------------------------------------------
        | Delete
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

                    const settingId =
                        action.payload;

                    state.settings =
                        state.settings.filter(
                            setting =>
                                setting._id !==
                                    settingId &&
                                setting.id !==
                                    settingId
                        );

                    if (
                        state.selectedSetting &&
                        (
                            state.selectedSetting._id ===
                                settingId ||
                            state.selectedSetting.id ===
                                settingId
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
                    state.error =
                        action.payload ||
                        "Failed to delete setting.";
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
    clearSelectedSetting,
    clearSettingsError
} = settingsSlice.actions;

/*
|--------------------------------------------------------------------------
| Reducer
|--------------------------------------------------------------------------
*/

export default settingsSlice.reducer;