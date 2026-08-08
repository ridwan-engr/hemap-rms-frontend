import apiClient from "./api/apiClient.js";

/*
|--------------------------------------------------------------------------
| Dashboard Analytics
|--------------------------------------------------------------------------
*/

export async function getDashboardAnalytics(params = {}) {

    const response = await apiClient.get(
        "/analytics/dashboard",
        {
            params
        }
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Site Analytics
|--------------------------------------------------------------------------
*/

export async function getSiteAnalytics(siteId, params = {}) {

    const response = await apiClient.get(
        `/analytics/site/${siteId}`,
        {
            params
        }
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Installation Analytics
|--------------------------------------------------------------------------
*/

export async function getInstallationAnalytics(
    installationId,
    params = {}
) {

    const response = await apiClient.get(
        `/analytics/installation/${installationId}`,
        {
            params
        }
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Energy Analytics
|--------------------------------------------------------------------------
*/

export async function getEnergyAnalytics(params = {}) {

    const response = await apiClient.get(
        "/analytics/energy",
        {
            params
        }
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Battery Analytics
|--------------------------------------------------------------------------
*/

export async function getBatteryAnalytics(params = {}) {

    const response = await apiClient.get(
        "/analytics/battery",
        {
            params
        }
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Generator Analytics
|--------------------------------------------------------------------------
*/

export async function getGeneratorAnalytics(params = {}) {

    const response = await apiClient.get(
        "/analytics/generator",
        {
            params
        }
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Grid Analytics
|--------------------------------------------------------------------------
*/

export async function getGridAnalytics(params = {}) {

    const response = await apiClient.get(
        "/analytics/grid",
        {
            params
        }
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Renewable Analytics
|--------------------------------------------------------------------------
*/

export async function getRenewableAnalytics(params = {}) {

    const response = await apiClient.get(
        "/analytics/renewable",
        {
            params
        }
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Performance KPIs
|--------------------------------------------------------------------------
*/

export async function getPerformanceKPIs(params = {}) {

    const response = await apiClient.get(
        "/analytics/performance",
        {
            params
        }
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Forecast
|--------------------------------------------------------------------------
*/

export async function getForecast(params = {}) {

    const response = await apiClient.get(
        "/analytics/forecast",
        {
            params
        }
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Export Report
|--------------------------------------------------------------------------
*/

export async function exportAnalytics(params = {}) {

    const response = await apiClient.get(
        "/analytics/export",
        {
            params,
            responseType: "blob"
        }
    );

    return response.data;

}

export default {

    getDashboardAnalytics,

    getSiteAnalytics,

    getInstallationAnalytics,

    getEnergyAnalytics,

    getBatteryAnalytics,

    getGeneratorAnalytics,

    getGridAnalytics,

    getRenewableAnalytics,

    getPerformanceKPIs,

    getForecast,

    exportAnalytics

};