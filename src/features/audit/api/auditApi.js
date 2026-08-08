import apiClient from "../../../services/api/apiClient";

/**
 * Audit API
 *
 * All audit-log REST requests originate here.
 * Components and hooks should never call axios directly.
 */

/**
 * Get Audit Logs
 *
 * Backend:
 * GET /audit
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

/**
 * Export Audit Logs
 *
 * Backend:
 * GET /audit/export
 */
export async function exportAuditLogs(params = {}) {
    const { data } = await apiClient.get(
        "/audit/export",
        {
            params
        }
    );

    return data;
}

/**
 * Get Audit Log By ID
 *
 * Backend:
 * GET /audit/:auditLogId
 */
export async function getAuditLog(auditLogId) {
    const { data } = await apiClient.get(
        `/audit/${auditLogId}`
    );

    return data;
}

/**
 * Create Audit Log
 *
 * Backend:
 * POST /audit
 */
export async function createAuditLog(payload) {
    const { data } = await apiClient.post(
        "/audit",
        payload
    );

    return data;
}

/**
 * Delete Audit Log
 *
 * Backend:
 * DELETE /audit/:auditLogId
 */
export async function deleteAuditLog(auditLogId) {
    const { data } = await apiClient.delete(
        `/audit/${auditLogId}`
    );

    return data;
}

export default {
    getAuditLogs,
    exportAuditLogs,
    getAuditLog,
    createAuditLog,
    deleteAuditLog
};