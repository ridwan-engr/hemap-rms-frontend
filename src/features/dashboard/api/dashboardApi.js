import apiClient from "../../../services/api/apiClient";

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

export async function getDashboard(filters = {}) {
    const response = await apiClient.get("/dashboard", {
        params: filters
    });

    return response.data.data;
}

export async function getDashboardCards(filters = {}) {
    const response = await apiClient.get("/dashboard/cards", {
        params: filters
    });

    return response.data.data;
}

export async function getDashboardKPIs(filters = {}) {
    const response = await apiClient.get("/dashboard/kpis", {
        params: filters
    });

    return response.data.data;
}

export async function getDashboardMap(filters = {}) {
    const response = await apiClient.get("/dashboard/map", {
        params: filters
    });

    return response.data.data;
}

export async function getOptimizationSummary(filters = {}) {
    const response = await apiClient.get("/dashboard/optimization", {
        params: filters
    });

    return response.data.data;
}

export async function refreshDashboard(filters = {}) {
    const response = await apiClient.post(
        "/dashboard/refresh",
        filters
    );

    return response.data.data;
}

export async function getDashboardCharts(filters = {}) {

    const response = await apiClient.get(
        "/dashboard/charts",
        {
            params: filters
        }
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