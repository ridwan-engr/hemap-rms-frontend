import apiClient from "../../../services/api/apiClient.js";


/*
|--------------------------------------------------------------------------
| Statistics API
|--------------------------------------------------------------------------
|
| Centralized Statistics API.
|
| Components and hooks should NEVER call axios directly.
|
| Backend contract:
|
| GET /statistics/dashboard
| GET /statistics/energy
| GET /statistics/battery
| GET /statistics/solar
| GET /statistics/generator
| GET /statistics/grid
| GET /statistics/kpis
| GET /statistics/locations
|
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| Dashboard Statistics
|--------------------------------------------------------------------------
*/

export async function getDashboardStatistics(
    params = {}
) {

    const response = await apiClient.get(
        "/statistics/dashboard",
        {
            params
        }
    );

    return (
        response.data?.data ??
        response.data
    );

}


/*
|--------------------------------------------------------------------------
| Energy Statistics
|--------------------------------------------------------------------------
*/

export async function getEnergyStatistics(
    params = {}
) {

    const response = await apiClient.get(
        "/statistics/energy",
        {
            params
        }
    );

    return (
        response.data?.data ??
        response.data
    );

}


/*
|--------------------------------------------------------------------------
| Battery Statistics
|--------------------------------------------------------------------------
*/

export async function getBatteryStatistics(
    params = {}
) {

    const response = await apiClient.get(
        "/statistics/battery",
        {
            params
        }
    );

    return (
        response.data?.data ??
        response.data
    );

}


/*
|--------------------------------------------------------------------------
| Solar Statistics
|--------------------------------------------------------------------------
*/

export async function getSolarStatistics(
    params = {}
) {

    const response = await apiClient.get(
        "/statistics/solar",
        {
            params
        }
    );

    return (
        response.data?.data ??
        response.data
    );

}


/*
|--------------------------------------------------------------------------
| Generator Statistics
|--------------------------------------------------------------------------
*/

export async function getGeneratorStatistics(
    params = {}
) {

    const response = await apiClient.get(
        "/statistics/generator",
        {
            params
        }
    );

    return (
        response.data?.data ??
        response.data
    );

}


/*
|--------------------------------------------------------------------------
| Grid Statistics
|--------------------------------------------------------------------------
*/

export async function getGridStatistics(
    params = {}
) {

    const response = await apiClient.get(
        "/statistics/grid",
        {
            params
        }
    );

    return (
        response.data?.data ??
        response.data
    );

}


/*
|--------------------------------------------------------------------------
| KPI Statistics
|--------------------------------------------------------------------------
*/

export async function getKPIStatistics(
    params = {}
) {

    const response = await apiClient.get(
        "/statistics/kpis",
        {
            params
        }
    );

    return (
        response.data?.data ??
        response.data
    );

}


/*
|--------------------------------------------------------------------------
| Site Locations
|--------------------------------------------------------------------------
*/

export async function getSiteLocations(
    params = {}
) {

    const response = await apiClient.get(
        "/statistics/locations",
        {
            params
        }
    );

    return (
        response.data?.data ??
        response.data
    );

}


/*
|--------------------------------------------------------------------------
| Default Export
|--------------------------------------------------------------------------
*/

export default {

    getDashboardStatistics,

    getEnergyStatistics,

    getBatteryStatistics,

    getSolarStatistics,

    getGeneratorStatistics,

    getGridStatistics,

    getKPIStatistics,

    getSiteLocations

};