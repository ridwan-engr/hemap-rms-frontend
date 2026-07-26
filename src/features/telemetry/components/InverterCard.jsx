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

import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

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
| Inverter Card
|--------------------------------------------------------------------------
*/

export default function InverterCard({

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

    const inverter = telemetry?.inverter || {};

    const load = inverter.loadPercentage ?? 0;

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

                        Inverter

                    </Typography>

                    <PowerSettingsNewIcon color="primary" />

                </Stack>

                <Divider sx={{ my: 2 }} />

                <Typography

                    variant="body2"

                    color="text.secondary"

                >

                    Inverter Load

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
                            label="Output Power"
                            value={inverter.outputPower}
                            unit="kW"
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric
                            label="Input Voltage"
                            value={inverter.inputVoltage}
                            unit="V"
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric
                            label="Output Voltage"
                            value={inverter.outputVoltage}
                            unit="V"
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric
                            label="Output Current"
                            value={inverter.outputCurrent}
                            unit="A"
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric
                            label="Frequency"
                            value={inverter.frequency}
                            unit="Hz"
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric
                            label="Efficiency"
                            value={inverter.efficiency}
                            unit="%"
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric
                            label="Temperature"
                            value={inverter.temperature}
                            unit="°C"
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric
                            label="Daily Energy"
                            value={inverter.dailyEnergy}
                            unit="kWh"
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric
                            label="Total Energy"
                            value={inverter.totalEnergy}
                            unit="kWh"
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric
                            label="Mode"
                            value={inverter.mode}
                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric
                            label="Runtime"
                            value={inverter.runtime}
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
                                    inverter.status ||
                                    "UNKNOWN"
                                }

                                color={

                                    inverter.status === "ONLINE"

                                        ? "success"

                                        : inverter.status === "WARNING"

                                            ? "warning"

                                            : inverter.status === "FAULT"

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