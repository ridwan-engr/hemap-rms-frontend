import apiClient from "./api/apiClient.js";

/*
|--------------------------------------------------------------------------
| Get Reports
|--------------------------------------------------------------------------
*/

export async function getReports(params = {}) {

    const response = await apiClient.get(
        "/reports",
        {
            params
        }
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Get Report
|--------------------------------------------------------------------------
*/

export async function getReport(reportId) {

    const response = await apiClient.get(
        `/reports/${reportId}`
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Generate Report
|--------------------------------------------------------------------------
*/

export async function generateReport(payload = {}) {

    const response = await apiClient.post(
        "/reports/generate",
        payload
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Delete Report
|--------------------------------------------------------------------------
*/

export async function deleteReport(reportId) {

    const response = await apiClient.delete(
        `/reports/${reportId}`
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Export PDF
|--------------------------------------------------------------------------
*/

export async function exportPDF(params = {}) {

    const response = await apiClient.get(
        "/reports/export/pdf",
        {
            params,
            responseType: "blob"
        }
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Export Excel
|--------------------------------------------------------------------------
*/

export async function exportExcel(params = {}) {

    const response = await apiClient.get(
        "/reports/export/excel",
        {
            params,
            responseType: "blob"
        }
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Default Export
|--------------------------------------------------------------------------
*/

export default {

    getReports,

    getReport,

    generateReport,

    deleteReport,

    exportPDF,

    exportExcel

};