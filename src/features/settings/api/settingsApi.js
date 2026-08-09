import apiClient from "../../../services/api/apiClient";

/**
 * System Settings API
 *
 * Centralized API service for system settings.
 *
 * Backend routes:
 * GET    /settings
 * GET    /settings/:id
 * POST   /settings
 * PUT    /settings/:id
 * DELETE /settings/:id
 */

/**
 * Get all system settings
 *
 * Requires:
 * Authentication + ADMIN
 */
export async function getSettings() {
    const response = await apiClient.get("/settings");

    return response.data?.data ?? response.data;
}

/**
 * Get a single system setting
 *
 * Requires:
 * Authentication + ADMIN
 *
 * @param {string} settingId
 */
export async function getSetting(settingId) {
    if (!settingId) {
        throw new Error("settingId is required");
    }

    const response = await apiClient.get(
        `/settings/${settingId}`
    );

    return response.data?.data ?? response.data;
}

/**
 * Create a system setting
 *
 * Requires:
 * Authentication + ADMIN
 *
 * @param {object} payload
 */
export async function createSetting(payload) {
    if (!payload || typeof payload !== "object") {
        throw new Error("Setting payload is required");
    }

    const response = await apiClient.post(
        "/settings",
        payload
    );

    return response.data?.data ?? response.data;
}

/**
 * Update a system setting
 *
 * Requires:
 * Authentication + ADMIN
 *
 * @param {string} settingId
 * @param {object} payload
 */
export async function updateSetting(
    settingId,
    payload
) {
    if (!settingId) {
        throw new Error("settingId is required");
    }

    if (!payload || typeof payload !== "object") {
        throw new Error("Setting payload is required");
    }

    const response = await apiClient.put(
        `/settings/${settingId}`,
        payload
    );

    return response.data?.data ?? response.data;
}

/**
 * Delete a system setting
 *
 * Requires:
 * Authentication + ADMIN
 *
 * @param {string} settingId
 */
export async function deleteSetting(settingId) {
    if (!settingId) {
        throw new Error("settingId is required");
    }

    const response = await apiClient.delete(
        `/settings/${settingId}`
    );

    return response.data?.data ?? response.data;
}

export default {
    getSettings,
    getSetting,
    createSetting,
    updateSetting,
    deleteSetting
};