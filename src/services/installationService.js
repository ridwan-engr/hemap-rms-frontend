import apiClient from "./api/apiClient";

/*
|--------------------------------------------------------------------------
| Installation Service
|--------------------------------------------------------------------------
*/

/**
 * Get all installations
 */
export async function getInstallations(params = {}) {
    const { data } = await apiClient.get("/installations", {
        params,
    });

    return data;
}

/**
 * Get installation by Mongo ID
 */
export async function getInstallation(id) {
    const { data } = await apiClient.get(`/installations/${id}`);

    return data;
}

/**
 * Get installation by Installation ID (VRM)
 */
export async function getInstallationByInstallationId(installationId) {
    const { data } = await apiClient.get(
        `/installations/installation/${installationId}`
    );

    return data;
}

/**
 * Create installation
 */
export async function createInstallation(payload) {
    const { data } = await apiClient.post(
        "/installations",
        payload
    );

    return data;
}

/**
 * Update installation
 */
export async function updateInstallation(id, payload) {
    const { data } = await apiClient.put(
        `/installations/${id}`,
        payload
    );

    return data;
}

/**
 * Delete installation
 */
export async function deleteInstallation(id) {
    const { data } = await apiClient.delete(
        `/installations/${id}`
    );

    return data;
}

/**
 * Synchronize installation from VRM
 */
export async function synchronizeInstallation(installationId) {
    const { data } = await apiClient.post(
        `/installations/${installationId}/sync`
    );

    return data;
}

/**
 * Refresh installation
 */
export async function refreshInstallation(id) {
    const { data } = await apiClient.post(
        `/installations/${id}/refresh`
    );

    return data;
}

export default {
    getInstallations,
    getInstallation,
    getInstallationByInstallationId,
    createInstallation,
    updateInstallation,
    deleteInstallation,
    synchronizeInstallation,
    refreshInstallation,
};