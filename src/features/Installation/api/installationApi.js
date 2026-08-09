import apiClient from "../../../services/api/apiClient";

/*
|--------------------------------------------------------------------------
| Installation API
|--------------------------------------------------------------------------
|
| Centralized API layer for Installation resources.
|
| Components and hooks should NEVER call axios directly.
|
| Backend contract:
|
| GET    /api/installations
| GET    /api/installations/:id
| POST   /api/installations
| PUT    /api/installations/:id
| DELETE /api/installations/:id
|
| POST   /api/installations/:id/synchronize
| GET    /api/installations/:id/statistics
|
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Get Installations
|--------------------------------------------------------------------------
|
| GET /api/installations
|
| Supported query parameters are determined by
| installationQueryValidator on the backend.
|
*/

export async function getInstallations(params = {}) {

    const response = await apiClient.get(
        "/installations",
        {
            params
        }
    );

    return response.data?.data ?? response.data;
}

/*
|--------------------------------------------------------------------------
| Get Installation
|--------------------------------------------------------------------------
|
| GET /api/installations/:id
|
*/

export async function getInstallation(id) {

    if (!id) {
        throw new Error(
            "Installation ID is required"
        );
    }

    const response = await apiClient.get(
        `/installations/${id}`
    );

    return response.data?.data ?? response.data;
}

/*
|--------------------------------------------------------------------------
| Create Installation
|--------------------------------------------------------------------------
|
| POST /api/installations
|
| Authorization:
| ADMIN
| ENGINEER
|
*/

export async function createInstallation(payload = {}) {

    const response = await apiClient.post(
        "/installations",
        payload
    );

    return response.data?.data ?? response.data;
}

/*
|--------------------------------------------------------------------------
| Update Installation
|--------------------------------------------------------------------------
|
| PUT /api/installations/:id
|
| Authorization:
| ADMIN
| ENGINEER
|
*/

export async function updateInstallation(
    id,
    payload = {}
) {

    if (!id) {
        throw new Error(
            "Installation ID is required"
        );
    }

    const response = await apiClient.put(
        `/installations/${id}`,
        payload
    );

    return response.data?.data ?? response.data;
}

/*
|--------------------------------------------------------------------------
| Delete Installation
|--------------------------------------------------------------------------
|
| DELETE /api/installations/:id
|
| Authorization:
| ADMIN
|
*/

export async function deleteInstallation(id) {

    if (!id) {
        throw new Error(
            "Installation ID is required"
        );
    }

    const response = await apiClient.delete(
        `/installations/${id}`
    );

    return response.data?.data ?? response.data;
}

/*
|--------------------------------------------------------------------------
| Synchronize Installation
|--------------------------------------------------------------------------
|
| POST /api/installations/:id/synchronize
|
| Authorization:
| ADMIN
| ENGINEER
|
*/

export async function synchronizeInstallation(id) {

    if (!id) {
        throw new Error(
            "Installation ID is required"
        );
    }

    const response = await apiClient.post(
        `/installations/${id}/synchronize`
    );

    return response.data?.data ?? response.data;
}

/*
|--------------------------------------------------------------------------
| Get Installation Statistics
|--------------------------------------------------------------------------
|
| GET /api/installations/:id/statistics
|
*/

export async function getInstallationStatistics(id) {

    if (!id) {
        throw new Error(
            "Installation ID is required"
        );
    }

    const response = await apiClient.get(
        `/installations/${id}/statistics`
    );

    return response.data?.data ?? response.data;
}

/*
|--------------------------------------------------------------------------
| Default Export
|--------------------------------------------------------------------------
*/

export default {

    getInstallations,

    getInstallation,

    createInstallation,

    updateInstallation,

    deleteInstallation,

    synchronizeInstallation,

    getInstallationStatistics

};