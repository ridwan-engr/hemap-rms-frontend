import apiClient from "../../../services/api/apiClient.js";

/*
|--------------------------------------------------------------------------
| Site Overview
|--------------------------------------------------------------------------
*/

export const generateSiteOverview = payload =>
    apiClient.post(
        "/reports/generate/site-overview",
        payload
    );

/*
|--------------------------------------------------------------------------
| Energy Report
|--------------------------------------------------------------------------
*/

export const generateEnergyReport = payload =>
    apiClient.post(
        "/reports/generate/energy",
        payload
    );

/*
|--------------------------------------------------------------------------
| Battery Report
|--------------------------------------------------------------------------
*/

export const generateBatteryReport = payload =>
    apiClient.post(
        "/reports/generate/battery",
        payload
    );

/*
|--------------------------------------------------------------------------
| Reliability Report
|--------------------------------------------------------------------------
*/

export const generateReliabilityReport = payload =>
    apiClient.post(
        "/reports/generate/reliability",
        payload
    );

/*
|--------------------------------------------------------------------------
| Alarm Report
|--------------------------------------------------------------------------
*/

export const generateAlarmReport = payload =>
    apiClient.post(
        "/reports/generate/alarms",
        payload
    );

/*
|--------------------------------------------------------------------------
| Maintenance Report
|--------------------------------------------------------------------------
*/

export const generateMaintenanceReport = payload =>
    apiClient.post(
        "/reports/generate/maintenance",
        payload
    );

/*
|--------------------------------------------------------------------------
| Dashboard Report
|--------------------------------------------------------------------------
*/

export const generateDashboardReport = payload =>
    apiClient.post(
        "/reports/generate/dashboard",
        payload
    );

/*
|--------------------------------------------------------------------------
| Executive Report
|--------------------------------------------------------------------------
*/

export const generateExecutiveReport = payload =>
    apiClient.post(
        "/reports/generate/executive",
        payload
    );

/*
|--------------------------------------------------------------------------
| Export
|--------------------------------------------------------------------------
*/

export const exportReport = payload =>
    apiClient.post(
        "/reports/export",
        payload
    );

/*
|--------------------------------------------------------------------------
| Report Response
|--------------------------------------------------------------------------
*/

export const getReportResponse = reportId =>
    apiClient.get(
        `/reports/response/${reportId}`
    );