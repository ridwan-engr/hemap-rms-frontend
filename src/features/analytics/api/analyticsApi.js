import apiClient from "../../../services/api/apiClient";

/*
|--------------------------------------------------------------------------
| Analytics API
|--------------------------------------------------------------------------
|
| Centralized Analytics API.
| Components and hooks should never call axios directly.
|
| Backend contract:
|
| GET /analytics/dashboard
| GET /analytics/energy
| GET /analytics/battery
| GET /analytics/solar
| GET /analytics/generator
| GET /analytics/grid
| GET /analytics/reliability
|
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| Dashboard Analytics
|--------------------------------------------------------------------------
*/

export async function getDashboardAnalytics(
    params = {}
) {

    const response = await apiClient.get(
        "/analytics/dashboard",
        {
            params
        }
    );

    return response.data?.data ?? response.data;
}


/*
|--------------------------------------------------------------------------
| Energy Analytics
|--------------------------------------------------------------------------
*/

export async function getEnergyAnalytics(
    params = {}
) {

    const response = await apiClient.get(
        "/analytics/energy",
        {
            params
        }
    );

    return response.data?.data ?? response.data;
}


/*
|--------------------------------------------------------------------------
| Battery Analytics
|--------------------------------------------------------------------------
*/

export async function getBatteryAnalytics(
    params = {}
) {

    const response = await apiClient.get(
        "/analytics/battery",
        {
            params
        }
    );

    return response.data?.data ?? response.data;
}


/*
|--------------------------------------------------------------------------
| Solar Analytics
|--------------------------------------------------------------------------
*/

export async function getSolarAnalytics(
    params = {}
) {

    const response = await apiClient.get(
        "/analytics/solar",
        {
            params
        }
    );

    return response.data?.data ?? response.data;
}


/*
|--------------------------------------------------------------------------
| Generator Analytics
|--------------------------------------------------------------------------
*/

export async function getGeneratorAnalytics(
    params = {}
) {

    const response = await apiClient.get(
        "/analytics/generator",
        {
            params
        }
    );

    return response.data?.data ?? response.data;
}


/*
|--------------------------------------------------------------------------
| Grid Analytics
|--------------------------------------------------------------------------
*/

export async function getGridAnalytics(
    params = {}
) {

    const response = await apiClient.get(
        "/analytics/grid",
        {
            params
        }
    );

    return response.data?.data ?? response.data;
}


/*
|--------------------------------------------------------------------------
| Reliability Analytics
|--------------------------------------------------------------------------
*/

export async function getReliabilityAnalytics(
    params = {}
) {

    const response = await apiClient.get(
        "/analytics/reliability",
        {
            params
        }
    );

    return response.data?.data ?? response.data;
}


/*
|--------------------------------------------------------------------------
| Default Export
|--------------------------------------------------------------------------
*/

export default {

    getDashboardAnalytics,

    getEnergyAnalytics,

    getBatteryAnalytics,

    getSolarAnalytics,

    getGeneratorAnalytics,

    getGridAnalytics,

    getReliabilityAnalytics

};