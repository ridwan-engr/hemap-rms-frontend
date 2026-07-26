import apiClient from "../../../services/api/apiClient";

/*
|--------------------------------------------------------------------------
| Audit Logs
|--------------------------------------------------------------------------
*/

export async function getAuditLogs(params = {}) {

    const { data } = await apiClient.get(

        "/audit",

        {

            params

        }

    );

    return data;

}

export async function getAuditLog(auditId) {

    const { data } = await apiClient.get(

        `/audit/${auditId}`

    );

    return data;

}

export async function createAuditLog(payload) {

    const { data } = await apiClient.post(

        "/audit",

        payload

    );

    return data;

}

export async function updateAuditLog(

    auditId,

    payload

) {

    const { data } = await apiClient.put(

        `/audit/${auditId}`,

        payload

    );

    return data;

}

export async function deleteAuditLog(auditId) {

    const { data } = await apiClient.delete(

        `/audit/${auditId}`

    );

    return data;

}

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

export async function getAuditSummary() {

    const { data } = await apiClient.get(

        "/audit/summary"

    );

    return data;

}

export async function getAuditStatistics() {

    const { data } = await apiClient.get(

        "/audit/statistics"

    );

    return data;

}