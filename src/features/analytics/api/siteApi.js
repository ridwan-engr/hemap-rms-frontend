import api from "../../../api/axios";

/*
|--------------------------------------------------------------------------
| Site API
|--------------------------------------------------------------------------
| Centralized Site Management API.
| Components and hooks should never call axios directly.
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Site List
|--------------------------------------------------------------------------
*/

export async function getSites(params = {}) {
    const response = await api.get("/sites", {
        params
    });

    return response.data;
}

/*
|--------------------------------------------------------------------------
| Single Site
|--------------------------------------------------------------------------
*/

export async function getSiteById(siteId) {
    const response = await api.get(`/sites/${siteId}`);

    return response.data;
}

/*
|--------------------------------------------------------------------------
| Site Summary
|--------------------------------------------------------------------------
*/

export async function getSiteSummary(params = {}) {
    const response = await api.get("/sites/summary", {
        params
    });

    return response.data;
}

/*
|--------------------------------------------------------------------------
| Site Statistics
|--------------------------------------------------------------------------
*/

export async function getSiteStatistics(params = {}) {
    const response = await api.get("/sites/statistics", {
        params
    });

    return response.data;
}

/*
|--------------------------------------------------------------------------
| Site Health
|--------------------------------------------------------------------------
*/

export async function getSiteHealth(params = {}) {
    const response = await api.get("/sites/health", {
        params
    });

    return response.data;
}

/*
|--------------------------------------------------------------------------
| Site Locations
|--------------------------------------------------------------------------
*/

export async function getSiteLocations(params = {}) {
    const response = await api.get("/sites/locations", {
        params
    });

    return response.data;
}

/*
|--------------------------------------------------------------------------
| Create Site
|--------------------------------------------------------------------------
*/

export async function createSite(payload) {
    const response = await api.post("/sites", payload);

    return response.data;
}

/*
|--------------------------------------------------------------------------
| Update Site
|--------------------------------------------------------------------------
*/

export async function updateSite(siteId, payload) {
    const response = await api.put(
        `/sites/${siteId}`,
        payload
    );

    return response.data;
}

/*
|--------------------------------------------------------------------------
| Delete Site
|--------------------------------------------------------------------------
*/

export async function deleteSite(siteId) {
    const response = await api.delete(
        `/sites/${siteId}`
    );

    return response.data;
}

/*
|--------------------------------------------------------------------------
| Refresh Site Cache
|--------------------------------------------------------------------------
*/

export async function refreshSites(payload = {}) {
    const response = await api.post(
        "/sites/refresh",
        payload
    );

    return response.data;
}

/*
|--------------------------------------------------------------------------
| Site Lookup
|--------------------------------------------------------------------------
*/

export async function getSiteLookup() {
    const response = await api.get(
        "/sites/lookup"
    );

    return response.data;
}

export default {
    getSites,
    getSiteById,
    getSiteSummary,
    getSiteStatistics,
    getSiteHealth,
    getSiteLocations,
    createSite,
    updateSite,
    deleteSite,
    refreshSites,
    getSiteLookup
};