import {
    createSlice,
    createAsyncThunk
} from "@reduxjs/toolkit";

import {
    getSites,
    getSite,
    createSite as createSiteApi,
    updateSite as updateSiteApi,
    activateSite as activateSiteApi,
    deactivateSite as deactivateSiteApi,
    deleteSite as deleteSiteApi
} from "../../features/sites/api/siteApi.js";

/*
|--------------------------------------------------------------------------
| Async Thunks
|--------------------------------------------------------------------------
*/

/**
 * Fetch all sites
 *
 * Backend:
 * GET /sites
 */
export const fetchSites = createAsyncThunk(
    "sites/fetchSites",

    async (params = {}, { rejectWithValue }) => {
        try {
            return await getSites(params);
        }

        catch (error) {
            return rejectWithValue(
                error.response?.data ||
                error.message
            );
        }
    }
);

/**
 * Fetch single site
 *
 * Backend:
 * GET /sites/:id
 */
export const fetchSite = createAsyncThunk(
    "sites/fetchSite",

    async (siteId, { rejectWithValue }) => {
        try {
            return await getSite(siteId);
        }

        catch (error) {
            return rejectWithValue(
                error.response?.data ||
                error.message
            );
        }
    }
);

/**
 * Create site
 *
 * Backend:
 * POST /sites
 */
export const createSite = createAsyncThunk(
    "sites/createSite",

    async (payload, { rejectWithValue }) => {
        try {
            return await createSiteApi(payload);
        }

        catch (error) {
            return rejectWithValue(
                error.response?.data ||
                error.message
            );
        }
    }
);

/**
 * Update site
 *
 * Backend:
 * PUT /sites/:id
 */
export const updateSite = createAsyncThunk(
    "sites/updateSite",

    async (
        {
            siteId,
            payload
        },
        {
            rejectWithValue
        }
    ) => {
        try {
            return await updateSiteApi(
                siteId,
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

/**
 * Activate site
 *
 * Backend:
 * PATCH /sites/:id/activate
 */
export const activateSite = createAsyncThunk(
    "sites/activateSite",

    async (siteId, { rejectWithValue }) => {
        try {
            return await activateSiteApi(siteId);
        }

        catch (error) {
            return rejectWithValue(
                error.response?.data ||
                error.message
            );
        }
    }
);

/**
 * Deactivate site
 *
 * Backend:
 * PATCH /sites/:id/deactivate
 */
export const deactivateSite = createAsyncThunk(
    "sites/deactivateSite",

    async (siteId, { rejectWithValue }) => {
        try {
            return await deactivateSiteApi(siteId);
        }

        catch (error) {
            return rejectWithValue(
                error.response?.data ||
                error.message
            );
        }
    }
);

/**
 * Delete site
 *
 * Backend:
 * DELETE /sites/:id
 */
export const deleteSite = createAsyncThunk(
    "sites/deleteSite",

    async (siteId, { rejectWithValue }) => {
        try {
            await deleteSiteApi(siteId);

            return siteId;
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
    sites: [],

    total: 0,

    selectedSite: null,

    filters: {},

    paginationModel: {
        page: 0,
        pageSize: 25
    },

    loading: false,

    selectedSiteLoading: false,

    creating: false,

    updating: false,

    activating: false,

    deactivating: false,

    deleting: false,

    error: null,

    lastUpdated: null
};

/*
|--------------------------------------------------------------------------
| Slice
|--------------------------------------------------------------------------
*/

const siteSlice = createSlice({

    name: "sites",

    initialState,

    reducers: {

        /**
         * Set site filters
         */
        setSiteFilters(state, action) {

            state.filters = action.payload;
        },

        /**
         * Set pagination
         */
        setPaginationModel(state, action) {

            state.paginationModel = action.payload;
        },

        /**
         * Set selected site manually
         */
        setSelectedSite(state, action) {

            state.selectedSite = action.payload;
        },

        /**
         * Clear selected site
         */
        clearSelectedSite(state) {

            state.selectedSite = null;
        },

        /**
         * Clear site error
         */
        clearSiteError(state) {

            state.error = null;
        }

    },

    extraReducers: builder => {

        builder

        /*
        |--------------------------------------------------------------------------
        | Fetch Sites
        |--------------------------------------------------------------------------
        */

        .addCase(
            fetchSites.pending,
            state => {

                state.loading = true;

                state.error = null;
            }
        )

        .addCase(
            fetchSites.fulfilled,
            (state, action) => {

                state.loading = false;

                /*
                 * Supports APIs returning:
                 *
                 * {
                 *   rows: [],
                 *   total: 10
                 * }
                 *
                 * or:
                 *
                 * []
                 */

                if (Array.isArray(action.payload)) {

                    state.sites = action.payload;

                    state.total = action.payload.length;

                }

                else {

                    state.sites =
                        action.payload?.rows ??
                        action.payload?.sites ??
                        action.payload?.data ??
                        [];

                    state.total =
                        action.payload?.total ??
                        state.sites.length;
                }

                state.lastUpdated =
                    new Date().toISOString();
            }
        )

        .addCase(
            fetchSites.rejected,
            (state, action) => {

                state.loading = false;

                state.error = action.payload;
            }
        )

        /*
        |--------------------------------------------------------------------------
        | Fetch Single Site
        |--------------------------------------------------------------------------
        */

        .addCase(
            fetchSite.pending,
            state => {

                state.selectedSiteLoading = true;

                state.error = null;
            }
        )

        .addCase(
            fetchSite.fulfilled,
            (state, action) => {

                state.selectedSiteLoading = false;

                state.selectedSite =
                    action.payload?.data ??
                    action.payload;
            }
        )

        .addCase(
            fetchSite.rejected,
            (state, action) => {

                state.selectedSiteLoading = false;

                state.error = action.payload;
            }
        )

        /*
        |--------------------------------------------------------------------------
        | Create Site
        |--------------------------------------------------------------------------
        */

        .addCase(
            createSite.pending,
            state => {

                state.creating = true;

                state.error = null;
            }
        )

        .addCase(
            createSite.fulfilled,
            (state, action) => {

                state.creating = false;

                const createdSite =
                    action.payload?.data ??
                    action.payload;

                if (createdSite) {

                    state.sites.unshift(
                        createdSite
                    );

                    state.total += 1;
                }

                state.lastUpdated =
                    new Date().toISOString();
            }
        )

        .addCase(
            createSite.rejected,
            (state, action) => {

                state.creating = false;

                state.error = action.payload;
            }
        )

        /*
        |--------------------------------------------------------------------------
        | Update Site
        |--------------------------------------------------------------------------
        */

        .addCase(
            updateSite.pending,
            state => {

                state.updating = true;

                state.error = null;
            }
        )

        .addCase(
            updateSite.fulfilled,
            (state, action) => {

                state.updating = false;

                const updatedSite =
                    action.payload?.data ??
                    action.payload;

                if (updatedSite) {

                    const siteId =
                        updatedSite._id ??
                        updatedSite.id;

                    const index =
                        state.sites.findIndex(
                            site =>
                                (site._id ?? site.id) ===
                                siteId
                        );

                    if (index !== -1) {

                        state.sites[index] =
                            updatedSite;
                    }

                    if (
                        state.selectedSite &&
                        (
                            state.selectedSite._id ??
                            state.selectedSite.id
                        ) === siteId
                    ) {

                        state.selectedSite =
                            updatedSite;
                    }
                }

                state.lastUpdated =
                    new Date().toISOString();
            }
        )

        .addCase(
            updateSite.rejected,
            (state, action) => {

                state.updating = false;

                state.error = action.payload;
            }
        )

        /*
        |--------------------------------------------------------------------------
        | Activate Site
        |--------------------------------------------------------------------------
        */

        .addCase(
            activateSite.pending,
            state => {

                state.activating = true;

                state.error = null;
            }
        )

        .addCase(
            activateSite.fulfilled,
            (state, action) => {

                state.activating = false;

                const activatedSite =
                    action.payload?.data ??
                    action.payload;

                if (activatedSite) {

                    const siteId =
                        activatedSite._id ??
                        activatedSite.id;

                    const index =
                        state.sites.findIndex(
                            site =>
                                (site._id ?? site.id) ===
                                siteId
                        );

                    if (index !== -1) {

                        state.sites[index] =
                            activatedSite;
                    }

                    if (
                        state.selectedSite &&
                        (
                            state.selectedSite._id ??
                            state.selectedSite.id
                        ) === siteId
                    ) {

                        state.selectedSite =
                            activatedSite;
                    }
                }

                state.lastUpdated =
                    new Date().toISOString();
            }
        )

        .addCase(
            activateSite.rejected,
            (state, action) => {

                state.activating = false;

                state.error = action.payload;
            }
        )

        /*
        |--------------------------------------------------------------------------
        | Deactivate Site
        |--------------------------------------------------------------------------
        */

        .addCase(
            deactivateSite.pending,
            state => {

                state.deactivating = true;

                state.error = null;
            }
        )

        .addCase(
            deactivateSite.fulfilled,
            (state, action) => {

                state.deactivating = false;

                const deactivatedSite =
                    action.payload?.data ??
                    action.payload;

                if (deactivatedSite) {

                    const siteId =
                        deactivatedSite._id ??
                        deactivatedSite.id;

                    const index =
                        state.sites.findIndex(
                            site =>
                                (site._id ?? site.id) ===
                                siteId
                        );

                    if (index !== -1) {

                        state.sites[index] =
                            deactivatedSite;
                    }

                    if (
                        state.selectedSite &&
                        (
                            state.selectedSite._id ??
                            state.selectedSite.id
                        ) === siteId
                    ) {

                        state.selectedSite =
                            deactivatedSite;
                    }
                }

                state.lastUpdated =
                    new Date().toISOString();
            }
        )

        .addCase(
            deactivateSite.rejected,
            (state, action) => {

                state.deactivating = false;

                state.error = action.payload;
            }
        )

        /*
        |--------------------------------------------------------------------------
        | Delete Site
        |--------------------------------------------------------------------------
        */

        .addCase(
            deleteSite.pending,
            state => {

                state.deleting = true;

                state.error = null;
            }
        )

        .addCase(
            deleteSite.fulfilled,
            (state, action) => {

                state.deleting = false;

                state.sites =
                    state.sites.filter(
                        site =>
                            (site._id ?? site.id) !==
                            action.payload
                    );

                state.total =
                    Math.max(0, state.total - 1);

                if (
                    state.selectedSite &&
                    (
                        state.selectedSite._id ??
                        state.selectedSite.id
                    ) === action.payload
                ) {

                    state.selectedSite = null;
                }

                state.lastUpdated =
                    new Date().toISOString();
            }
        )

        .addCase(
            deleteSite.rejected,
            (state, action) => {

                state.deleting = false;

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
    setSiteFilters,
    setPaginationModel,
    setSelectedSite,
    clearSelectedSite,
    clearSiteError
} = siteSlice.actions;

/*
|--------------------------------------------------------------------------
| Selectors
|--------------------------------------------------------------------------
*/

export const selectSites =
    state => state.sites.sites;

export const selectTotalSites =
    state => state.sites.total;

export const selectSelectedSite =
    state => state.sites.selectedSite;

export const selectSiteLoading =
    state => state.sites.loading;

export const selectSelectedSiteLoading =
    state => state.sites.selectedSiteLoading;

export const selectSiteError =
    state => state.sites.error;

export const selectSiteFilters =
    state => state.sites.filters;

export const selectSitePagination =
    state => state.sites.paginationModel;

/*
|--------------------------------------------------------------------------
| Reducer
|--------------------------------------------------------------------------
*/

export default siteSlice.reducer;