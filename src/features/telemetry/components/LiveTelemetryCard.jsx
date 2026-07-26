import {
    Card,
    CardContent,
    CircularProgress,
    Divider,
    Grid,
    Stack,
    Typography
} from "@mui/material";

import useTelemetry from "../hooks/useTelemetry";

/*
|--------------------------------------------------------------------------
| Reusable Metric
|--------------------------------------------------------------------------
*/

function Metric({ label, value, unit = "" }) {

    return (

        <Stack spacing={0.5}>

            <Typography
                variant="body2"
                color="text.secondary"
            >
                {label}
            </Typography>

            <Typography
                variant="h6"
                fontWeight={700}
            >
                {value ?? "--"} {unit}
            </Typography>

        </Stack>

    );

}

/*
|--------------------------------------------------------------------------
| Live Telemetry Card
|--------------------------------------------------------------------------
*/

export default function LiveTelemetryCard({

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
                        alignItems="center"
                        py={4}
                    >

                        <CircularProgress />

                    </Stack>

                </CardContent>

            </Card>

        );

    }

    const live = telemetry || {};

    return (

        <Card>

            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight={700}
                >

                    Live Telemetry

                </Typography>

                <Divider sx={{ my: 2 }} />

                <Grid
                    container
                    spacing={3}
                >

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Metric
                            label="Solar"
                            value={live.solarPower}
                            unit="kW"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Metric
                            label="Grid"
                            value={live.gridPower}
                            unit="kW"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Metric
                            label="Generator"
                            value={live.generatorPower}
                            unit="kW"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Metric
                            label="Battery SOC"
                            value={live.batterySOC}
                            unit="%"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Metric
                            label="Battery Power"
                            value={live.batteryPower}
                            unit="kW"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Metric
                            label="Load"
                            value={live.loadPower}
                            unit="kW"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Metric
                            label="Rectifier"
                            value={live.rectifierPower}
                            unit="kW"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Metric
                            label="Inverter"
                            value={live.inverterPower}
                            unit="kW"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Metric
                            label="Communication"
                            value={live.communicationStatus}
                        />
                    </Grid>

                </Grid>

            </CardContent>

        </Card>

    );

}