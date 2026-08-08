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

import useOptimization from "../hooks/useOptimization";

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
                    alignItems="center"
                >

                    {icon}

                    <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        align="center"
                    >

                        {title}

                    </Typography>

                    <Typography
                        variant="h5"
                        fontWeight={700}
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

    if (loading) {

        return (

            <Stack

                justifyContent="center"

                alignItems="center"

                sx={{

                    minHeight: 300

                }}

            >

                <CircularProgress />

            </Stack>

        );

    }

    if (error) {

        return (

            <Typography color="error">

                {error}

            </Typography>

        );

    }

    return (

        <Grid

            container

            spacing={3}

        >

            <Grid size={{ xs: 12, md: 3 }}>

                <SummaryCard

                    icon={<Bolt color="primary" />}

                    title="Operating Cost"

                    value={summary?.operatingCost}

                    unit="₦"

                />

            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>

                <SummaryCard

                    icon={<SolarPowerIcon color="success" />}

                    title="Renewable Contribution"

                    value={summary?.renewableContribution}

                    unit="%"

                />

            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>

                <SummaryCard

                    icon={<LocalGasStation color="warning" />}

                    title="Diesel Consumption"

                    value={summary?.dieselConsumption}

                    unit="L"

                />

            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>

                <SummaryCard

                    icon={<BatteryChargingFull color="success" />}

                    title="Battery Throughput"

                    value={summary?.batteryThroughput}

                    unit="kWh"

                />

            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>

                <SummaryCard

                    icon={<Co2 color="action" />}

                    title="CO₂ Avoided"

                    value={summary?.co2Avoided}

                    unit="kg"

                />

            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>

                <SummaryCard

                    icon={<Savings color="success" />}

                    title="Cost Savings"

                    value={summary?.costSavings}

                    unit="₦"

                />

            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>

                <SummaryCard

                    icon={<CheckCircle color="success" />}

                    title="Optimization Status"

                    value={summary?.status}

                />

            </Grid>

            <Grid size={{ xs: 12, md: 3 }}>

                <SummaryCard

                    icon={<Bolt color="primary" />}

                    title="Last Optimization"

                    value={summary?.lastRun}

                />

            </Grid>

        </Grid>

    );

}