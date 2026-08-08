import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback
} from "react";

import dashboardService from "../services/dashboardService.js";
import telemetryService from "../services/telemetryService.js";
import statisticsService from "../services/statisticsService.js";
import analyticsService from "../services/analyticsService.js";

import { useSocket } from "./SocketContext.jsx";

const DashboardContext = createContext(null);

/*
|--------------------------------------------------------------------------
| Provider
|--------------------------------------------------------------------------
*/

export function DashboardProvider({

    children,

    siteId = null

}) {

    const {

        joinSite,
        leaveSite,

        onTelemetry,
        onDashboard,
        onStatistics,
        onAnalytics,

        remove

    } = useSocket();

    const [loading, setLoading] = useState(true);

    const [dashboard, setDashboard] = useState(null);

    const [telemetry, setTelemetry] = useState(null);

    const [statistics, setStatistics] = useState(null);

    const [analytics, setAnalytics] = useState(null);

    const [summary, setSummary] = useState(null);

    const [kpis, setKpis] = useState(null);

    const [charts, setCharts] = useState([]);

    /*
    |--------------------------------------------------------------------------
    | Load Dashboard
    |--------------------------------------------------------------------------
    */

    const loadDashboard = useCallback(async () => {

        try {

            setLoading(true);

            const [

                dashboardData,

                telemetryData,

                statisticsData,

                analyticsData,

                summaryData,

                kpiData,

                chartData

            ] = await Promise.all([

                siteId

                    ? dashboardService.getSiteDashboard(siteId)

                    : dashboardService.getDashboard(),

                telemetryService.getLatestTelemetry(siteId),

                statisticsService.getStatistics(siteId),

                analyticsService.getAnalytics(siteId),

                dashboardService.getDashboardSummary(),

                dashboardService.getDashboardKPIs(),

                dashboardService.getDashboardCharts()

            ]);

            setDashboard(dashboardData);

            setTelemetry(telemetryData);

            setStatistics(statisticsData);

            setAnalytics(analyticsData);

            setSummary(summaryData);

            setKpis(kpiData);

            setCharts(chartData);

        }

        catch (error) {

            console.error(error);

        }

        finally {

            setLoading(false);

        }

    }, [siteId]);

    /*
    |--------------------------------------------------------------------------
    | Initial Load
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        loadDashboard();

    }, [loadDashboard]);

    /*
    |--------------------------------------------------------------------------
    | Join Socket Room
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (!siteId) {

            return;

        }

        joinSite(siteId);

        return () => {

            leaveSite(siteId);

        };

    }, [siteId]);

    /*
    |--------------------------------------------------------------------------
    | Live Updates
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        onTelemetry((payload) => {

            setTelemetry(payload);

        });

        onDashboard((payload) => {

            setDashboard((previous) => ({

                ...previous,

                ...payload

            }));

        });

        onStatistics((payload) => {

            setStatistics(payload);

        });

        onAnalytics((payload) => {

            setAnalytics(payload);

        });

        return () => {

            remove("telemetry");

            remove("dashboard-update");

            remove("statistics");

            remove("analytics");

        };

    }, []);

    /*
    |--------------------------------------------------------------------------
    | Manual Refresh
    |--------------------------------------------------------------------------
    */

    async function refreshDashboard() {

        await dashboardService.refreshDashboard();

        await loadDashboard();

    }

    return (

        <DashboardContext.Provider

            value={{

                loading,

                dashboard,

                telemetry,

                statistics,

                analytics,

                summary,

                kpis,

                charts,

                refreshDashboard

            }}

        >

            {children}

        </DashboardContext.Provider>

    );

}

/*
|--------------------------------------------------------------------------
| Hook
|--------------------------------------------------------------------------
*/

export function useDashboard() {

    const context = useContext(

        DashboardContext

    );

    if (!context) {

        throw new Error(

            "useDashboard must be used inside DashboardProvider."

        );

    }

    return context;

}