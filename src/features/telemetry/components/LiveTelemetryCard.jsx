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
| Live Telemetry Card
|--------------------------------------------------------------------------
*/

export default function LiveTelemetryCard({
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
                            py: 4
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
                    <Typography
                        color="error"
                        variant="body2"
                    >
                        {
                            typeof error === "string"
                                ? error
                                : error?.message ||
                                "Failed to load live telemetry."
                        }
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Telemetry
    |--------------------------------------------------------------------------
    */

    const live = telemetry ?? {};

    /*
    |--------------------------------------------------------------------------
    | Support normalized and nested telemetry structures
    |--------------------------------------------------------------------------
    */

    const solarPower =
        live.solarPower ??
        live.solar?.power ??
        live.solar?.outputPower ??
        null;

    const gridPower =
        live.gridPower ??
        live.grid?.power ??
        null;

    const generatorPower =
        live.generatorPower ??
        live.generator?.power ??
        null;

    const batterySOC =
        live.batterySOC ??
        live.battery?.soc ??
        live.battery?.stateOfCharge ??
        null;

    const batteryPower =
        live.batteryPower ??
        live.battery?.power ??
        null;

    const loadPower =
        live.loadPower ??
        live.load?.activePower ??
        live.load?.power ??
        null;

    const rectifierPower =
        live.rectifierPower ??
        live.rectifier?.outputPower ??
        null;

    const inverterPower =
        live.inverterPower ??
        live.inverter?.outputPower ??
        null;

    const communicationStatus =
        live.communicationStatus ??
        live.communication?.status ??
        null;

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <Card>
            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight={700}
                >
                    Live Telemetry
                </Typography>

                <Divider
                    sx={{
                        my: 2
                    }}
                />

                <Grid
                    container
                    spacing={3}
                >

                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                            md: 4
                        }}
                    >
                        <Metric
                            label="Solar"
                            value={solarPower}
                            unit="kW"
                        />
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                            md: 4
                        }}
                    >
                        <Metric
                            label="Grid"
                            value={gridPower}
                            unit="kW"
                        />
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                            md: 4
                        }}
                    >
                        <Metric
                            label="Generator"
                            value={generatorPower}
                            unit="kW"
                        />
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                            md: 4
                        }}
                    >
                        <Metric
                            label="Battery SOC"
                            value={batterySOC}
                            unit="%"
                        />
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                            md: 4
                        }}
                    >
                        <Metric
                            label="Battery Power"
                            value={batteryPower}
                            unit="kW"
                        />
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                            md: 4
                        }}
                    >
                        <Metric
                            label="Load"
                            value={loadPower}
                            unit="kW"
                        />
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                            md: 4
                        }}
                    >
                        <Metric
                            label="Rectifier"
                            value={rectifierPower}
                            unit="kW"
                        />
                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            sm: 6,
                            md: 4
                        }}
                    >
                        <Metric
                            label="Inverter"
                            value={inverterPower}
                            unit="kW"
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Communication
                            </Typography>

                            <Typography
                                fontWeight={600}
                            >
                                {communicationStatus ?? "--"}
                            </Typography>
                        </Stack>
                    </Grid>

                </Grid>

            </CardContent>
        </Card>
    );
}