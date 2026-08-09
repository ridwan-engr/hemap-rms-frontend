import {
    Alert,
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

import WbSunnyIcon from "@mui/icons-material/WbSunny";

import useTelemetry from "../hooks/useTelemetry";

/*
|--------------------------------------------------------------------------
| Metric
|--------------------------------------------------------------------------
*/

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
/*
|--------------------------------------------------------------------------
| Solar Card
|--------------------------------------------------------------------------
*/

export default function SolarCard({
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
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            py: 5
                        }}
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
                    <Alert severity="error">
                        {
                            typeof error === "string"
                                ? error
                                : error?.message ||
                                  "Failed to load solar telemetry."
                        }
                    </Alert>
                </CardContent>
            </Card>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Solar Telemetry
    |--------------------------------------------------------------------------
    */

    const solar =
        telemetry?.solar ?? {};

    const power = Number(
        solar.power ?? 0
    );

    const capacity = Number(
        solar.capacity ?? 0
    );

    /*
    |--------------------------------------------------------------------------
    | Utilization
    |--------------------------------------------------------------------------
    */

    const utilization =
        capacity > 0
            ? Math.min(
                Math.max(
                    (power / capacity) * 100,
                    0
                ),
                100
            )
            : 0;

    /*
    |--------------------------------------------------------------------------
    | Status
    |--------------------------------------------------------------------------
    */

    const status = String(
        solar.status || "UNKNOWN"
    ).toUpperCase();

    let statusColor = "default";

    if (status === "ONLINE") {
        statusColor = "success";
    } else if (status === "WARNING") {
        statusColor = "warning";
    } else if (
        status === "OFFLINE" ||
        status === "FAULT"
    ) {
        statusColor = "error";
    }

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <Card>
            <CardContent>

                {/* Header */}

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    spacing={2}
                >
                    <Typography
                        variant="h6"
                        fontWeight={700}
                    >
                        Solar PV
                    </Typography>

                    <WbSunnyIcon
                        color="warning"
                    />
                </Stack>

                <Divider
                    sx={{
                        my: 2
                    }}
                />

                {/* Current Output */}

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Current Output
                </Typography>

                <Typography
                    variant="h3"
                    fontWeight={700}
                    sx={{
                        mb: 1
                    }}
                >
                    {power} kW
                </Typography>

                {/* Utilization */}

                <LinearProgress
                    variant="determinate"
                    value={utilization}
                    color={
                        utilization >= 70
                            ? "success"
                            : utilization >= 30
                                ? "warning"
                                : "error"
                    }
                    sx={{
                        height: 8,
                        borderRadius: 4
                    }}
                />

                <Divider
                    sx={{
                        my: 2
                    }}
                />

                {/* Metrics */}

                <Grid
                    container
                    spacing={2}
                >

                    <Grid
                        size={{
                            xs: 12,
                            md: 6
                        }}
                    >
                        <Metric
                            label="Installed Capacity"
                            value={capacity}
                            unit="kW"
                        />
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 6
                        }}
                    >
                        <Metric
                            label="Voltage"
                            value={solar.voltage}
                            unit="V"
                        />
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 6
                        }}
                    >
                        <Metric
                            label="Current"
                            value={solar.current}
                            unit="A"
                        />
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 6
                        }}
                    >
                        <Metric
                            label="Energy Today"
                            value={solar.energyToday}
                            unit="kWh"
                        />
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 6
                        }}
                    >
                        <Metric
                            label="Energy Total"
                            value={solar.energyTotal}
                            unit="kWh"
                        />
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 6
                        }}
                    >
                        <Metric
                            label="Irradiance"
                            value={solar.irradiance}
                            unit="W/m²"
                        />
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 6
                        }}
                    >
                        <Metric
                            label="Panel Temperature"
                            value={solar.panelTemperature}
                            unit="°C"
                        />
                    </Grid>

                    {/* Status */}

                    <Grid
                        size={{
                            xs: 12,
                            md: 6
                        }}
                    >
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={2}
                            sx={{
                                width: "100%"
                            }}
                        >
                            <Typography
                                color="text.secondary"
                                variant="body2"
                            >
                                Status
                            </Typography>

                            <Chip
                                label={status}
                                color={statusColor}
                                size="small"
                            />
                        </Stack>
                    </Grid>

                </Grid>

            </CardContent>
        </Card>
    );
}