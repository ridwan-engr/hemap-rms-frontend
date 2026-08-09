import apiClient from "./api/apiClient.js";

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

export async function getDashboard(params = {}) {

    const response = await apiClient.get(
        "/dashboard",
        {
            params
        }
    );

    return response.data.data;

}

/*
|--------------------------------------------------------------------------
| Dashboard KPIs
|--------------------------------------------------------------------------
*/

export async function getDashboardKPIs(params = {}) {

    const response = await apiClient.get(
        "/dashboard/kpis",
        {
            params
        }
    );

    return response.data.data;

}

/*
|--------------------------------------------------------------------------
| Dashboard Charts
|--------------------------------------------------------------------------
*/

export async function getDashboardCharts(params = {}) {

    const response = await apiClient.get(
        "/dashboard/charts",
        {
            params
        }
    );

    return response.data.data;

}

/*
|--------------------------------------------------------------------------
| Dashboard Cards
|--------------------------------------------------------------------------
*/

export async function getDashboardCards(params = {}) {

    const response = await apiClient.get(
        "/dashboard/cards",
        {
            params
        }
    );

    return response.data.data;

}

/*
|--------------------------------------------------------------------------
| Dashboard Map
|--------------------------------------------------------------------------
*/

export async function getDashboardMap(params = {}) {

    const response = await apiClient.get(
        "/dashboard/map",
        {
            params
        }
    );

    return response.data.data;

}

/*
|--------------------------------------------------------------------------
| Optimization Summary
|--------------------------------------------------------------------------
*/

export async function getOptimizationSummary(params = {}) {

    const response = await apiClient.get(
        "/dashboard/optimization",
        {
            params
        }
    );

    return response.data.data;

}

/*
|--------------------------------------------------------------------------
| Refresh Dashboard
|--------------------------------------------------------------------------
*/

export async function refreshDashboard(filters = {}) {

    const response = await apiClient.post(
        "/dashboard/refresh",
        filters
    );

    return response.data.data;

}

export default {

    getDashboard,

    getDashboardCards,

    getDashboardKPIs,

    getDashboardMap,

    getDashboardCharts,

    getOptimizationSummary,

    refreshDashboard

};