import {
    Alert,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Divider,
    Grid,
    Stack,
    Typography
} from "@mui/material";

import CloudIcon from "@mui/icons-material/Cloud";

/*
|--------------------------------------------------------------------------
| Reusable Metric
|--------------------------------------------------------------------------
*/

function Metric({ label, value, unit = "" }) {
    const hasValue =
        value !== null &&
        value !== undefined &&
        value !== "";

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
| Weather Card
|--------------------------------------------------------------------------
*/

export default function WeatherCard({
    telemetry,
    loading,
    error
}) {
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

    if (error) {
        return (
            <Card>
                <CardContent>
                    <Alert severity="error">
                        {typeof error === "string"
                            ? error
                            : error?.message ||
                            "Failed to load weather telemetry."}
                    </Alert>
                </CardContent>
            </Card>
        );
    }

    const weather =
        telemetry?.weather ?? {};

    const status = String(
        weather.status ?? "UNKNOWN"
    ).toUpperCase();

    let statusColor = "default";

    if (
        status === "ONLINE" ||
        status === "NORMAL"
    ) {
        statusColor = "success";
    } else if (
        status === "WARNING" ||
        status === "DEGRADED"
    ) {
        statusColor = "warning";
    } else if (
        status === "OFFLINE" ||
        status === "FAULT"
    ) {
        statusColor = "error";
    }

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
                        Weather
                    </Typography>

                    <CloudIcon color="primary" />
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Typography
                    variant="h3"
                    fontWeight={700}
                >
                    {weather.temperature ??
                        "--"}°C
                </Typography>

                <Typography
                    color="text.secondary"
                    sx={{ mb: 2 }}
                >
                    {weather.condition ??
                        "Unknown"}
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Grid
                    container
                    spacing={2}
                >
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Humidity"
                            value={weather.humidity}
                            unit="%"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Wind Speed"
                            value={weather.windSpeed}
                            unit="m/s"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Wind Direction"
                            value={weather.windDirection}
                            unit="°"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Solar Irradiance"
                            value={weather.irradiance}
                            unit="W/m²"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Rainfall"
                            value={weather.rainfall}
                            unit="mm"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Cloud Cover"
                            value={weather.cloudCover}
                            unit="%"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Pressure"
                            value={weather.pressure}
                            unit="hPa"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="UV Index"
                            value={weather.uvIndex}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Visibility"
                            value={weather.visibility}
                            unit="km"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Air Quality"
                            value={weather.airQuality}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Metric
                            label="Last Updated"
                            value={weather.lastUpdated}
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