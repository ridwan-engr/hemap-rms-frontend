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

import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";

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
| Generator Card
|--------------------------------------------------------------------------
*/

export default function GeneratorCard({

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

    const generator = telemetry?.generator || {};

    const load = generator.loadPercentage ?? 0;

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

                        Generator

                    </Typography>

                    <ElectricBoltIcon color="success" />

                </Stack>

                <Divider sx={{ my: 2 }} />

                <Typography

                    variant="body2"

                    color="text.secondary"

                >

                    Generator Load

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

                            label="Power"

                            value={generator.power}

                            unit="kW"

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric

                            label="Voltage"

                            value={generator.voltage}

                            unit="V"

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric

                            label="Current"

                            value={generator.current}

                            unit="A"

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric

                            label="Frequency"

                            value={generator.frequency}

                            unit="Hz"

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric

                            label="Fuel Level"

                            value={generator.fuelLevel}

                            unit="%"

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric

                            label="Fuel Consumption"

                            value={generator.fuelConsumption}

                            unit="L/h"

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric

                            label="Runtime Today"

                            value={generator.runtimeToday}

                            unit="hrs"

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric

                            label="Engine Hours"

                            value={generator.engineHours}

                            unit="hrs"

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric

                            label="Coolant Temp"

                            value={generator.coolantTemperature}

                            unit="°C"

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric

                            label="Oil Pressure"

                            value={generator.oilPressure}

                            unit="bar"

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric

                            label="Battery Voltage"

                            value={generator.startBatteryVoltage}

                            unit="V"

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Stack
                            direction="row"
                            justifyContent="space-between"
                        >

                            <Typography color="text.secondary">

                                Status

                            </Typography>

                            <Chip

                                label={
                                    generator.status ||
                                    "UNKNOWN"
                                }

                                color={

                                    generator.status === "RUNNING"

                                        ? "success"

                                        : generator.status === "STANDBY"

                                            ? "warning"

                                            : generator.status === "FAULT"

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