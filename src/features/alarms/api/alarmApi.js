import apiClient from "../../../services/api/apiClient";

/*
|--------------------------------------------------------------------------
| Alarm API
|--------------------------------------------------------------------------
| All alarm REST requests originate here.
| Components and hooks should not call axios directly.
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Active Alarms
|--------------------------------------------------------------------------
*/

export async function getActiveAlarms(params = {}) {

    const response = await apiClient.get(
        "/alarms/active",
        {
            params
        }
    );

    return response.data?.data ?? response.data;
}


/*
|--------------------------------------------------------------------------
| Alarm History
|--------------------------------------------------------------------------
*/

export async function getAlarmHistory(params = {}) {

    const response = await apiClient.get(
        "/alarms/history",
        {
            params
        }
    );

    return response.data?.data ?? response.data;
}


/*
|--------------------------------------------------------------------------
| Alarm Statistics
|--------------------------------------------------------------------------
*/

export async function getAlarmStatistics(params = {}) {

    const response = await apiClient.get(
        "/alarms/statistics",
        {
            params
        }
    );

    return response.data?.data ?? response.data;
}


/*
|--------------------------------------------------------------------------
| Alarm Summary
|--------------------------------------------------------------------------
*/

export async function getAlarmSummary(params = {}) {

    const response = await apiClient.get(
        "/alarms/summary",
        {
            params
        }
    );

    return response.data?.data ?? response.data;
}


/*
|--------------------------------------------------------------------------
| Alarm Details
|--------------------------------------------------------------------------
*/

export async function getAlarmById(alarmId) {

    const response = await apiClient.get(
        `/alarms/${alarmId}`
    );

    return response.data?.data ?? response.data;
}


/*
|--------------------------------------------------------------------------
| Acknowledge Alarm
|--------------------------------------------------------------------------
*/

export async function acknowledgeAlarm(alarmId) {

    const response = await apiClient.patch(
        `/alarms/${alarmId}/acknowledge`
    );

    return response.data?.data ?? response.data;
}


/*
|--------------------------------------------------------------------------
| Resolve Alarm
|--------------------------------------------------------------------------
*/

export async function resolveAlarm(
    alarmId,
    payload = {}
) {

    const response = await apiClient.patch(
        `/alarms/${alarmId}/resolve`,
        payload
    );

    return response.data?.data ?? response.data;
}


/*
|--------------------------------------------------------------------------
| Delete Alarm
|--------------------------------------------------------------------------
*/

export async function deleteAlarm(alarmId) {

    const response = await apiClient.delete(
        `/alarms/${alarmId}`
    );

    return response.data?.data ?? response.data;
}


/*
|--------------------------------------------------------------------------
| Default Export
|--------------------------------------------------------------------------
*/

export default {

    getActiveAlarms,

    getAlarmHistory,

    getAlarmStatistics,

    getAlarmSummary,

    getAlarmById,

    acknowledgeAlarm,

    resolveAlarm,

    deleteAlarm

};