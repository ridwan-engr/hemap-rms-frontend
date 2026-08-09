import {
    Card,
    CardContent,
    CircularProgress,
    Grid,
    Stack,
    Typography
} from "@mui/material";

import {
    Bolt,
    BatteryChargingFull,
    Savings,
    Co2,
    LocalGasStation,
    CheckCircle
} from "@mui/icons-material";

import SolarPowerIcon from "@mui/icons-material/SolarPower";

import useOptimization from "../hooks/useOptimization.js";

/*
|--------------------------------------------------------------------------
| KPI Card
|--------------------------------------------------------------------------
*/

function SummaryCard({
    icon,
    title,
    value,
    unit
}) {

    return (
        <Card
            elevation={2}
            sx={{
                height: "100%"
            }}
        >

            <CardContent>

                <Stack
                    spacing={2}
                    sx={{
                        alignItems: "center"
                    }}
                >

                    {icon}

                    <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        sx={{
                            textAlign: "center"
                        }}
                    >
                        {title}
                    </Typography>

                    <Typography
                        variant="h5"
                        fontWeight={700}
                        sx={{
                            textAlign: "center"
                        }}
                    >
                        {value ?? "--"}

                        {unit && ` ${unit}`}
                    </Typography>

                </Stack>

            </CardContent>

        </Card>
    );
}

/*
|--------------------------------------------------------------------------
| Dispatch Summary
|--------------------------------------------------------------------------
*/

export default function DispatchSummary({
    siteId
}) {

    const {
        summary,
        loading,
        error
    } = useOptimization({
        siteId
    });

    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    if (loading) {

        return (
            <Stack
                sx={{
                    minHeight: 300,
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <CircularProgress />
            </Stack>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Error
    |--------------------------------------------------------------------------
    */

    if (error) {

        return (
            <Typography
                color="error"
            >
                {typeof error === "string"
                    ? error
                    : error?.message ||
                      "Unable to load optimization summary."
                }
            </Typography>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <Grid
            container
            spacing={3}
        >

            {/* Operating Cost */}

            <Grid
                size={{
                    xs: 12,
                    sm: 6,
                    md: 3
                }}
            >
                <SummaryCard
                    icon={
                        <Bolt color="primary" />
                    }
                    title="Operating Cost"
                    value={
                        summary?.operatingCost
                    }
                    unit="₦"
                />
            </Grid>

            {/* Renewable Contribution */}

            <Grid
                size={{
                    xs: 12,
                    sm: 6,
                    md: 3
                }}
            >
                <SummaryCard
                    icon={
                        <SolarPowerIcon
                            color="success"
                        />
                    }
                    title="Renewable Contribution"
                    value={
                        summary?.renewableContribution
                    }
                    unit="%"
                />
            </Grid>

            {/* Diesel Consumption */}

            <Grid
                size={{
                    xs: 12,
                    sm: 6,
                    md: 3
                }}
            >
                <SummaryCard
                    icon={
                        <LocalGasStation
                            color="warning"
                        />
                    }
                    title="Diesel Consumption"
                    value={
                        summary?.dieselConsumption
                    }
                    unit="L"
                />
            </Grid>

            {/* Battery Throughput */}

            <Grid
                size={{
                    xs: 12,
                    sm: 6,
                    md: 3
                }}
            >
                <SummaryCard
                    icon={
                        <BatteryChargingFull
                            color="success"
                        />
                    }
                    title="Battery Throughput"
                    value={
                        summary?.batteryThroughput
                    }
                    unit="kWh"
                />
            </Grid>

            {/* CO2 Avoided */}

            <Grid
                size={{
                    xs: 12,
                    sm: 6,
                    md: 3
                }}
            >
                <SummaryCard
                    icon={
                        <Co2
                            color="action"
                        />
                    }
                    title="CO₂ Avoided"
                    value={
                        summary?.co2Avoided
                    }
                    unit="kg"
                />
            </Grid>

            {/* Cost Savings */}

            <Grid
                size={{
                    xs: 12,
                    sm: 6,
                    md: 3
                }}
            >
                <SummaryCard
                    icon={
                        <Savings
                            color="success"
                        />
                    }
                    title="Cost Savings"
                    value={
                        summary?.costSavings
                    }
                    unit="₦"
                />
            </Grid>

            {/* Optimization Status */}

            <Grid
                size={{
                    xs: 12,
                    sm: 6,
                    md: 3
                }}
            >
                <SummaryCard
                    icon={
                        <CheckCircle
                            color="success"
                        />
                    }
                    title="Optimization Status"
                    value={
                        summary?.status
                    }
                />
            </Grid>

            {/* Last Optimization */}

            <Grid
                size={{
                    xs: 12,
                    sm: 6,
                    md: 3
                }}
            >
                <SummaryCard
                    icon={
                        <Bolt
                            color="primary"
                        />
                    }
                    title="Last Optimization"
                    value={
                        summary?.lastRun
                    }
                />
            </Grid>

        </Grid>
    );
}