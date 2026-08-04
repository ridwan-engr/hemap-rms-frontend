import api from "../../../api/axios.js";

/*
|--------------------------------------------------------------------------
| Alarm API
|--------------------------------------------------------------------------
|
| All Alarm REST requests originate here.
| Components should NEVER call axios directly.
|
*/

/*
|--------------------------------------------------------------------------
| Alarm List
|--------------------------------------------------------------------------
*/

export async function getAlarms(params = {}) {

    const response = await api.get(

        "/alarms",

        {

            params

        }

    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Active Alarm Summary
|--------------------------------------------------------------------------
*/

export async function getActiveSummary(params = {}) {

    const response = await api.get(

        "/alarms/active",

        {

            params

        }

    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Alarm Statistics
|--------------------------------------------------------------------------
*/

export async function getAlarmStatistics(params = {}) {

    const response = await api.get(

        "/alarms/statistics",

        {

            params

        }

    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Severity Distribution
|--------------------------------------------------------------------------
*/

export async function getSeverityDistribution(params = {}) {

    const response = await api.get(

        "/alarms/severity",

        {

            params

        }

    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Alarm Trends
|--------------------------------------------------------------------------
*/

export async function getAlarmTrends(params = {}) {

    const response = await api.get(

        "/alarms/trends",

        {

            params

        }

    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Alarm Details
|--------------------------------------------------------------------------
*/

export async function getAlarmById(id) {

    const response = await api.get(

        `/alarms/${id}`

    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Acknowledge Alarm
|--------------------------------------------------------------------------
*/

export async function acknowledgeAlarm(id) {

    const response = await api.post(

        `/alarms/${id}/acknowledge`

    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Resolve Alarm
|--------------------------------------------------------------------------
*/

export async function resolveAlarm(id, payload = {}) {

    const response = await api.post(

        `/alarms/${id}/resolve`,

        payload

    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Delete Alarm
|--------------------------------------------------------------------------
*/

export async function deleteAlarm(id) {

    const response = await api.delete(

        `/alarms/${id}`

    );

    return response.data;

}

export default {

    getAlarms,

    getActiveSummary,

    getAlarmStatistics,

    getSeverityDistribution,

    getAlarmTrends,

    getAlarmById,

    acknowledgeAlarm,

    resolveAlarm,

    deleteAlarm

};