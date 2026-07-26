import api from "../../../api/axios";

/*
|--------------------------------------------------------------------------
| Live Telemetry
|--------------------------------------------------------------------------
*/

export const getLiveTelemetry = (params = {}) =>
    api.get("/telemetry/live", { params });

export const getHistoricalTelemetry = (params = {}) =>
    api.get("/telemetry/history", { params });

export const getLatestTelemetry = (siteId) =>
    api.get("/telemetry/latest", {
        params: { siteId }
    });

/*
|--------------------------------------------------------------------------
| Device Status
|--------------------------------------------------------------------------
*/

export const getDeviceStatus = (siteId) =>
    api.get("/telemetry/status/device", {
        params: { siteId }
    });

export const getCommunicationStatus = (siteId) =>
    api.get("/telemetry/status/communication", {
        params: { siteId }
    });

/*
|--------------------------------------------------------------------------
| Components
|--------------------------------------------------------------------------
*/

export const getBatteryTelemetry = (installationId) =>
    api.get(`/telemetry/battery/${installationId}`);

export const getSolarTelemetry = (installationId) =>
    api.get(`/telemetry/solar/${installationId}`);

export const getGeneratorTelemetry = (installationId) =>
    api.get(`/telemetry/generator/${installationId}`);

export const getGridTelemetry = (installationId) =>
    api.get(`/telemetry/grid/${installationId}`);

export const getInverterTelemetry = (installationId) =>
    api.get(`/telemetry/inverter/${installationId}`);

export const getRectifierTelemetry = (installationId) =>
    api.get(`/telemetry/rectifier/${installationId}`);

export const getSmartMeterTelemetry = (installationId) =>
    api.get(`/telemetry/smart-meter/${installationId}`);

export const getLoadTelemetry = (installationId) =>
    api.get(`/telemetry/load/${installationId}`);

/*
|--------------------------------------------------------------------------
| Analytics
|--------------------------------------------------------------------------
*/

export const getTelemetryStatistics = (params = {}) =>
    api.get("/telemetry/statistics", { params });

export const getTelemetryKPIs = () =>
    api.get("/telemetry/kpis");

export const getTelemetryAlarms = () =>
    api.get("/telemetry/alarms");

export const getTelemetryForecast = () =>
    api.get("/telemetry/forecast");

export const getReliabilitySummary = () =>
    api.get("/telemetry/reliability");