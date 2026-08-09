import apiClient from "./api/apiClient.js";

/*
|--------------------------------------------------------------------------
| Get All Sites
|--------------------------------------------------------------------------
*/

export async function getSites(params = {}) {

    const response = await apiClient.get("/sites", {
        params
    });

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Get Single Site
|--------------------------------------------------------------------------
*/

export async function getSite(siteId) {

    const response = await apiClient.get(`/sites/${siteId}`);

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Create Site
|--------------------------------------------------------------------------
*/

export async function createSite(siteData) {

    const response = await apiClient.post(
        "/sites",
        siteData
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Update Site
|--------------------------------------------------------------------------
*/

export async function updateSite(siteId, siteData) {

    const response = await apiClient.put(
        `/sites/${siteId}`,
        siteData
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Delete Site
|--------------------------------------------------------------------------
*/

export async function deleteSite(siteId) {

    const response = await apiClient.delete(
        `/sites/${siteId}`
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Site Dashboard
|--------------------------------------------------------------------------
*/

export async function getSiteDashboard(siteId) {

    const response = await apiClient.get(
        `/sites/${siteId}/dashboard`
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Site Statistics
|--------------------------------------------------------------------------
*/

export async function getSiteStatistics(siteId, params = {}) {

    const response = await apiClient.get(
        `/sites/${siteId}/statistics`,
        {
            params
        }
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Site Telemetry
|--------------------------------------------------------------------------
*/

export async function getSiteTelemetry(siteId, params = {}) {

    const response = await apiClient.get(
        `/sites/${siteId}/telemetry`,
        {
            params
        }
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Search Sites
|--------------------------------------------------------------------------
*/

export async function searchSites(keyword) {

    const response = await apiClient.get(
        "/sites/search",
        {
            params: {
                q: keyword
            }
        }
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Export
|--------------------------------------------------------------------------
*/

export default {

    getSites,

    getSite,

    createSite,

    updateSite,

    deleteSite,

    getSiteDashboard,

    getSiteStatistics,

    getSiteTelemetry,

    searchSites

};