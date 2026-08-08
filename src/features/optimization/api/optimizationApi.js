import apiClient from "../../../services/api/apiClient";

/**
 * Optimization API
 *
 * Centralized API service for optimization results.
 * Components and hooks should never call axios directly.
 */

/**
 * Get latest optimization for a site
 *
 * Backend:
 * GET /optimization/latest/:siteId
 *
 * @param {String} siteId
 * @returns {Promise<Object>}
 */
export async function getLatestOptimization(siteId) {
    if (!siteId) {
        throw new Error("siteId is required");
    }

    const { data } = await apiClient.get(
        `/optimization/latest/${siteId}`
    );

    return data;
}

/**
 * Get optimization history
 *
 * Backend:
 * GET /optimization/history
 *
 * @param {Object} params
 * @returns {Promise<Object>}
 */
export async function getOptimizationHistory(params = {}) {
    const { data } = await apiClient.get(
        "/optimization/history",
        {
            params
        }
    );

    return data;
}

/**
 * Get optimization by ID
 *
 * Backend:
 * GET /optimization/:id
 *
 * @param {String} optimizationId
 * @returns {Promise<Object>}
 */
export async function getOptimization(optimizationId) {
    if (!optimizationId) {
        throw new Error("optimizationId is required");
    }

    const { data } = await apiClient.get(
        `/optimization/${optimizationId}`
    );

    return data;
}

/**
 * Get dispatch schedule
 *
 * Backend:
 * GET /optimization/:id/dispatch
 *
 * @param {String} optimizationId
 * @returns {Promise<Object>}
 */
export async function getDispatchSchedule(optimizationId) {
    if (!optimizationId) {
        throw new Error("optimizationId is required");
    }

    const { data } = await apiClient.get(
        `/optimization/${optimizationId}/dispatch`
    );

    return data;
}

/**
 * Get energy summary
 *
 * Backend:
 * GET /optimization/:id/energy
 *
 * @param {String} optimizationId
 * @returns {Promise<Object>}
 */
export async function getEnergySummary(optimizationId) {
    if (!optimizationId) {
        throw new Error("optimizationId is required");
    }

    const { data } = await apiClient.get(
        `/optimization/${optimizationId}/energy`
    );

    return data;
}

/**
 * Get economics
 *
 * Backend:
 * GET /optimization/:id/economics
 *
 * @param {String} optimizationId
 * @returns {Promise<Object>}
 */
export async function getEconomics(optimizationId) {
    if (!optimizationId) {
        throw new Error("optimizationId is required");
    }

    const { data } = await apiClient.get(
        `/optimization/${optimizationId}/economics`
    );

    return data;
}

/**
 * Get emissions
 *
 * Backend:
 * GET /optimization/:id/emissions
 *
 * @param {String} optimizationId
 * @returns {Promise<Object>}
 */
export async function getEmissions(optimizationId) {
    if (!optimizationId) {
        throw new Error("optimizationId is required");
    }

    const { data } = await apiClient.get(
        `/optimization/${optimizationId}/emissions`
    );

    return data;
}

/**
 * Get reliability metrics
 *
 * Backend:
 * GET /optimization/:id/reliability
 *
 * @param {String} optimizationId
 * @returns {Promise<Object>}
 */
export async function getReliability(optimizationId) {
    if (!optimizationId) {
        throw new Error("optimizationId is required");
    }

    const { data } = await apiClient.get(
        `/optimization/${optimizationId}/reliability`
    );

    return data;
}

/**
 * Get solver information
 *
 * Backend:
 * GET /optimization/:id/solver
 *
 * @param {String} optimizationId
 * @returns {Promise<Object>}
 */
export async function getSolver(optimizationId) {
    if (!optimizationId) {
        throw new Error("optimizationId is required");
    }

    const { data } = await apiClient.get(
        `/optimization/${optimizationId}/solver`
    );

    return data;
}

export default {
    getLatestOptimization,
    getOptimizationHistory,
    getOptimization,
    getDispatchSchedule,
    getEnergySummary,
    getEconomics,
    getEmissions,
    getReliability,
    getSolver
};