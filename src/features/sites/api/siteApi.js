import apiClient from "../../../services/api/apiClient";

/*
|--------------------------------------------------------------------------
| Site API
|--------------------------------------------------------------------------
*/

/**
 * Get all sites
 *
 * Backend:
 * GET /sites
 *
 * Supports query parameters defined by siteQueryValidator.
 *
 * Example:
 * getSites({ status: "ONLINE" })
 */
export async function getSites(filters = {}) {

    const response = await apiClient.get(
        "/sites",
        {
            params: filters
        }
    );

    return response.data?.data ?? response.data;

}

/**
 * Get site by ID
 *
 * Backend:
 * GET /sites/:id
 */
export async function getSite(siteId) {

    const response = await apiClient.get(
        `/sites/${siteId}`
    );

    return response.data?.data ?? response.data;

}

/**
 * Create site
 *
 * Backend:
 * POST /sites
 *
 * Requires ADMIN authorization.
 */
export async function createSite(payload) {

    const response = await apiClient.post(
        "/sites",
        payload
    );

    return response.data?.data ?? response.data;

}

/**
 * Update site
 *
 * Backend:
 * PUT /sites/:id
 *
 * Requires ADMIN authorization.
 */
export async function updateSite(
    siteId,
    payload
) {

    const response = await apiClient.put(
        `/sites/${siteId}`,
        payload
    );

    return response.data?.data ?? response.data;

}

/**
 * Activate site
 *
 * Backend:
 * PATCH /sites/:id/activate
 *
 * Requires ADMIN authorization.
 */
export async function activateSite(siteId) {

    const response = await apiClient.patch(
        `/sites/${siteId}/activate`
    );

    return response.data?.data ?? response.data;

}

/**
 * Deactivate site
 *
 * Backend:
 * PATCH /sites/:id/deactivate
 *
 * Requires ADMIN authorization.
 */
export async function deactivateSite(siteId) {

    const response = await apiClient.patch(
        `/sites/${siteId}/deactivate`
    );

    return response.data?.data ?? response.data;

}

/**
 * Delete site
 *
 * Backend:
 * DELETE /sites/:id
 *
 * Requires ADMIN authorization.
 */
export async function deleteSite(siteId) {

    const response = await apiClient.delete(
        `/sites/${siteId}`
    );

    return response.data?.data ?? response.data;

}


/*
|--------------------------------------------------------------------------
| Default Export
|--------------------------------------------------------------------------
*/

export default {

    getSites,

    getSite,

    createSite,

    updateSite,

    activateSite,

    deactivateSite,

    deleteSite

};