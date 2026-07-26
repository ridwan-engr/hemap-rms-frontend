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

import SpeedIcon from "@mui/icons-material/Speed";

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
| Smart Meter Card
|--------------------------------------------------------------------------
*/

export default function SmartMeterCard({

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

    const meter = telemetry?.smartMeter || {};

    const pf = meter.powerFactor ?? 0;

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

                        Smart Meter

                    </Typography>

                    <SpeedIcon color="primary" />

                </Stack>

                <Divider sx={{ my: 2 }} />

                <Typography

                    variant="body2"

                    color="text.secondary"

                >

                    Power Factor

                </Typography>

                <Typography

                    variant="h3"

                    fontWeight={700}

                    mb={1}

                >

                    {pf}

                </Typography>

                <LinearProgress

                    variant="determinate"

                    value={(pf * 100)}

                    color={

                        pf >= 0.95

                            ? "success"

                            : pf >= 0.85

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
                            label="Voltage"
                            value={meter.voltage}
                            unit="V"
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric
                            label="Current"
                            value={meter.current}
                            unit="A"
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric
                            label="Frequency"
                            value={meter.frequency}
                            unit="Hz"
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric
                            label="Active Power"
                            value={meter.activePower}
                            unit="kW"
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric
                            label="Reactive Power"
                            value={meter.reactivePower}
                            unit="kVAR"
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric
                            label="Apparent Power"
                            value={meter.apparentPower}
                            unit="kVA"
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric
                            label="Energy Import"
                            value={meter.energyImport}
                            unit="kWh"
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric
                            label="Energy Export"
                            value={meter.energyExport}
                            unit="kWh"
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric
                            label="Demand"
                            value={meter.maximumDemand}
                            unit="kW"
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric
                            label="THD"
                            value={meter.thd}
                            unit="%"
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric
                            label="Meter Serial"
                            value={meter.serialNumber}
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
                                    meter.status ||
                                    "UNKNOWN"
                                }

                                color={

                                    meter.status === "ONLINE"

                                        ? "success"

                                        : meter.status === "WARNING"

                                            ? "warning"

                                            : meter.status === "FAULT"

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