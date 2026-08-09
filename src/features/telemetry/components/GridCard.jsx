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

import PowerIcon from "@mui/icons-material/Power";

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

function getGridStatusColor(status) {

    switch (
        String(status || "").toUpperCase()
    ) {

        case "AVAILABLE":
        case "ONLINE":
        case "NORMAL":
            return "success";

        case "UNSTABLE":
        case "WARNING":
        case "DEGRADED":
            return "warning";

        case "FAILED":
        case "OFFLINE":
        case "FAULT":
            return "error";

        default:
            return "default";
    }
}

export default function GridCard({
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
                              "Failed to load grid telemetry."
                        }
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Grid Data
    |--------------------------------------------------------------------------
    */

    const grid =
        telemetry?.grid ?? {};

    const rawAvailability =
        Number(
            grid.availability ?? 0
        );

    const availability =
        Math.min(
            100,
            Math.max(
                0,
                Number.isFinite(rawAvailability)
                    ? rawAvailability
                    : 0
            )
        );

    const status =
        String(
            grid.status ?? "UNKNOWN"
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
                        Utility Grid
                    </Typography>

                    <PowerIcon color="primary" />
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Typography
                    variant="body2"
                    color="text.secondary"
                >
                    Grid Availability
                </Typography>

                <Typography
                    variant="h3"
                    fontWeight={700}
                    mb={1}
                >
                    {availability}%
                </Typography>

                <LinearProgress
                    variant="determinate"
                    value={availability}
                    color={
                        availability >= 95
                            ? "success"
                            : availability >= 80
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
                            value={grid.power}
                            unit="kW"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Voltage"
                            value={grid.voltage}
                            unit="V"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Current"
                            value={grid.current}
                            unit="A"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Frequency"
                            value={grid.frequency}
                            unit="Hz"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Power Factor"
                            value={grid.powerFactor}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Energy Imported"
                            value={grid.energyImported}
                            unit="kWh"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Energy Exported"
                            value={grid.energyExported}
                            unit="kWh"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Grid Quality"
                            value={grid.quality}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Outages Today"
                            value={grid.outagesToday}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Outage Duration"
                            value={grid.outageDuration}
                            unit="min"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Last Restored"
                            value={grid.lastRestored}
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
                                color={getGridStatusColor(status)}
                                size="small"
                            />
                        </Stack>
                    </Grid>

                </Grid>

            </CardContent>
        </Card>
    );
}