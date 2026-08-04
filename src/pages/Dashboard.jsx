import { useEffect } from "react";
import { Alert, Grid, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import DashboardHeader from "../features/dashboard/components/DashboardHeader.jsx";
import DashboardKPIs from "../features/dashboard/components/DashboardKPIs.jsx";
import DashboardStatus from "../features/dashboard/components/DashboardStatus.jsx";
import DashboardTelemetry from "../features/dashboard/components/DashboardTelemetry.jsx";
import DashboardAlarms from "../features/dashboard/components/DashboardAlarms.jsx";
import DashboardEnergy from "../features/dashboard/components/DashboardEnergy.jsx";
import DashboardReliability from "../features/dashboard/components/DashboardReliability.jsx";
import DashboardOptimization from "../features/dashboard/components/DashboardOptimization.jsx";
import DashboardForecast from "../features/dashboard/components/DashboardForecast.jsx";

import {
    fetchDashboard,
    refreshDashboard
} from "../store/slices/dashboardSlice.js";

export default function Dashboard() {

    const dispatch = useDispatch();

    const {
        loading,
        error,
        dashboard,
        lastUpdated
    } = useSelector((state) => state.dashboard);

    useEffect(() => {
        dispatch(fetchDashboard());
    }, [dispatch]);

    const handleRefresh = () => {
        dispatch(refreshDashboard());
    };

    if (error) {

        return (
            <Alert severity="error">
                {
                    typeof error === "string"
                        ? error
                        : error?.message ??
                        JSON.stringify(error)
                }
            </Alert>
        );

    }

    return (

        <Stack spacing={3}>

            <DashboardHeader
                loading={loading}
                lastUpdated={lastUpdated}
                onRefresh={() => dispatch(refreshDashboard())}
            />

            <DashboardKPIs

                cards={dashboard?.statistics}

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
                        alarms={dashboard?.statistics?.alarms ?? []}
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
                        reliability={dashboard?.reliability}
                        loading={loading}
                    />

                </Grid>

            </Grid>

            <DashboardOptimization
                optimization={dashboard?.optimization}
                loading={loading}
            />

            <DashboardForecast
                forecasts={dashboard?.forecasts}
                loading={loading}
            />

        </Stack>

    );

}