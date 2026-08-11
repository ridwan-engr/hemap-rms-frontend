import apiClient
    from "../../../services/api/apiClient.js";


/*
|--------------------------------------------------------------------------
| Get VRM Installation
|--------------------------------------------------------------------------
*/

export async function getVRMInstallation() {

    const response =
        await apiClient.get(
            "/vrm/installation"
        );

    return response.data;

}


/*
|--------------------------------------------------------------------------
| Get VRM Dashboard
|--------------------------------------------------------------------------
*/

export async function getVRMDashboard() {

    const response =
        await apiClient.get(
            "/vrm/dashboard"
        );

    return response.data;

}


/*
|--------------------------------------------------------------------------
| Get VRM Statistics
|--------------------------------------------------------------------------
*/

export async function getVRMStatistics(
    params = {}
) {

    const response =
        await apiClient.get(
            "/vrm/statistics",
            {
                params
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

    getVRMInstallation,

    getVRMDashboard,

    getVRMStatistics

};