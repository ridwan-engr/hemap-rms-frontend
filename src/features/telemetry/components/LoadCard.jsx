import {
    Card,
    CardContent,
    CircularProgress,
    Divider,
    Grid,
    LinearProgress,
    Stack,
    Typography,
    Chip
} from "@mui/material";

import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";

import useTelemetry from "../hooks/useTelemetry";

/*
|--------------------------------------------------------------------------
| Metric
|--------------------------------------------------------------------------
*/

function Metric({

    label,

    value,

    unit = ""

}) {

    return (

        <Stack
            direction="row"
            justifyContent="space-between"
        >

            <Typography color="text.secondary">

                {label}

            </Typography>

            <Typography fontWeight={600}>

                {value ?? "--"} {unit}

            </Typography>

        </Stack>

    );

}

/*
|--------------------------------------------------------------------------
| Load Card
|--------------------------------------------------------------------------
*/

export default function LoadCard({

    siteId

}) {

    const {

        telemetry,

        loading

    } = useTelemetry({

        siteId

    });

    if (loading) {

        return (

            <Card>

                <CardContent>

                    <Stack
                        py={5}
                        alignItems="center"
                    >

                        <CircularProgress />

                    </Stack>

                </CardContent>

            </Card>

        );

    }

    const load = telemetry?.load || {};

    const loadingPercentage = load.loadingPercentage ?? 0;

    return (

        <Card>

            <CardContent>

                <Stack

                    direction="row"

                    justifyContent="space-between"

                    alignItems="center"

                >

                    <Typography

                        variant="h6"

                        fontWeight={700}

                    >

                        Site Load

                    </Typography>

                    <ElectricalServicesIcon color="primary" />

                </Stack>

                <Divider sx={{ my: 2 }} />

                <Typography

                    variant="body2"

                    color="text.secondary"

                >

                    Load Utilization

                </Typography>

                <Typography

                    variant="h3"

                    fontWeight={700}

                    mb={1}

                >

                    {loadingPercentage}%

                </Typography>

                <LinearProgress

                    variant="determinate"

                    value={loadingPercentage}

                    color={

                        loadingPercentage < 70

                            ? "success"

                            : loadingPercentage < 90

                                ? "warning"

                                : "error"

                    }

                />

                <Divider sx={{ my: 2 }} />

                <Grid
                    container
                    spacing={2}
                >

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric
                            label="Active Power"
                            value={load.activePower}
                            unit="kW"
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric
                            label="Reactive Power"
                            value={load.reactivePower}
                            unit="kVAR"
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric
                            label="Apparent Power"
                            value={load.apparentPower}
                            unit="kVA"
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric
                            label="Voltage"
                            value={load.voltage}
                            unit="V"
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric
                            label="Current"
                            value={load.current}
                            unit="A"
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric
                            label="Frequency"
                            value={load.frequency}
                            unit="Hz"
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric
                            label="Power Factor"
                            value={load.powerFactor}
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric
                            label="Energy Today"
                            value={load.energyToday}
                            unit="kWh"
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric
                            label="Energy This Month"
                            value={load.energyMonth}
                            unit="kWh"
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric
                            label="Peak Demand"
                            value={load.peakDemand}
                            unit="kW"
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric
                            label="Connected Loads"
                            value={load.connectedLoads}
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Stack

                            direction="row"

                            justifyContent="space-between"

                        >

                            <Typography
                                color="text.secondary"
                            >

                                Status

                            </Typography>

                            <Chip

                                label={
                                    load.status ||
                                    "UNKNOWN"
                                }

                                color={

                                    load.status === "NORMAL"

                                        ? "success"

                                        : load.status === "HIGH"

                                            ? "warning"

                                            : load.status === "OVERLOAD"

                                                ? "error"

                                                : "default"

                                }

                                size="small"

                            />

                        </Stack>

                    </Grid>

                </Grid>

            </CardContent>

        </Card>

    );

}