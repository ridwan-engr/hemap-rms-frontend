import apiClient from "./api/apiClient.js";

/*
|--------------------------------------------------------------------------
| Current Telemetry
|--------------------------------------------------------------------------
*/

export async function getTelemetry(params = {}) {

    const response = await apiClient.get(
        "/telemetry",
        {
            params
        }
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Telemetry History
|--------------------------------------------------------------------------
*/

export async function getTelemetryHistory(siteId, params = {}) {

    const response = await apiClient.get(
        `/telemetry/history/${siteId}`,
        {
            params
        }
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Latest Telemetry
|--------------------------------------------------------------------------
*/

export async function getLatestTelemetry(installationId) {

    const response = await apiClient.get(
        `/telemetry/latest/${installationId}`
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Device Status
|--------------------------------------------------------------------------
*/

export async function getDeviceStatus(installationId) {

    const response = await apiClient.get(
        `/telemetry/status/${installationId}`
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Telemetry Summary
|--------------------------------------------------------------------------
*/

export async function getTelemetrySummary(params = {}) {

    const response = await apiClient.get(
        "/telemetry/summary",
        {
            params
        }
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Manual Synchronization
|--------------------------------------------------------------------------
*/

export async function synchronizeTelemetry(installationId) {

    const response = await apiClient.post(
        `/telemetry/synchronize/${installationId}`
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Refresh Dashboard
|--------------------------------------------------------------------------
*/

export async function refreshDashboard(siteId) {

    const response = await apiClient.post(
        `/telemetry/dashboard/${siteId}/refresh`
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Export
|--------------------------------------------------------------------------
*/

export default {

    getTelemetry,

    getTelemetryHistory,

    getLatestTelemetry,

    getDeviceStatus,

    getTelemetrySummary,

    synchronizeTelemetry,

    refreshDashboard

};