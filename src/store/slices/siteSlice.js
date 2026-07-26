import {

    createSlice,

    createAsyncThunk

} from "@reduxjs/toolkit";

import {

    getSites,
    getSiteById,
    getSiteSummary,
    getSiteStatistics,
    getSiteHealth,
    getSiteLocations,
    createSite as createSiteApi,
    updateSite as updateSiteApi,
    deleteSite as deleteSiteApi,
    refreshSites as refreshSitesApi

} from "../../features/analytics/api/siteApi.js";

/*
|--------------------------------------------------------------------------
| Async Thunks
|--------------------------------------------------------------------------
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

export const fetchSite = createAsyncThunk(

    "sites/fetchSite",

    async (siteId, { rejectWithValue }) => {

        try {

            return await getSiteById(siteId);

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const fetchSiteSummary = createAsyncThunk(

    "sites/fetchSiteSummary",

    async (params = {}, { rejectWithValue }) => {

        try {

            return await getSiteSummary(params);

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const fetchSiteStatistics = createAsyncThunk(

    "sites/fetchSiteStatistics",

    async (params = {}, { rejectWithValue }) => {

        try {

            return await getSiteStatistics(params);

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const fetchSiteHealth = createAsyncThunk(

    "sites/fetchSiteHealth",

    async (params = {}, { rejectWithValue }) => {

        try {

            return await getSiteHealth(params);

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

export const fetchSiteLocations = createAsyncThunk(

    "sites/fetchSiteLocations",

    async (params = {}, { rejectWithValue }) => {

        try {

            return await getSiteLocations(params);

        }

        catch (error) {

            return rejectWithValue(

                error.response?.data ||

                error.message

            );

        }

    }

);

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

export const refreshSites = createAsyncThunk(

    "sites/refreshSites",

    async (params = {}, { rejectWithValue }) => {

        try {

            return await refreshSitesApi(params);

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

    summary: {},

    statistics: {},

    health: [],

    locations: [],

    filters: {},

    paginationModel: {

        page: 0,

        pageSize: 25

    },

    loading: false,

    refreshing: false,

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

        setSiteFilters(state, action) {

            state.filters = action.payload;

        },

        setPaginationModel(state, action) {

            state.paginationModel = action.payload;

        },

        clearSelectedSite(state) {

            state.selectedSite = null;

        }

    },

    extraReducers: builder => {

        builder

        /* Sites */

        .addCase(fetchSites.pending, state => {

            state.loading = true;

            state.error = null;

        })

        .addCase(fetchSites.fulfilled, (state, action) => {

            state.loading = false;

            state.sites = action.payload.rows ?? [];

            state.total = action.payload.total ?? 0;

            state.lastUpdated = new Date().toISOString();

        })

        .addCase(fetchSites.rejected, (state, action) => {

            state.loading = false;

            state.error = action.payload;

        })

        /* Selected Site */

        .addCase(fetchSite.fulfilled, (state, action) => {

            state.selectedSite = action.payload;

        })

        /* Summary */

        .addCase(fetchSiteSummary.fulfilled, (state, action) => {

            state.summary = action.payload;

        })

        /* Statistics */

        .addCase(fetchSiteStatistics.fulfilled, (state, action) => {

            state.statistics = action.payload;

        })

        /* Health */

        .addCase(fetchSiteHealth.fulfilled, (state, action) => {

            state.health = action.payload;

        })

        /* Locations */

        .addCase(fetchSiteLocations.fulfilled, (state, action) => {

            state.locations = action.payload;

        })

        /* Create */

        .addCase(createSite.fulfilled, state => {

            state.lastUpdated = new Date().toISOString();

        })

        /* Update */

        .addCase(updateSite.fulfilled, state => {

            state.lastUpdated = new Date().toISOString();

        })

        /* Delete */

        .addCase(deleteSite.fulfilled, (state, action) => {

            state.sites = state.sites.filter(

                site => site.id !== action.payload

            );

            state.total--;

            state.lastUpdated = new Date().toISOString();

        })

        /* Refresh */

        .addCase(refreshSites.pending, state => {

            state.refreshing = true;

        })

        .addCase(refreshSites.fulfilled, state => {

            state.refreshing = false;

            state.lastUpdated = new Date().toISOString();

        })

        .addCase(refreshSites.rejected, (state, action) => {

            state.refreshing = false;

            state.error = action.payload;

        });

    }

});

export const {

    setSiteFilters,

    setPaginationModel,

    clearSelectedSite

} = siteSlice.actions;

export default siteSlice.reducer;