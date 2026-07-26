import api from "../../../api/axios";

/*
|--------------------------------------------------------------------------
| Analytics API
|--------------------------------------------------------------------------
|
| Centralized Analytics API.
| Components and hooks should never call axios directly.
|
*/

/*
|--------------------------------------------------------------------------
| Dashboard Analytics
|--------------------------------------------------------------------------
*/

export async function getDashboardAnalytics(params = {}) {

    const response = await api.get(

        "/analytics/dashboard",

        {

            params

        }

    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Reliability Analytics
|--------------------------------------------------------------------------
*/

export async function getReliabilityMetrics(params = {}) {

    const response = await api.get(

        "/analytics/reliability",

        {

            params

        }

    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Energy Forecast
|--------------------------------------------------------------------------
*/

export async function getEnergyForecast(params = {}) {

    const response = await api.get(

        "/analytics/forecast",

        {

            params

        }

    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Energy Trends
|--------------------------------------------------------------------------
*/

export async function getEnergyTrends(params = {}) {

    const response = await api.get(

        "/analytics/trends",

        {

            params

        }

    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Optimization Summary
|--------------------------------------------------------------------------
*/

export async function getOptimizationSummary(params = {}) {

    const response = await api.get(

        "/analytics/optimization",

        {

            params

        }

    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| KPI Comparison
|--------------------------------------------------------------------------
*/

export async function getKPIComparison(params = {}) {

    const response = await api.get(

        "/analytics/kpis",

        {

            params

        }

    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Availability
|--------------------------------------------------------------------------
*/

export async function getAvailability(params = {}) {

    const response = await api.get(

        "/analytics/availability",

        {

            params

        }

    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Battery Health
|--------------------------------------------------------------------------
*/

export async function getBatteryHealth(params = {}) {

    const response = await api.get(

        "/analytics/battery",

        {

            params

        }

    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Solar Performance
|--------------------------------------------------------------------------
*/

export async function getSolarPerformance(params = {}) {

    const response = await api.get(

        "/analytics/solar",

        {

            params

        }

    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Generator Performance
|--------------------------------------------------------------------------
*/

export async function getGeneratorPerformance(params = {}) {

    const response = await api.get(

        "/analytics/generator",

        {

            params

        }

    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Weather Impact
|--------------------------------------------------------------------------
*/

export async function getWeatherImpact(params = {}) {

    const response = await api.get(

        "/analytics/weather",

        {

            params

        }

    );

    return response.data;

}

/*
|--------------------------------------------------------------------------
| Refresh Analytics Cache
|--------------------------------------------------------------------------
*/

export async function refreshAnalytics(params = {}) {

    const response = await api.post(

        "/analytics/refresh",

        params

    );

    return response.data;

}

export default {

    getDashboardAnalytics,

    getReliabilityMetrics,

    getEnergyForecast,

    getEnergyTrends,

    getOptimizationSummary,

    getKPIComparison,

    getAvailability,

    getBatteryHealth,

    getSolarPerformance,

    getGeneratorPerformance,

    getWeatherImpact,

    refreshAnalytics

};