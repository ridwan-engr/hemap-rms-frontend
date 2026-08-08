import apiClient from "../../../services/api/apiClient";

/**
 * Device API
 *
 * Centralized API service for Device Management.
 * Components and hooks should not call axios directly.
 */

/**
 * Get all devices
 *
 * Backend:
 * GET /devices
 *
 * @param {Object} params
 * @returns {Promise<Object>}
 */
export async function getDevices(params = {}) {
    const { data } = await apiClient.get(
        "/devices",
        {
            params
        }
    );

    return data;
}

/**
 * Get device by ID
 *
 * Backend:
 * GET /devices/:id
 *
 * @param {String} deviceId
 * @returns {Promise<Object>}
 */
export async function getDeviceById(deviceId) {
    if (!deviceId) {
        throw new Error("deviceId is required");
    }

    const { data } = await apiClient.get(
        `/devices/${deviceId}`
    );

    return data;
}

/**
 * Create device
 *
 * Backend:
 * POST /devices
 *
 * Authorization:
 * Administrator / Engineer
 *
 * @param {Object} payload
 * @returns {Promise<Object>}
 */
export async function createDevice(payload) {
    if (!payload || typeof payload !== "object") {
        throw new Error("Device payload is required");
    }

    const { data } = await apiClient.post(
        "/devices",
        payload
    );

    return data;
}

/**
 * Update device
 *
 * Backend:
 * PUT /devices/:id
 *
 * Authorization:
 * Administrator / Engineer
 *
 * @param {String} deviceId
 * @param {Object} payload
 * @returns {Promise<Object>}
 */
export async function updateDevice(
    deviceId,
    payload
) {
    if (!deviceId) {
        throw new Error("deviceId is required");
    }

    if (!payload || typeof payload !== "object") {
        throw new Error("Device payload is required");
    }

    const { data } = await apiClient.put(
        `/devices/${deviceId}`,
        payload
    );

    return data;
}

/**
 * Delete device
 *
 * Backend:
 * DELETE /devices/:id
 *
 * Authorization:
 * Administrator
 *
 * @param {String} deviceId
 * @returns {Promise<Object>}
 */
export async function deleteDevice(deviceId) {
    if (!deviceId) {
        throw new Error("deviceId is required");
    }

    const { data } = await apiClient.delete(
        `/devices/${deviceId}`
    );

    return data;
}

export default {
    getDevices,
    getDeviceById,
    createDevice,
    updateDevice,
    deleteDevice
};