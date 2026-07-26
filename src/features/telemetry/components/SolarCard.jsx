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

import WbSunnyIcon from "@mui/icons-material/WbSunny";

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
| Solar Card
|--------------------------------------------------------------------------
*/

export default function SolarCard({

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

    const solar = telemetry?.solar || {};

    const power = solar.power ?? 0;

    const capacity = solar.capacity ?? 0;

    const utilization =

        capacity > 0

            ? (power / capacity) * 100

            : 0;

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

                        Solar PV

                    </Typography>

                    <WbSunnyIcon

                        color="warning"

                    />

                </Stack>

                <Divider sx={{ my: 2 }} />

                <Typography

                    variant="body2"

                    color="text.secondary"

                >

                    Current Output

                </Typography>

                <Typography

                    variant="h3"

                    fontWeight={700}

                    mb={1}

                >

                    {power} kW

                </Typography>

                <LinearProgress

                    variant="determinate"

                    value={Math.min(utilization, 100)}

                    color={

                        utilization > 70

                            ? "success"

                            : utilization > 30

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

                            label="Installed Capacity"

                            value={capacity}

                            unit="kW"

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric

                            label="Voltage"

                            value={solar.voltage}

                            unit="V"

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric

                            label="Current"

                            value={solar.current}

                            unit="A"

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric

                            label="Energy Today"

                            value={solar.energyToday}

                            unit="kWh"

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric

                            label="Energy Total"

                            value={solar.energyTotal}

                            unit="kWh"

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric

                            label="Irradiance"

                            value={solar.irradiance}

                            unit="W/m²"

                        />

                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>

                        <Metric

                            label="Panel Temperature"

                            value={solar.panelTemperature}

                            unit="°C"

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

                                    solar.status ||

                                    "UNKNOWN"

                                }

                                color={

                                    solar.status === "ONLINE"

                                        ? "success"

                                        : solar.status === "WARNING"

                                            ? "warning"

                                            : "error"

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