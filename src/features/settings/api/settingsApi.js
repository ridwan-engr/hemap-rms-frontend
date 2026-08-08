import apiClient from "../../../services/api/apiClient";

/*
|--------------------------------------------------------------------------
| System Settings API
|--------------------------------------------------------------------------
*/

/**
 * Get all system settings
 *
 * Backend:
 * GET /settings
 *
 * Requires:
 * Authentication + ADMIN
 */
export async function getSettings() {

    const response = await apiClient.get(
        "/settings"
    );

    return response.data?.data ?? response.data;

}


/**
 * Get a single system setting
 *
 * Backend:
 * GET /settings/:id
 *
 * Requires:
 * Authentication + ADMIN
 */
export async function getSetting(settingId) {

    const response = await apiClient.get(
        `/settings/${settingId}`
    );

    return response.data?.data ?? response.data;

}


/**
 * Create a system setting
 *
 * Backend:
 * POST /settings
 *
 * Requires:
 * Authentication + ADMIN
 */
export async function createSetting(payload) {

    const response = await apiClient.post(
        "/settings",
        payload
    );

    return response.data?.data ?? response.data;

}


/**
 * Update a system setting
 *
 * Backend:
 * PUT /settings/:id
 *
 * Requires:
 * Authentication + ADMIN
 */
export async function updateSetting(
    settingId,
    payload
) {

    const response = await apiClient.put(
        `/settings/${settingId}`,
        payload
    );

    return response.data?.data ?? response.data;

}


/**
 * Delete a system setting
 *
 * Backend:
 * DELETE /settings/:id
 *
 * Requires:
 * Authentication + ADMIN
 */
export async function deleteSetting(settingId) {

    const response = await apiClient.delete(
        `/settings/${settingId}`
    );

    return response.data?.data ?? response.data;

}


/*
|--------------------------------------------------------------------------
| Default Export
|--------------------------------------------------------------------------
*/

export default {

    getSettings,

    getSetting,

    createSetting,

    updateSetting,

    deleteSetting

};