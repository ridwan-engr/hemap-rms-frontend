import {
    Card,
    CardContent,
    CircularProgress,
    Divider,
    Grid,
    Stack,
    Typography,
    Chip
} from "@mui/material";

import CloudIcon from "@mui/icons-material/Cloud";

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
| Weather Card
|--------------------------------------------------------------------------
*/

export default function WeatherCard({

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

    const weather = telemetry?.weather || {};

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

                    {weather.temperature ?? "--"}°C

                </Typography>

                <Typography

                    color="text.secondary"

                    sx={{ mb: 2 }}

                >

                    {weather.condition ?? "Unknown"}

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

                        >

                            <Typography

                                color="text.secondary"

                            >

                                Status

                            </Typography>

                            <Chip

                                label={

                                    weather.status ||

                                    "UNKNOWN"

                                }

                                color={

                                    weather.status === "ONLINE"

                                        ? "success"

                                        : weather.status === "WARNING"

                                            ? "warning"

                                            : weather.status === "OFFLINE"

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