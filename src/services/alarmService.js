import apiClient from "./api/apiClient";

/*
|--------------------------------------------------------------------------
| Get Active Alarms
|--------------------------------------------------------------------------
*/


export async function getActiveAlarms(params = {}) {

    const response = await apiClient.get(
        "/alarms",
        {
            params
        }
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Get Alarm History
|--------------------------------------------------------------------------
*/

export async function getAlarmHistory(params = {}) {

    const response = await apiClient.get(
        "/alarms/history",
        {
            params
        }
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Get Alarm By ID
|--------------------------------------------------------------------------
*/

export async function getAlarm(id) {

    const response = await apiClient.get(
        `/alarms/${id}`
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Get Site Alarms
|--------------------------------------------------------------------------
*/

export async function getSiteAlarms(siteId, params = {}) {

    const response = await apiClient.get(
        `/alarms/site/${siteId}`,
        {
            params
        }
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Get Installation Alarms
|--------------------------------------------------------------------------
*/

export async function getInstallationAlarms(
    installationId,
    params = {}
) {

    const response = await apiClient.get(
        `/alarms/installation/${installationId}`,
        {
            params
        }
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Acknowledge Alarm
|--------------------------------------------------------------------------
*/

export async function acknowledgeAlarm(id) {

    const response = await apiClient.post(
        `/alarms/${id}/acknowledge`
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Clear Alarm
|--------------------------------------------------------------------------
*/

export async function clearAlarm(id) {

    const response = await apiClient.post(
        `/alarms/${id}/clear`
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Alarm Summary
|--------------------------------------------------------------------------
*/

export async function getAlarmSummary() {

    const response = await apiClient.get(
        "/alarms/summary"
    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Export
|--------------------------------------------------------------------------
*/

export default {

    getActiveAlarms,

    getAlarmHistory,

    getAlarm,

    getSiteAlarms,

    getInstallationAlarms,

    acknowledgeAlarm,

    clearAlarm,

    getAlarmSummary

};