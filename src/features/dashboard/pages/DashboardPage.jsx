import { useEffect } from "react";

import {
    Alert,
    Grid,
    Stack
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import DashboardHeader from "../components/DashboardHeader.jsx";
import DashboardKPIs from "../components/DashboardKPIs.jsx";
import DashboardStatus from "../components/DashboardStatus.jsx";
import DashboardTelemetry from "../components/DashboardTelemetry.jsx";
import DashboardAlarms from "../components/DashboardAlarms.jsx";
import DashboardEnergy from "../components/DashboardEnergy.jsx";
import DashboardReliability from "../components/DashboardReliability.jsx";
import DashboardOptimization from "../components/DashboardOptimization.jsx";
import DashboardForecast from "../components/DashboardForecast.jsx";

import {
    fetchDashboard,
    fetchDashboardCards,
    fetchDashboardKPIs,
    fetchDashboardMap,
    fetchDashboardCharts,
    refreshDashboard
} from "../../../store/slices/dashboardSlice.js";


export default function DashboardPage() {

    const dispatch = useDispatch();

    const {
        loading,
        refreshing,
        error,
        dashboard,
        cards,
        kpis,
        map,
        charts,
        lastUpdated
    } = useSelector(
        (state) => state.dashboard
    );


    /*
    |--------------------------------------------------------------------------
    | Load Dashboard Data
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        dispatch(fetchDashboard());
        dispatch(fetchDashboardCards());
        dispatch(fetchDashboardKPIs());
        dispatch(fetchDashboardMap());
        dispatch(fetchDashboardCharts());

    }, [dispatch]);


    /*
    |--------------------------------------------------------------------------
    | Refresh
    |--------------------------------------------------------------------------
    */

    const handleRefresh = () => {

        dispatch(refreshDashboard());

        dispatch(fetchDashboard());
        dispatch(fetchDashboardCards());
        dispatch(fetchDashboardKPIs());
        dispatch(fetchDashboardMap());
        dispatch(fetchDashboardCharts());

    };


    /*
    |--------------------------------------------------------------------------
    | Error
    |--------------------------------------------------------------------------
    */

    if (error) {

        return (
            <Alert severity="error">

                {
                    typeof error === "string"
                        ? error
                        : error?.message ||
                          "Unable to load dashboard data."
                }

            </Alert>
        );

    }


    /*
    |--------------------------------------------------------------------------
    | Dashboard
    |--------------------------------------------------------------------------
    */

    return (

        <Stack spacing={3}>

            <DashboardHeader
                loading={loading || refreshing}
                lastUpdated={lastUpdated}
                onRefresh={handleRefresh}
            />


            <DashboardKPIs
                cards={cards}
                kpis={kpis}
                loading={loading}
            />


            <DashboardStatus
                statistics={dashboard?.statistics}
                loading={loading}
            />


            <DashboardTelemetry
                telemetry={dashboard?.telemetry}
                loading={loading}
            />


            <DashboardEnergy
                statistics={dashboard?.statistics}
                loading={loading}
            />


            <Grid
                container
                spacing={3}
            >

                <Grid
                    size={{
                        xs: 12,
                        lg: 6
                    }}
                >

                    <DashboardAlarms
                        alarms={
                            dashboard?.alarms ??
                            dashboard?.statistics?.alarms ??
                            []
                        }
                        loading={loading}
                    />

                </Grid>


                <Grid
                    size={{
                        xs: 12,
                        lg: 6
                    }}
                >

                    <DashboardReliability
                        reliability={
                            dashboard?.reliability
                        }
                        loading={loading}
                    />

                </Grid>

            </Grid>


            <DashboardOptimization
                optimization={
                    dashboard?.optimization
                }
                loading={loading}
            />


            <DashboardForecast
                forecasts={
                    dashboard?.forecast ??
                    dashboard?.forecasts ??
                    {}
                }
                loading={loading}
            />

        </Stack>

    );

}