import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit";

import {
    getInstallations,
    getInstallation,
    createInstallation,
    updateInstallation,
    deleteInstallation,
    synchronizeInstallation,
    getInstallationStatistics
} from "../../features/installation/api/installationApi.js";


/*
|--------------------------------------------------------------------------
| Error Helper
|--------------------------------------------------------------------------
*/

const getErrorMessage = error => {

    return (
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.response?.data ||
        error?.message ||
        "Installation request failed"
    );

};


/*
|--------------------------------------------------------------------------
| Async Thunks
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| Fetch Installations
|--------------------------------------------------------------------------
|
| GET /api/installations
|
*/

export const fetchInstallations = createAsyncThunk(

    "installations/fetchInstallations",

    async (
        filters = {},
        { rejectWithValue }
    ) => {

        try {

            return await getInstallations(
                filters
            );

        }

        catch (error) {

            return rejectWithValue(
                getErrorMessage(error)
            );

        }

    }

);


/*
|--------------------------------------------------------------------------
| Fetch Single Installation
|--------------------------------------------------------------------------
|
| GET /api/installations/:id
|
*/

export const fetchInstallation = createAsyncThunk(

    "installations/fetchInstallation",

    async (
        id,
        { rejectWithValue }
    ) => {

        try {

            return await getInstallation(
                id
            );

        }

        catch (error) {

            return rejectWithValue(
                getErrorMessage(error)
            );

        }

    }

);


/*
|--------------------------------------------------------------------------
| Create Installation
|--------------------------------------------------------------------------
|
| POST /api/installations
|
*/

export const addInstallation = createAsyncThunk(

    "installations/addInstallation",

    async (
        payload,
        { rejectWithValue }
    ) => {

        try {

            return await createInstallation(
                payload
            );

        }

        catch (error) {

            return rejectWithValue(
                getErrorMessage(error)
            );

        }

    }

);


/*
|--------------------------------------------------------------------------
| Update Installation
|--------------------------------------------------------------------------
|
| PUT /api/installations/:id
|
*/

export const editInstallation = createAsyncThunk(

    "installations/editInstallation",

    async (
        { id, data },
        { rejectWithValue }
    ) => {

        try {

            return await updateInstallation(
                id,
                data
            );

        }

        catch (error) {

            return rejectWithValue(
                getErrorMessage(error)
            );

        }

    }

);


/*
|--------------------------------------------------------------------------
| Delete Installation
|--------------------------------------------------------------------------
|
| DELETE /api/installations/:id
|
*/

export const removeInstallation = createAsyncThunk(

    "installations/removeInstallation",

    async (
        id,
        { rejectWithValue }
    ) => {

        try {

            await deleteInstallation(
                id
            );

            return id;

        }

        catch (error) {

            return rejectWithValue(
                getErrorMessage(error)
            );

        }

    }

);


/*
|--------------------------------------------------------------------------
| Synchronize Installation
|--------------------------------------------------------------------------
|
| POST /api/installations/:id/synchronize
|
*/

export const syncInstallation = createAsyncThunk(

    "installations/syncInstallation",

    async (
        id,
        { rejectWithValue }
    ) => {

        try {

            return await synchronizeInstallation(
                id
            );

        }

        catch (error) {

            return rejectWithValue(
                getErrorMessage(error)
            );

        }

    }

);


/*
|--------------------------------------------------------------------------
| Fetch Installation Statistics
|--------------------------------------------------------------------------
|
| GET /api/installations/:id/statistics
|
*/

export const fetchInstallationStatistics = createAsyncThunk(

    "installations/fetchInstallationStatistics",

    async (
        id,
        { rejectWithValue }
    ) => {

        try {

            return await getInstallationStatistics(
                id
            );

        }

        catch (error) {

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

    /*
    |--------------------------------------------------------------------------
    | Collection
    |--------------------------------------------------------------------------
    */

    items: [],

    total: 0,

    pagination: null,


    /*
    |--------------------------------------------------------------------------
    | Selected Installation
    |--------------------------------------------------------------------------
    */

    selected: null,


    /*
    |--------------------------------------------------------------------------
    | Statistics
    |--------------------------------------------------------------------------
    */

    statistics: null,


    /*
    |--------------------------------------------------------------------------
    | Filters
    |--------------------------------------------------------------------------
    */

    filters: {},


    /*
    |--------------------------------------------------------------------------
    | Loading States
    |--------------------------------------------------------------------------
    */

    loading: false,

    detailsLoading: false,

    createLoading: false,

    updateLoading: false,

    deleteLoading: false,

    syncLoading: false,

    statisticsLoading: false,


    /*
    |--------------------------------------------------------------------------
    | Error States
    |--------------------------------------------------------------------------
    */

    error: null,

    detailsError: null,

    createError: null,

    updateError: null,

    deleteError: null,

    syncError: null,

    statisticsError: null,


    /*
    |--------------------------------------------------------------------------
    | Timestamps
    |--------------------------------------------------------------------------
    */

    lastUpdated: null,

    lastSynchronized: null

};


/*
|--------------------------------------------------------------------------
| Slice
|--------------------------------------------------------------------------
*/

const installationSlice = createSlice({

    name: "installations",

    initialState,

    reducers: {


        /*
        |--------------------------------------------------------------------------
        | Set Filters
        |--------------------------------------------------------------------------
        */

        setInstallationFilters(
            state,
            action
        ) {

            state.filters =
                action.payload || {};

        },


        /*
        |--------------------------------------------------------------------------
        | Clear Filters
        |--------------------------------------------------------------------------
        */

        clearInstallationFilters(
            state
        ) {

            state.filters = {};

        },


        /*
        |--------------------------------------------------------------------------
        | Set Selected Installation
        |--------------------------------------------------------------------------
        */

        setSelectedInstallation(
            state,
            action
        ) {

            state.selected =
                action.payload || null;

        },


        /*
        |--------------------------------------------------------------------------
        | Clear Selected Installation
        |--------------------------------------------------------------------------
        */

        clearSelectedInstallation(
            state
        ) {

            state.selected = null;

        },


        /*
        |--------------------------------------------------------------------------
        | Clear Statistics
        |--------------------------------------------------------------------------
        */

        clearInstallationStatistics(
            state
        ) {

            state.statistics = null;

            state.statisticsError = null;

        },


        /*
        |--------------------------------------------------------------------------
        | Clear Errors
        |--------------------------------------------------------------------------
        */

        clearInstallationErrors(
            state
        ) {

            state.error = null;

            state.detailsError = null;

            state.createError = null;

            state.updateError = null;

            state.deleteError = null;

            state.syncError = null;

            state.statisticsError = null;

        },


        /*
        |--------------------------------------------------------------------------
        | Clear Installation State
        |--------------------------------------------------------------------------
        */

        clearInstallations(
            state
        ) {

            state.items = [];

            state.total = 0;

            state.pagination = null;

            state.selected = null;

            state.statistics = null;

            state.error = null;

            state.detailsError = null;

            state.createError = null;

            state.updateError = null;

            state.deleteError = null;

            state.syncError = null;

            state.statisticsError = null;

            state.lastUpdated = null;

            state.lastSynchronized = null;

        }

    },


    /*
    |--------------------------------------------------------------------------
    | Extra Reducers
    |--------------------------------------------------------------------------
    */

    extraReducers: builder => {


        /*
        |--------------------------------------------------------------------------
        | Fetch Installations
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                fetchInstallations.pending,
                state => {

                    state.loading = true;

                    state.error = null;

                }
            )

            .addCase(
                fetchInstallations.fulfilled,
                (state, action) => {

                    state.loading = false;

                    /*
                    |----------------------------------------------------------
                    | Support both:
                    |
                    | [
                    |   installation1,
                    |   installation2
                    | ]
                    |
                    | and:
                    |
                    | {
                    |   items: [],
                    |   total: 10,
                    |   pagination: {}
                    | }
                    |----------------------------------------------------------
                    */

                    if (
                        Array.isArray(
                            action.payload
                        )
                    ) {

                        state.items =
                            action.payload;

                        state.total =
                            action.payload.length;

                        state.pagination =
                            null;

                    }

                    else {

                        state.items =
                            action.payload?.items ||
                            action.payload?.installations ||
                            action.payload?.data ||
                            [];

                        state.total =
                            action.payload?.total ??
                            state.items.length;

                        state.pagination =
                            action.payload?.pagination ||
                            null;

                    }

                    state.lastUpdated =
                        new Date().toISOString();

                }
            )

            .addCase(
                fetchInstallations.rejected,
                (state, action) => {

                    state.loading = false;

                    state.error =
                        action.payload ||
                        "Unable to load installations";

                }
            );


        /*
        |--------------------------------------------------------------------------
        | Fetch Single Installation
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                fetchInstallation.pending,
                state => {

                    state.detailsLoading = true;

                    state.detailsError = null;

                }
            )

            .addCase(
                fetchInstallation.fulfilled,
                (state, action) => {

                    state.detailsLoading = false;

                    state.selected =
                        action.payload;

                }
            )

            .addCase(
                fetchInstallation.rejected,
                (state, action) => {

                    state.detailsLoading = false;

                    state.detailsError =
                        action.payload ||
                        "Unable to load installation";

                }
            );


        /*
        |--------------------------------------------------------------------------
        | Create Installation
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                addInstallation.pending,
                state => {

                    state.createLoading = true;

                    state.createError = null;

                }
            )

            .addCase(
                addInstallation.fulfilled,
                (state, action) => {

                    state.createLoading = false;

                    const installation =
                        action.payload;

                    if (installation) {

                        state.items = [
                            installation,
                            ...state.items
                        ];

                        state.total += 1;

                    }

                    state.lastUpdated =
                        new Date().toISOString();

                }
            )

            .addCase(
                addInstallation.rejected,
                (state, action) => {

                    state.createLoading = false;

                    state.createError =
                        action.payload ||
                        "Unable to create installation";

                }
            );


        /*
        |--------------------------------------------------------------------------
        | Update Installation
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                editInstallation.pending,
                state => {

                    state.updateLoading = true;

                    state.updateError = null;

                }
            )

            .addCase(
                editInstallation.fulfilled,
                (state, action) => {

                    state.updateLoading = false;

                    const updated =
                        action.payload;

                    if (!updated) {
                        return;
                    }

                    /*
                    |----------------------------------------------------------
                    | Update collection
                    |----------------------------------------------------------
                    */

                    const id =
                        updated._id ||
                        updated.id;

                    const index =
                        state.items.findIndex(
                            item =>
                                (
                                    item._id ||
                                    item.id
                                ) === id
                        );

                    if (index !== -1) {

                        state.items[index] =
                            updated;

                    }


                    /*
                    |----------------------------------------------------------
                    | Update selected installation
                    |----------------------------------------------------------
                    */

                    const selectedId =
                        state.selected?._id ||
                        state.selected?.id;

                    if (
                        selectedId &&
                        selectedId === id
                    ) {

                        state.selected =
                            updated;

                    }

                    state.lastUpdated =
                        new Date().toISOString();

                }
            )

            .addCase(
                editInstallation.rejected,
                (state, action) => {

                    state.updateLoading = false;

                    state.updateError =
                        action.payload ||
                        "Unable to update installation";

                }
            );


        /*
        |--------------------------------------------------------------------------
        | Delete Installation
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                removeInstallation.pending,
                state => {

                    state.deleteLoading = true;

                    state.deleteError = null;

                }
            )

            .addCase(
                removeInstallation.fulfilled,
                (state, action) => {

                    state.deleteLoading = false;

                    const id =
                        action.payload;

                    state.items =
                        state.items.filter(
                            item =>
                                (
                                    item._id ||
                                    item.id
                                ) !== id
                        );

                    state.total =
                        Math.max(
                            0,
                            state.total - 1
                        );

                    const selectedId =
                        state.selected?._id ||
                        state.selected?.id;

                    if (
                        selectedId === id
                    ) {

                        state.selected =
                            null;

                    }

                    state.lastUpdated =
                        new Date().toISOString();

                }
            )

            .addCase(
                removeInstallation.rejected,
                (state, action) => {

                    state.deleteLoading = false;

                    state.deleteError =
                        action.payload ||
                        "Unable to delete installation";

                }
            );


        /*
        |--------------------------------------------------------------------------
        | Synchronize Installation
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                syncInstallation.pending,
                state => {

                    state.syncLoading = true;

                    state.syncError = null;

                }
            )

            .addCase(
                syncInstallation.fulfilled,
                (state, action) => {

                    state.syncLoading = false;

                    /*
                    |----------------------------------------------------------
                    | Some backends return the synchronized
                    | installation while others return a
                    | synchronization result.
                    |----------------------------------------------------------
                    */

                    const result =
                        action.payload;

                    if (
                        result &&
                        (
                            result._id ||
                            result.id
                        )
                    ) {

                        const id =
                            result._id ||
                            result.id;

                        const index =
                            state.items.findIndex(
                                item =>
                                    (
                                        item._id ||
                                        item.id
                                    ) === id
                            );

                        if (index !== -1) {

                            state.items[index] =
                                result;

                        }

                        const selectedId =
                            state.selected?._id ||
                            state.selected?.id;

                        if (
                            selectedId === id
                        ) {

                            state.selected =
                                result;

                        }

                    }

                    state.lastSynchronized =
                        new Date().toISOString();

                    state.lastUpdated =
                        new Date().toISOString();

                }
            )

            .addCase(
                syncInstallation.rejected,
                (state, action) => {

                    state.syncLoading = false;

                    state.syncError =
                        action.payload ||
                        "Installation synchronization failed";

                }
            );


        /*
        |--------------------------------------------------------------------------
        | Installation Statistics
        |--------------------------------------------------------------------------
        */

        builder

            .addCase(
                fetchInstallationStatistics.pending,
                state => {

                    state.statisticsLoading = true;

                    state.statisticsError = null;

                }
            )

            .addCase(
                fetchInstallationStatistics.fulfilled,
                (state, action) => {

                    state.statisticsLoading = false;

                    state.statistics =
                        action.payload;

                }
            )

            .addCase(
                fetchInstallationStatistics.rejected,
                (state, action) => {

                    state.statisticsLoading = false;

                    state.statisticsError =
                        action.payload ||
                        "Unable to load installation statistics";

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

    setInstallationFilters,

    clearInstallationFilters,

    setSelectedInstallation,

    clearSelectedInstallation,

    clearInstallationStatistics,

    clearInstallationErrors,

    clearInstallations

} = installationSlice.actions;


/*
|--------------------------------------------------------------------------
| Selectors
|--------------------------------------------------------------------------
*/

export const selectInstallations =
    state =>
        state.installations.items;

export const selectInstallationTotal =
    state =>
        state.installations.total;

export const selectInstallationPagination =
    state =>
        state.installations.pagination;

export const selectSelectedInstallation =
    state =>
        state.installations.selected;

export const selectInstallationStatistics =
    state =>
        state.installations.statistics;

export const selectInstallationFilters =
    state =>
        state.installations.filters;


/*
|--------------------------------------------------------------------------
| Loading Selectors
|--------------------------------------------------------------------------
*/

export const selectInstallationsLoading =
    state =>
        state.installations.loading;

export const selectInstallationDetailsLoading =
    state =>
        state.installations.detailsLoading;

export const selectInstallationCreateLoading =
    state =>
        state.installations.createLoading;

export const selectInstallationUpdateLoading =
    state =>
        state.installations.updateLoading;

export const selectInstallationDeleteLoading =
    state =>
        state.installations.deleteLoading;

export const selectInstallationSyncLoading =
    state =>
        state.installations.syncLoading;

export const selectInstallationStatisticsLoading =
    state =>
        state.installations.statisticsLoading;


/*
|--------------------------------------------------------------------------
| Error Selectors
|--------------------------------------------------------------------------
*/

export const selectInstallationError =
    state =>
        state.installations.error;

export const selectInstallationDetailsError =
    state =>
        state.installations.detailsError;

export const selectInstallationCreateError =
    state =>
        state.installations.createError;

export const selectInstallationUpdateError =
    state =>
        state.installations.updateError;

export const selectInstallationDeleteError =
    state =>
        state.installations.deleteError;

export const selectInstallationSyncError =
    state =>
        state.installations.syncError;

export const selectInstallationStatisticsError =
    state =>
        state.installations.statisticsError;


/*
|--------------------------------------------------------------------------
| Timestamp Selectors
|--------------------------------------------------------------------------
*/

export const selectInstallationLastUpdated =
    state =>
        state.installations.lastUpdated;

export const selectInstallationLastSynchronized =
    state =>
        state.installations.lastSynchronized;


/*
|--------------------------------------------------------------------------
| Default Export
|--------------------------------------------------------------------------
*/

export default installationSlice.reducer;