import apiClient from "./api/apiClient.js";

/*
|--------------------------------------------------------------------------
| Get Statistics
|--------------------------------------------------------------------------
*/

export async function getStatistics(params = {}) {

    const response = await apiClient.get(
        "/statistics",
        {
            params
        }
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Get Site Statistics
|--------------------------------------------------------------------------
*/

export async function getSiteStatistics(siteId, params = {}) {

    const response = await apiClient.get(
        `/statistics/site/${siteId}`,
        {
            params
        }
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Get Installation Statistics
|--------------------------------------------------------------------------
*/

export async function getInstallationStatistics(
    installationId,
    params = {}
) {

    const response = await apiClient.get(
        `/statistics/installation/${installationId}`,
        {
            params
        }
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Get Dashboard Statistics
|--------------------------------------------------------------------------
*/

export async function getDashboardStatistics() {

    const response = await apiClient.get(
        "/statistics/dashboard"
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Get Analytics
|--------------------------------------------------------------------------
*/

export async function getAnalytics(params = {}) {

    const response = await apiClient.get(
        "/statistics/analytics",
        {
            params
        }
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Get Energy Report
|--------------------------------------------------------------------------
*/

export async function getEnergyReport(params = {}) {

    const response = await apiClient.get(
        "/statistics/report",
        {
            params
        }
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Generate Statistics Snapshot
|--------------------------------------------------------------------------
*/

export async function generateSnapshot() {

    const response = await apiClient.post(
        "/statistics/snapshot"
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Export Statistics
|--------------------------------------------------------------------------
*/

export async function exportStatistics(params = {}) {

    const response = await apiClient.get(
        "/statistics/export",
        {
            params,
            responseType: "blob"
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

    getStatistics,

    getSiteStatistics,

    getInstallationStatistics,

    getDashboardStatistics,

    getAnalytics,

    getEnergyReport,

    generateSnapshot,

    exportStatistics

};