import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Grid,
    Stack,
    Typography
} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";

import useAnalytics from "../hooks/useAnalytics.js";

import ReliabilityChart from "../components/ReliabilityChart.jsx";
import EnergyChart from "../components/EnergyChart.jsx";
import ForecastChart from "../components/ForecastChart.jsx";
import BatterySOCChart from "../components/BatterySOCChart.jsx";
import FuelConsumptionChart from "../components/FuelConsumptionChart.jsx";
import LoadProfileChart from "../components/LoadProfileChart.jsx";
import SolarGenerationChart from "../components/SolarGenerationChart.jsx";
import AlarmTrendChart from "../components/AlarmTrendChart.jsx";


/*
|--------------------------------------------------------------------------
| Analytics Page
|--------------------------------------------------------------------------
|
| Data flow:
|
| AnalyticsPage
|      ↓
| useAnalytics()
|      ↓
| analyticsSlice
|      ↓
| analyticsApi
|      ↓
| apiClient
|      ↓
| Backend /analytics/*
|
|--------------------------------------------------------------------------
*/

export default function AnalyticsPage() {

    const {
        loading,
        error,
        lastUpdated,
        reload
    } = useAnalytics();


    /*
    |--------------------------------------------------------------------------
    | Error message
    |--------------------------------------------------------------------------
    */

    const errorMessage =
        typeof error === "string"
            ? error
            : error?.message ||
              "Unable to load analytics data.";


    /*
    |--------------------------------------------------------------------------
    | Initial Loading
    |--------------------------------------------------------------------------
    |
    | Only show the full-page loader when there is no error.
    | This prevents an error from being hidden behind an endless spinner.
    |
    */

    if (loading && !error) {

        return (
            <Box
                sx={{
                    minHeight: "70vh",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <Stack
                    spacing={2}
                    alignItems="center"
                >

                    <CircularProgress />

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Loading analytics...
                    </Typography>

                </Stack>
            </Box>
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Analytics Page
    |--------------------------------------------------------------------------
    */

    return (
        <Stack spacing={3}>

            {/* =========================================================
                HEADER
               ========================================================= */}

            <Stack
                direction={{
                    xs: "column",
                    sm: "row"
                }}
                justifyContent="space-between"
                alignItems={{
                    xs: "flex-start",
                    sm: "center"
                }}
                spacing={2}
            >

                <Box>

                    <Typography
                        variant="h4"
                        fontWeight={700}
                    >
                        Analytics
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        Advanced Energy Analytics Dashboard
                    </Typography>

                    {lastUpdated && (
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            display="block"
                            sx={{
                                mt: 0.5
                            }}
                        >
                            Last Updated:{" "}
                            {new Date(lastUpdated).toLocaleString()}
                        </Typography>
                    )}

                </Box>


                <Button
                    variant="contained"
                    startIcon={<RefreshIcon />}
                    onClick={reload}
                    disabled={loading}
                >
                    {loading ? "Refreshing..." : "Refresh"}
                </Button>

            </Stack>


            {/* =========================================================
                GLOBAL ERROR
               ========================================================= */}

            {error && (
                <Alert
                    severity="error"
                    action={
                        <Button
                            color="inherit"
                            size="small"
                            onClick={reload}
                            disabled={loading}
                        >
                            Retry
                        </Button>
                    }
                >
                    <Typography
                        variant="body2"
                        fontWeight={600}
                    >
                        Analytics Error
                    </Typography>

                    <Typography variant="body2">
                        {errorMessage}
                    </Typography>
                </Alert>
            )}


            {/* =========================================================
                ANALYTICS CHARTS
               ========================================================= */}

            <Grid
                container
                spacing={3}
            >

                {/* Reliability */}

                <Grid
                    size={{
                        xs: 12,
                        md: 6
                    }}
                >
                    <ReliabilityChart />
                </Grid>


                {/* Energy */}

                <Grid
                    size={{
                        xs: 12,
                        md: 6
                    }}
                >
                    <EnergyChart />
                </Grid>


                {/* Forecast */}

                <Grid
                    size={{
                        xs: 12,
                        md: 6
                    }}
                >
                    <ForecastChart />
                </Grid>


                {/* Battery SOC */}

                <Grid
                    size={{
                        xs: 12,
                        md: 6
                    }}
                >
                    <BatterySOCChart />
                </Grid>


                {/* Solar Generation */}

                <Grid
                    size={{
                        xs: 12,
                        md: 6
                    }}
                >
                    <SolarGenerationChart />
                </Grid>


                {/* Generator Fuel Consumption */}

                <Grid
                    size={{
                        xs: 12,
                        md: 6
                    }}
                >
                    <FuelConsumptionChart />
                </Grid>


                {/* Load Profile */}

                <Grid
                    size={{
                        xs: 12
                    }}
                >
                    <LoadProfileChart />
                </Grid>


                {/* Alarm Trend */}

                <Grid
                    size={{
                        xs: 12
                    }}
                >
                    <AlarmTrendChart />

                </Grid>

            </Grid>

        </Stack>

    );
    
}