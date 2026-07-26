import {

    Box,

    Grid,

    Stack,

    Typography,

    Button,

    CircularProgress

} from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";

import useAnalytics from "../hooks/useAnalytics.js";

import ReliabilityChart from "../components/ReliabilityChart.jsx";
import EnergyChart from "../components/EnergyChart.jsx";
import ForecastChart from "../components/ForecastChart.jsx";
import BatterySocChart from "../components/BatterySOCChart.jsx";
import FuelConsumptionChart from "../components/FuelConsumptionChart.jsx";
import LoadProfile from "../components/LoadProfileChart.jsx";
import SolarGenerationChart from "../components/SolarGenerationChart.jsx";
import AlarmTrendChart from "../components/AlarmTrendChart.jsx";
/*
|--------------------------------------------------------------------------
| Analytics Page
|--------------------------------------------------------------------------
*/

export default function AnalyticsPage() {

    const {

        loading,

        refreshing,

        lastUpdated,

        refresh

    } = useAnalytics();

    if (loading) {

        return (

            <Box

                display="flex"

                justifyContent="center"

                alignItems="center"

                minHeight="70vh"

            >

                <CircularProgress />

            </Box>

        );

    }

    return (

        <Stack spacing={3}>

            <Stack

                direction="row"

                justifyContent="space-between"

                alignItems="center"

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

                    {

                        lastUpdated && (

                            <Typography

                                variant="caption"

                                color="text.secondary"

                            >

                                Last Updated: {lastUpdated}

                            </Typography>

                        )

                    }

                </Box>

                <Button

                    variant="contained"

                    startIcon={<RefreshIcon />}

                    onClick={refresh}

                    disabled={refreshing}

                >

                    Refresh

                </Button>

            </Stack>

            <Grid container spacing={3}>

                <Grid size={{ xs: 12, md: 6 }}>

                    <ReliabilityChart />

                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>

                    <EnergyChart />

                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>

                    <ForecastChart />

                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>

                    <BatterySocChart />

                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>

                    <SolarGenerationChart />

                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>

                    <FuelConsumptionChart />

                </Grid>

                <Grid size={{ xs: 12 }}>

                    <LoadProfile />

                </Grid>

                <Grid size={{ xs: 12 }}>

                    <AlarmTrendChart />

                </Grid>

            </Grid>

        </Stack>

    );

}