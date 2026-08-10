import apiClient from "../../../services/api/apiClient.js";

/*
|--------------------------------------------------------------------------
| VRM API
|--------------------------------------------------------------------------
|
| Frontend communicates ONLY with the HEMAP backend.
|
| The frontend must NEVER:
|
| - call vrmapi.victronenergy.com directly
| - contain VRM_ACCESS_TOKEN
| - contain VRM_USER_ID
| - contain VRM_INSTALLATION_ID
|
| Backend endpoints:
|
| GET /api/v1/vrm/installation
| GET /api/v1/vrm/dashboard
| GET /api/v1/vrm/statistics
|
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Get configured VRM installation
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
| Get live VRM dashboard
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
| Get VRM statistics
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
| Default API
|--------------------------------------------------------------------------
*/

export default {

    getVRMInstallation,

    getVRMDashboard,

    getVRMStatistics

};