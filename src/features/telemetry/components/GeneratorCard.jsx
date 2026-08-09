import {
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Divider,
    Grid,
    LinearProgress,
    Stack,
    Typography
} from "@mui/material";

import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";

import useTelemetry from "../hooks/useTelemetry";

function Metric({ label, value, unit = "" }) {
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            spacing={2}
        >
            <Typography
                variant="body2"
                color="text.secondary"
            >
                {label}
            </Typography>

            <Typography
                variant="body2"
                fontWeight={600}
                sx={{ textAlign: "right" }}
            >
                {value !== null &&
                value !== undefined &&
                value !== ""
                    ? `${value}${unit ? ` ${unit}` : ""}`
                    : "--"}
            </Typography>
        </Stack>
    );
}

function getGeneratorStatusColor(status) {

    switch (
        String(status || "").toUpperCase()
    ) {

        case "RUNNING":
        case "ONLINE":
            return "success";

        case "STANDBY":
        case "WARNING":
            return "warning";

        case "FAULT":
        case "OFFLINE":
        case "FAILED":
            return "error";

        default:
            return "default";
    }
}

export default function GeneratorCard({
    siteId
}) {

    const {
        telemetry,
        loading,
        error
    } = useTelemetry({
        siteId
    });

    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    if (loading) {

        return (
            <Card>
                <CardContent>
                    <Stack
                        py={5}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <CircularProgress />
                    </Stack>
                </CardContent>
            </Card>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Error
    |--------------------------------------------------------------------------
    */

    if (error) {

        return (
            <Card>
                <CardContent>
                    <Typography
                        color="error"
                        variant="body2"
                    >
                        {typeof error === "string"
                            ? error
                            : error?.message ||
                              "Failed to load generator telemetry."
                        }
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Generator Data
    |--------------------------------------------------------------------------
    */

    const generator =
        telemetry?.generator ?? {};

    const rawLoad =
        Number(
            generator.loadPercentage ?? 0
        );

    const load =
        Math.min(
            100,
            Math.max(
                0,
                Number.isFinite(rawLoad)
                    ? rawLoad
                    : 0
            )
        );

    const status =
        String(
            generator.status ?? "UNKNOWN"
        ).toUpperCase();

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

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

                    <ElectricBoltIcon
                        color={
                            status === "RUNNING" ||
                            status === "ONLINE"
                                ? "success"
                                : status === "FAULT" ||
                                  status === "FAILED"
                                    ? "error"
                                    : "warning"
                        }
                    />
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
                    sx={{
                        height: 8,
                        borderRadius: 4
                    }}
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
                            label="Coolant Temperature"
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
                            label="Start Battery Voltage"
                            value={generator.startBatteryVoltage}
                            unit="V"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Typography
                                color="text.secondary"
                                variant="body2"
                            >
                                Status
                            </Typography>

                            <Chip
                                label={status}
                                color={getGeneratorStatusColor(status)}
                                size="small"
                            />
                        </Stack>
                    </Grid>

                </Grid>

            </CardContent>
        </Card>
    );
}