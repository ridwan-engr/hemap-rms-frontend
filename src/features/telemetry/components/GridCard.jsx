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

import PowerIcon from "@mui/icons-material/Power";

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
| Grid Card
|--------------------------------------------------------------------------
*/

export default function GridCard({

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

    const grid = telemetry?.grid || {};

    const availability = grid.availability ?? 0;

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

                        >

                            <Typography color="text.secondary">

                                Status

                            </Typography>

                            <Chip

                                label={
                                    grid.status ||
                                    "UNKNOWN"
                                }

                                color={

                                    grid.status === "AVAILABLE"

                                        ? "success"

                                        : grid.status === "UNSTABLE"

                                            ? "warning"

                                            : grid.status === "FAILED"

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