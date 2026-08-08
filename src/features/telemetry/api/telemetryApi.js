import apiClient from "../../../services/api/apiClient";

/*
|--------------------------------------------------------------------------
| Telemetry API
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Current Telemetry
|--------------------------------------------------------------------------
| Backend:
| GET /telemetry
|
| Query:
| telemetryQueryValidator
|--------------------------------------------------------------------------
*/

export async function getTelemetry(params = {}) {
    const { data } = await apiClient.get(
        "/telemetry",
        {
            params
        }
    );

    return data;
}


/*
|--------------------------------------------------------------------------
| Historical Telemetry
|--------------------------------------------------------------------------
| Backend:
| GET /telemetry/history
|
| Query:
| telemetryHistoryValidator
|--------------------------------------------------------------------------
*/

export async function getTelemetryHistory(params = {}) {
    const { data } = await apiClient.get(
        "/telemetry/history",
        {
            params
        }
    );

    return data;
}


/*
|--------------------------------------------------------------------------
| Telemetry Summary
|--------------------------------------------------------------------------
| Backend:
| GET /telemetry/summary
|
| Query:
| telemetryQueryValidator
|--------------------------------------------------------------------------
*/

export async function getTelemetrySummary(params = {}) {
    const { data } = await apiClient.get(
        "/telemetry/summary",
        {
            params
        }
    );

    return data;
}


/*
|--------------------------------------------------------------------------
| Latest Telemetry
|--------------------------------------------------------------------------
| Backend:
| GET /telemetry/:installationId/latest
|
| Params:
| installationId
|--------------------------------------------------------------------------
*/

export async function getLatestTelemetry(installationId) {
    const { data } = await apiClient.get(
        `/telemetry/${installationId}/latest`
    );

    return data;
}


/*
|--------------------------------------------------------------------------
| Device Status
|--------------------------------------------------------------------------
| Backend:
| GET /telemetry/:installationId/status
|
| Params:
| installationId
|--------------------------------------------------------------------------
*/

export async function getDeviceStatus(installationId) {
    const { data } = await apiClient.get(
        `/telemetry/${installationId}/status`
    );

    return data;
}


/*
|--------------------------------------------------------------------------
| Synchronize Telemetry
|--------------------------------------------------------------------------
| Backend:
| POST /telemetry/:installationId/synchronize
|
| Authorization:
| ADMIN
|--------------------------------------------------------------------------
*/

export async function synchronizeTelemetry(installationId) {
    const { data } = await apiClient.post(
        `/telemetry/${installationId}/synchronize`
    );

    return data;
}


/*
|--------------------------------------------------------------------------
| Default Export
|--------------------------------------------------------------------------
*/

export default {
    getTelemetry,
    getTelemetryHistory,
    getTelemetrySummary,
    getLatestTelemetry,
    getDeviceStatus,
    synchronizeTelemetry
};