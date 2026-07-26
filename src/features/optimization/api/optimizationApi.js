import api from "../../../api/axios";

/*
|--------------------------------------------------------------------------
| Optimization Summary
|--------------------------------------------------------------------------
*/

export async function getOptimizationSummary(filters = {}) {

    const response = await api.get(

        "/dashboard/optimization",

        {

            params: filters

        }

    );

    return response.data.data;

}

/*
|--------------------------------------------------------------------------
| Economic Dispatch
|--------------------------------------------------------------------------
*/

export async function getEconomicDispatch(filters = {}) {

    const response = await api.get(

        "/optimization/economic-dispatch",

        {

            params: filters

        }

    );

    return response.data.data;

}

/*
|--------------------------------------------------------------------------
| Battery Schedule
|--------------------------------------------------------------------------
*/

export async function getBatterySchedule(filters = {}) {

    const response = await api.get(

        "/optimization/battery-schedule",

        {

            params: filters

        }

    );

    return response.data.data;

}

/*
|--------------------------------------------------------------------------
| Generator Schedule
|--------------------------------------------------------------------------
*/

export async function getGeneratorSchedule(filters = {}) {

    const response = await api.get(

        "/optimization/generator-schedule",

        {

            params: filters

        }

    );

    return response.data.data;

}

/*
|--------------------------------------------------------------------------
| Renewable Contribution
|--------------------------------------------------------------------------
*/

export async function getRenewableContribution(filters = {}) {

    const response = await api.get(

        "/optimization/renewable-contribution",

        {

            params: filters

        }

    );

    return response.data.data;

}

/*
|--------------------------------------------------------------------------
| Cost Savings
|--------------------------------------------------------------------------
*/

export async function getCostSavings(filters = {}) {

    const response = await api.get(

        "/optimization/cost-savings",

        {

            params: filters

        }

    );

    return response.data.data;

}

/*
|--------------------------------------------------------------------------
| Recommendations
|--------------------------------------------------------------------------
*/

export async function getRecommendations(filters = {}) {

    const response = await api.get(

        "/optimization/recommendations",

        {

            params: filters

        }

    );

    return response.data.data;

}

export default {

    getOptimizationSummary,

    getEconomicDispatch,

    getBatterySchedule,

    getGeneratorSchedule,

    getRenewableContribution,

    getCostSavings,

    getRecommendations

};