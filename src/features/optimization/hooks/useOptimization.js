import { useCallback, useEffect, useState } from "react";

import * as optimizationApi from "../api/optimizationApi";

/*
|--------------------------------------------------------------------------
| Optimization Hook
|--------------------------------------------------------------------------
|
| Centralized hook for all optimization data.
| Every optimization component should consume this hook instead of making
| individual API requests.
|
*/

export default function useOptimization(filters = {}) {

    const [summary, setSummary] = useState(null);

    const [dispatch, setDispatch] = useState(null);

    const [batterySchedule, setBatterySchedule] = useState(null);

    const [generatorSchedule, setGeneratorSchedule] = useState(null);

    const [renewableContribution, setRenewableContribution] = useState(null);

    const [costSavings, setCostSavings] = useState(null);

    const [recommendations, setRecommendations] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState(null);

    /*
    |--------------------------------------------------------------------------
    | Load Optimization
    |--------------------------------------------------------------------------
    */

    const loadOptimization = useCallback(async () => {

        try {

            setLoading(true);

            setError(null);

            const [

                summary,

                dispatch,

                batterySchedule,

                generatorSchedule,

                renewableContribution,

                costSavings,

                recommendations

            ] = await Promise.all([

                optimizationApi.getOptimizationSummary(filters),

                optimizationApi.getEconomicDispatch(filters),

                optimizationApi.getBatterySchedule(filters),

                optimizationApi.getGeneratorSchedule(filters),

                optimizationApi.getRenewableContribution(filters),

                optimizationApi.getCostSavings(filters),

                optimizationApi.getRecommendations(filters)

            ]);

            setSummary(summary);

            setDispatch(dispatch);

            setBatterySchedule(batterySchedule);

            setGeneratorSchedule(generatorSchedule);

            setRenewableContribution(renewableContribution);

            setCostSavings(costSavings);

            setRecommendations(recommendations);

        }

        catch (err) {

            setError(

                err.response?.data?.message ||

                err.message ||

                "Unable to load optimization data."

            );

        }

        finally {

            setLoading(false);

        }

    }, [filters]);

    /*
    |--------------------------------------------------------------------------
    | Refresh
    |--------------------------------------------------------------------------
    */

    const refresh = useCallback(() => {

        loadOptimization();

    }, [loadOptimization]);

    /*
    |--------------------------------------------------------------------------
    | Initial Load
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        loadOptimization();

    }, [loadOptimization]);

    return {

        summary,

        dispatch,

        batterySchedule,

        generatorSchedule,

        renewableContribution,

        costSavings,

        recommendations,

        loading,

        error,

        refresh

    };

}