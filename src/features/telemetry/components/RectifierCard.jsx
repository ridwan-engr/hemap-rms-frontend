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
| Rectifier Card
|--------------------------------------------------------------------------
*/

export default function RectifierCard({

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

    const rectifier = telemetry?.rectifier || {};

    const load = rectifier.loadPercentage ?? 0;

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

                        Rectifier

                    </Typography>

                    <ElectricalServicesIcon color="primary" />

                </Stack>

                <Divider sx={{ my: 2 }} />

                <Typography

                    variant="body2"

                    color="text.secondary"

                >

                    Rectifier Load

                </Typography>

                <Typography

                    variant="h3"

                    fontWeight={700}

                    mb={1}

                >

                    {load}%

                </Typography>

                <LinearProgress

                    variant="determinate"

                    value={load}

                    color={

                        load < 70

                            ? "success"

                            : load < 90

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
                            label="Input Voltage"
                            value={rectifier.inputVoltage}
                            unit="VAC"
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric
                            label="Output Voltage"
                            value={rectifier.outputVoltage}
                            unit="VDC"
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric
                            label="Output Current"
                            value={rectifier.outputCurrent}
                            unit="A"
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric
                            label="Output Power"
                            value={rectifier.outputPower}
                            unit="kW"
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric
                            label="Efficiency"
                            value={rectifier.efficiency}
                            unit="%"
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric
                            label="Temperature"
                            value={rectifier.temperature}
                            unit="°C"
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric
                            label="Module Count"
                            value={rectifier.moduleCount}
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric
                            label="Active Modules"
                            value={rectifier.activeModules}
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric
                            label="DC Bus Voltage"
                            value={rectifier.dcBusVoltage}
                            unit="V"
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric
                            label="AC Frequency"
                            value={rectifier.frequency}
                            unit="Hz"
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric
                            label="Runtime"
                            value={rectifier.runtime}
                            unit="hrs"
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
                                    rectifier.status ||
                                    "UNKNOWN"
                                }

                                color={

                                    rectifier.status === "ONLINE"

                                        ? "success"

                                        : rectifier.status === "WARNING"

                                            ? "warning"

                                            : rectifier.status === "FAULT"

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