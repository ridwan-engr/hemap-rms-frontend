import apiClient from "../../../services/api/apiClient";

/*
|--------------------------------------------------------------------------
| Device API
|--------------------------------------------------------------------------
|
| Centralized API service for Device Management.
| All HTTP communication related to devices is handled here.
|
*/

/*
|--------------------------------------------------------------------------
| Device List
|--------------------------------------------------------------------------
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

/*
|--------------------------------------------------------------------------
| Single Device
|--------------------------------------------------------------------------
*/

export async function getDeviceById(deviceId) {

    const { data } = await apiClient.get(

        `/devices/${deviceId}`

    );

    return data;

}

/*
|--------------------------------------------------------------------------
| Dashboard Summary
|--------------------------------------------------------------------------
*/

export async function getDeviceSummary(params = {}) {

    const { data } = await apiClient.get(

        "/devices/summary",

        {

            params

        }

    );

    return data;

}

/*
|--------------------------------------------------------------------------
| Device Statistics
|--------------------------------------------------------------------------
*/

export async function getDeviceStatistics(params = {}) {

    const { data } = await apiClient.get(

        "/devices/statistics",

        {

            params

        }

    );

    return data;

}

/*
|--------------------------------------------------------------------------
| Device Health
|--------------------------------------------------------------------------
*/

export async function getDeviceHealth(params = {}) {

    const { data } = await apiClient.get(

        "/devices/health",

        {

            params

        }

    );

    return data;

}

/*
|--------------------------------------------------------------------------
| Create Device
|--------------------------------------------------------------------------
*/

export async function createDevice(payload) {

    const { data } = await apiClient.post(

        "/devices",

        payload

    );

    return data;

}

/*
|--------------------------------------------------------------------------
| Update Device
|--------------------------------------------------------------------------
*/

export async function updateDevice(

    deviceId,

    payload

) {

    const { data } = await apiClient.put(

        `/devices/${deviceId}`,

        payload

    );

    return data;

}

/*
|--------------------------------------------------------------------------
| Delete Device
|--------------------------------------------------------------------------
*/

export async function deleteDevice(deviceId) {

    const { data } = await apiClient.delete(

        `/devices/${deviceId}`

    );

    return data;

}

/*
|--------------------------------------------------------------------------
| Refresh Devices
|--------------------------------------------------------------------------
*/

export async function refreshDevices(params = {}) {

    const { data } = await apiClient.post(

        "/devices/refresh",

        params

    );

    return data;

}

/*
|--------------------------------------------------------------------------
| Firmware Versions
|--------------------------------------------------------------------------
*/

export async function getFirmwareVersions() {

    const { data } = await apiClient.get(

        "/devices/firmware"

    );

    return data;

}

/*
|--------------------------------------------------------------------------
| Device Types
|--------------------------------------------------------------------------
*/

export async function getDeviceTypes() {

    const { data } = await apiClient.get(

        "/devices/types"

    );

    return data;

}

/*
|--------------------------------------------------------------------------
| Manufacturers
|--------------------------------------------------------------------------
*/

export async function getManufacturers() {

    const { data } = await apiClient.get(

        "/devices/manufacturers"

    );

    return data;

}