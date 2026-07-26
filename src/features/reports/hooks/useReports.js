import { useCallback } from "react";

import {

    useDispatch,
    useSelector

} from "react-redux";

import {

    generateSiteOverviewAsync,
    generateEnergyAsync,
    generateBatteryAsync,
    generateReliabilityAsync,
    generateAlarmAsync,
    generateMaintenanceAsync,
    generateDashboardAsync,
    generateExecutiveAsync,
    exportReportAsync,
    fetchReportResponse,
    clearReport

} from "../../../store/slices/reportSlice";

/*
|--------------------------------------------------------------------------
| useReports
|--------------------------------------------------------------------------
*/

export default function useReports() {

    const dispatch = useDispatch();

    const {

        report,

        summary,

        exportData,

        loading,

        exporting,

        error,

        lastGenerated

    } = useSelector(

        state => state.reports

    );

    /*
    |--------------------------------------------------------------------------
    | Report Generators
    |--------------------------------------------------------------------------
    */

    const generateSiteOverview = useCallback(

        payload => dispatch(

            generateSiteOverviewAsync(payload)

        ),

        [

            dispatch

        ]

    );

    const generateEnergy = useCallback(

        payload => dispatch(

            generateEnergyAsync(payload)

        ),

        [

            dispatch

        ]

    );

    const generateBattery = useCallback(

        payload => dispatch(

            generateBatteryAsync(payload)

        ),

        [

            dispatch

        ]

    );

    const generateReliability = useCallback(

        payload => dispatch(

            generateReliabilityAsync(payload)

        ),

        [

            dispatch

        ]

    );

    const generateAlarm = useCallback(

        payload => dispatch(

            generateAlarmAsync(payload)

        ),

        [

            dispatch

        ]

    );

    const generateMaintenance = useCallback(

        payload => dispatch(

            generateMaintenanceAsync(payload)

        ),

        [

            dispatch

        ]

    );

    const generateDashboard = useCallback(

        payload => dispatch(

            generateDashboardAsync(payload)

        ),

        [

            dispatch

        ]

    );

    const generateExecutive = useCallback(

        payload => dispatch(

            generateExecutiveAsync(payload)

        ),

        [

            dispatch

        ]

    );

    /*
    |--------------------------------------------------------------------------
    | Export
    |--------------------------------------------------------------------------
    */

    const exportGeneratedReport = useCallback(

        payload => dispatch(

            exportReportAsync(payload)

        ),

        [

            dispatch

        ]

    );

    /*
    |--------------------------------------------------------------------------
    | Report Response
    |--------------------------------------------------------------------------
    */

    const loadReportResponse = useCallback(

        reportId => dispatch(

            fetchReportResponse(reportId)

        ),

        [

            dispatch

        ]

    );

    /*
    |--------------------------------------------------------------------------
    | Clear
    |--------------------------------------------------------------------------
    */

    const resetReport = useCallback(

        () => dispatch(

            clearReport()

        ),

        [

            dispatch

        ]

    );

    return {

        report,

        summary,

        exportData,

        loading,

        exporting,

        error,

        lastGenerated,

        generateSiteOverview,

        generateEnergy,

        generateBattery,

        generateReliability,

        generateAlarm,

        generateMaintenance,

        generateDashboard,

        generateExecutive,

        exportGeneratedReport,

        loadReportResponse,

        resetReport

    };

}