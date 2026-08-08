import apiClient from "../../../services/api/apiClient.js";

/*
|--------------------------------------------------------------------------
| Report API
|--------------------------------------------------------------------------
|
| Backend contract:
|
| POST   /reports
| GET    /reports
| GET    /reports/:reportId
| GET    /reports/:reportId/download
| DELETE /reports/:reportId
|
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| Generate Report
|--------------------------------------------------------------------------
|
| payload must conform to generateReportValidator
|
*/

export async function generateReport(payload) {

    return apiClient.post(
        "/reports",
        payload
    );

}


/*
|--------------------------------------------------------------------------
| Get Reports
|--------------------------------------------------------------------------
*/

export async function getReports(params = {}) {

    return apiClient.get(
        "/reports",
        {
            params
        }
    );

}


/*
|--------------------------------------------------------------------------
| Get Report By ID
|--------------------------------------------------------------------------
*/

export async function getReportById(reportId) {

    return apiClient.get(
        `/reports/${reportId}`
    );

}


/*
|--------------------------------------------------------------------------
| Download Report
|--------------------------------------------------------------------------
*/

export async function downloadReport(reportId) {

    return apiClient.get(
        `/reports/${reportId}/download`,
        {
            responseType: "blob"
        }
    );

}


/*
|--------------------------------------------------------------------------
| Delete Report
|--------------------------------------------------------------------------
*/

export async function deleteReport(reportId) {

    return apiClient.delete(
        `/reports/${reportId}`
    );

}


/*
|--------------------------------------------------------------------------
| Default Export
|--------------------------------------------------------------------------
*/

export default {

    generateReport,

    getReports,

    getReportById,

    downloadReport,

    deleteReport

};